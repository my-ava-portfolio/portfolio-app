import { AfterViewInit, Component, OnInit, Input, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

import { Subscription } from 'rxjs';

import { ResumeService } from '@services/resume.service';
import { ActivityActionsService } from '@modules/experiences/services/activity-actions.service';
import { ungroupIconUnicode } from '@core/styles/icons';
import { skillsMapping, activitiesMapping } from '@core/global-values/main';
import { currentYear } from '@core/misc';
import { activities } from '@core/data-types';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigateComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('svgGraphChart') svgGraphChart!: ElementRef;

  private defaultNodeIdSelected = null;

  startDate!: number;
  endDate: number = currentYear;

  isJobsGrouped!: boolean;
  isProjectsGrouped!: boolean;
  isVolunteersGrouped!: boolean;
  isThemesEnabled!: boolean;
  isTechnicsEnabled!: boolean;
  isToolsEnabled!: boolean;

  // icons
  ungroupIconUnicode = ungroupIconUnicode;

  currentDate!: number;
  currentNodeIdSelected: string | null = null;

  graphData!: any;

  adjlist!: any;
  labelLayout!: any;
  label!: any;

  chartHeight = 250;
  chartWidth!: number;

  legendWidth = 300; // try to not change
  legendHeight = 120;

  // circle
  strokeWidth = '0px';

  job_identifier: activities = 'job'
  personal_project_identifier: activities = 'personal-project' // api input data... about the '_' vs scss...
  volunteer_identifier: activities = 'volunteer'
  skillsMapping = skillsMapping;
  skill_topics = Object.keys(skillsMapping)

  activityGraphDiv = "#activitiesGraph"
  activityGraphSvgId = "activitiesGraph__svgChart"
  activityLegendSvgId = "activitiesGraph__svgLegend"

  legendIdDiv = "#legendGraph__themes"
  legendInputTitles = [
    { id: 'legend-graph-title', label: 'Activités', cx: 5, cy: 15 },
    { id: 'legend-graph-title', label: 'Compétences', cx: 160, cy: 15 },
  ];

  // here to control topic graph & text (ex 'missions' shared by neighbors components)... TODO improve it !

  legendInput = [
    { id: this.job_identifier, status: 'unabled-topic', label: activitiesMapping[this.job_identifier], cx: 20, cy: 42, text_cx: 55, r: 10, rOver: 15 },
    { id: this.personal_project_identifier, status: 'unabled-topic', label: activitiesMapping[this.personal_project_identifier], cx: 20, cy: 67, text_cx: 55, r: 10, rOver: 15 },
    { id: this.volunteer_identifier, status: 'unabled-topic', label: activitiesMapping[this.volunteer_identifier], cx: 20, cy: 92, text_cx: 55, r: 10, rOver: 15 },
    { id: 'themes', status: 'enabled-topic', label: this.skillsMapping['themes'], cx: 175, cy: 42, text_cx: 190, r: 5, rOver: 10 },
    { id: 'technics', status: 'enabled-topic', label: this.skillsMapping['technics'], cx: 175, cy: 67, text_cx: 190, r: 5, rOver: 10 },
    { id: 'tools', status: 'enabled-topic', label: this.skillsMapping['tools'], cx: 175, cy: 92, text_cx: 190, r: 5, rOver: 10 }
  ];

  legendGroupInput = [
    { id: 'grouper_jobs', label: 'grouper jobs', cy: 31, cx: 35 },  // jobs grouped is disabled (style)
    { id: 'grouper_projects', label: 'grouper projets', cy: 56, cx: 35 },
    { id: 'grouper_volunteers', label: 'grouper volunteers', cy: 82, cx: 35 }
  ];

  activitiesValidityRangeSubscription!: Subscription;
  graphSubscription!: Subscription;
  activitiesIdSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activityActionsService: ActivityActionsService
  ) {

    this.graphSubscription = this.resumeService.graphDataSubject.subscribe(
      (graphData: any) => {
        this.buildGraph(graphData, this.currentNodeIdSelected);
      }
    );

    this.activitiesValidityRangeSubscription = this.resumeService.validityRangeActivitisJobDataSubject.subscribe(
      (data: any) => {
        this.startDate = data.start_date;
        this.endDate = data.end_date;
        this.updateDatefromTemporalBar(this.endDate)
      }
    )

    this.activitiesIdSubscription = this.resumeService.activityId.subscribe(
      (activityId) => {
        if (this.currentNodeIdSelected === null) {
          // in order to filter graph from components job and personal project
          const elementId: string = `node-${activityId}`;
          this.resetChartWithASelection(elementId);
        } else {
          this.resetChart();
        }

        const navigationDiv = document.querySelector('#navigation');
        if (navigationDiv !== null) {
          navigationDiv.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    )

   }

  ngOnInit(): void {
    this.initSvgGraph();

    this.resumeService.queryValidityRangeActivitisJobRouteFromApi();
    this.resetChart();

  }

  ngAfterViewInit(): void {
    this.chartWidth = this.svgGraphChart.nativeElement.offsetWidth;
    if (this.chartWidth === 0) {
      // if mobile device used
      this.chartWidth = window.innerWidth
    }
  }

  ngOnDestroy(): void {
    this.graphSubscription.unsubscribe();
    this.activitiesValidityRangeSubscription.unsubscribe();
    this.activitiesIdSubscription.unsubscribe();
  }

  updateDatefromTemporalBar(date: number): void {
    this.currentDate = date;
    this.resumeService.queryActivitiesCountFromApi(date)
  }

  updateDate(event: any): void {
    this.updateDatefromTemporalBar(event.target.value)
    this.getGraphFeatures();
  }

  private initSvgGraph(): void {
    d3.select(this.activityGraphDiv)
      .append('svg').attr('id', this.activityGraphSvgId)
      .attr('width', '100%')
      .attr('height', this.chartHeight)
      .append('g').lower()
      .attr('id', 'skillsGraphElements');
  }

  graphReset(): void {
    this.currentDate = this.endDate;
    this.isThemesEnabled = true;
    this.isTechnicsEnabled = true;
    this.isToolsEnabled = false;
    this.isJobsGrouped = false;
    this.isProjectsGrouped = false;
    this.isVolunteersGrouped = true;
    this.resetLegend();
    this.getGraphFeatures();
  }

  // here to control default topic graph.
  resetChart(): void {
    this.currentNodeIdSelected = this.defaultNodeIdSelected;
    this.graphReset()
  }

  resetChartWithASelection(nodeToSelect: string): void {
    this.currentNodeIdSelected = nodeToSelect; // here we want to preselect the chart graph created (few seconds later)
    this.graphReset()
    d3.select(`#${this.activityGraphSvgId} .nodes #node-${nodeToSelect}`).dispatch('click');
  }

  resetLegend(): void {
    d3.select(`#${this.activityLegendSvgId}`).remove();
    this.buildLegend();
  }

  private buildLegend(): void {
    const svg = d3.select(this.legendIdDiv)
      .append('svg').attr('id', this.activityLegendSvgId)
      .attr('width', this.legendWidth)
      .attr('height', this.legendHeight);

    const svgContainer = svg.append('g')
      .attr('class', 'skillsLegend');

    const LegendElements = svgContainer.selectAll(null)
      .data(this.legendInput)
      .enter()
      .append('g')
      .attr('class', (d) => {
        // in order to control the display or node, check header variables
        let classesValue = `${d.id} ${d.status}`;
        if (d.id === 'themes' && !this.isThemesEnabled) {
          classesValue = classesValue + ' disabled-node';
        } else if (d.id === 'technics' && !this.isTechnicsEnabled) {
          classesValue = classesValue + ' disabled-node';
        } else if (d.id === 'tools' && !this.isToolsEnabled) {
          classesValue = classesValue + ' disabled-node';
        }
        return classesValue;
      })
      .style('r', (d: any) => d.r)
      .style('stroke-width', this.strokeWidth)
      .on('click', (e: any, d: any) => {
        if (d.id === 'themes') {
          this.isThemesEnabled = !this.isThemesEnabled;
        } else if (d.id === 'technics') {
          this.isTechnicsEnabled = !this.isTechnicsEnabled;
        } else if (d.id === 'tools') {
          this.isToolsEnabled = !this.isToolsEnabled;
        }

        d3.select(e.currentTarget).classed('disabled-node', !d3.select(e.currentTarget).classed('disabled-node'));

        this.getGraphFeatures();
      });

    svgContainer.selectAll()
      .data(this.legendGroupInput)
      .enter()
      .append('svg:foreignObject')
      .attr('width', 18)
      .attr('height', 18)
      .attr('class', (d: any) => {
        // in order to control the display or node, check header variables
        let classesValue = `${d.id} fw-bolder`;
        if (d.id === 'grouper_jobs' && !this.isJobsGrouped) {
          classesValue = classesValue + ' disabled-group';
        } else if (d.id === 'grouper_projects' && !this.isProjectsGrouped) {
          classesValue = classesValue + ' disabled-group';
        } else if (d.id === 'grouper_volunteers' && !this.isVolunteersGrouped) {
          classesValue = classesValue + ' disabled-group';
        }
        return classesValue;
      })
      .text(this.ungroupIconUnicode)
      .attr('x', (d: any) => d.cx)
      .attr('y', (d: any) => d.cy)
      .style('r', (d: any) => d.r)
      .style('stroke-width', this.strokeWidth)
      .on('click', (e: any, d: any) => {
        if (d.id === 'grouper_jobs') {
          this.isJobsGrouped = !this.isJobsGrouped;
        } else if (d.id === 'grouper_projects') {
          this.isProjectsGrouped = !this.isProjectsGrouped;
        } else if (d.id === 'grouper_volunteers') {
          this.isVolunteersGrouped = !this.isVolunteersGrouped;
        }
        d3.select(e.currentTarget).classed('disabled-group', !d3.select(e.currentTarget).classed('disabled-group'));
        this.getGraphFeatures();
      });

    svgContainer.selectAll()
      .data(this.legendInputTitles)
      .enter()
      .append('text')
      .style('text-anchor', 'left')
      .style('font-size', '12')
      .style('dominant-baseline', 'middle')
      .attr('class', (d) => d.id)
      .attr('x', (d) => d.cx)
      .attr('y', (d) => d.cy)
      .text( (d) => d.label);

    LegendElements
      .append('circle')
        .attr('class', (d) => 'svg-color-' + d.id)
        .attr('cx', (d) => d.cx)
        .attr('cy', (d) => d.cy)
        .attr('r', (d) => d.r);
    
    // create line to display that object is disabled
    let skillsButtons = LegendElements.filter((d: any) => ['themes', 'technics', 'tools'].includes(d.id))
      .append("line")
      .attr('x1', (d) => d.cx - d.r - 2)
      .attr('x2', (d) => d.cx + d.r + 2)
      .attr('y1', (d) => d.cy - d.r - 2)
      .attr('y2', (d) => d.cy + d.r + 2)

    LegendElements
      .append('text')
        .style('text-anchor', 'left')
        .style('font-size', '12')
        .style('dominant-baseline', 'middle')
        // .style("pointer-events", "auto")
        .attr('x', (d: any) => d.text_cx)
        .attr('y', (d: any) => d.cy)
        .text((d: any) => d.label);

  }

  private getGraphFeatures(): void {

    // then we want to regenerate activities and skill components
    let skill_categories = []
    if (this.isThemesEnabled) {
      skill_categories.push('themes')
    }
    if (this.isTechnicsEnabled) {
      skill_categories.push('technics')
    }
    if (this.isToolsEnabled) {
      skill_categories.push('tools')
    }

    let activity_group = []
    if (this.isJobsGrouped) {
      activity_group.push("job");
    }
    if (this.isProjectsGrouped) {
      activity_group.push("personal-project");
    }
    if (this.isVolunteersGrouped) {
      activity_group.push("volunteer");
    }
    this.resumeService.queryGraphFromApi({
        date: this.currentDate,
        skill_categories: skill_categories,
        activity_group: activity_group
      }
    );
  }

  private buildGraph(graphData: any, nodeIdToSelect: string | null): void {

    const nodes: any[] = [];
    const links: any[] = [];
    this.label = {
        nodes,
        links
    };
    
    graphData.nodes.forEach( (d: any, i: number) => {
      this.label.nodes.push({node: d});
      this.label.nodes.push({node: d});
      this.label.links.push({
        source: i * 2,
        target: i * 2 + 1
      });
    });

    const svgElements: any = d3.select('#skillsGraphElements');
    d3.select(`#${this.activityGraphSvgId} .bg-date`).remove();
    svgElements.append('g').attr('class', 'bg-date')
      .append('text')
      .attr('x', '50%')
      .attr('y', '50%')
      .text(this.currentDate);

    this._buildLabelLayout();
    // https://observablehq.com/@ben-tanen/a-tutorial-to-using-d3-force-from-someone-who-just-learned-ho
    const graphLayout = d3.forceSimulation(graphData.nodes)
      .force('charge', d3.forceManyBody().strength(-900))
      .force('x', d3.forceX(this.chartWidth / 2))
      .force('y', d3.forceY(this.chartHeight / 2))
      .force('center', d3.forceCenter(this.chartWidth / 2, this.chartHeight / 2))
      .force('link', d3.forceLink(graphData.links).id((d: any) => d.name).distance(40).strength(1))
      .force('collision', d3.forceCollide(15))
      .nodes(graphData.nodes)
      .on('tick', this._ticked.bind(this));

    this.adjlist = {};
    graphData.links.forEach( (d: any): any => {
      this.adjlist[d.source.index + '-' + d.target.index] = true;
      this.adjlist[d.target.index + '-' + d.source.index] = true;
    });

    d3.select(`#${this.activityGraphSvgId} .links`).remove();
    d3.select(`#${this.activityGraphSvgId} .nodes`).remove();
    d3.select(`#${this.activityGraphSvgId} .nodeLabels`).remove();

    const link = svgElements.append('g').attr('class', 'links')
      .selectAll('line')
      .data(graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1px');

    const node = svgElements.append('g').attr('class', 'nodes')
      .selectAll('circle')
      .data(graphData.nodes)
      .enter()
      .append('circle')
      .attr('class', (d: any) => {
          return `svg-color-${d.properties.type} unselected`; // to filter from job/project card
      })
      .attr('id', (d: any) => {
          return 'node-' + d.properties.id;
      })
      .attr('r', (d: any) => {
          const element = this.legendInput.filter(e => e.id === d.properties.type);
          return element[0].r;
      })
      .on('mouseover', (e: any, d: any) => {
        const element = this.legendInput.filter(e => e.id === d.properties.type);
        d3.select(e.currentTarget)
        .transition()
        .duration(1000)
        .ease(d3.easeElastic)
          .attr("r", element[0].rOver)
      })
      .on('mouseout', (e: any, d: any) => {
        const element = this.legendInput.filter(e => e.id === d.properties.type);
        d3.select(e.currentTarget)
        .transition()
        .duration(1000)
        .ease(d3.easeElastic)
          .attr("r", element[0].r)
       })
      ;

    const labelNode = svgElements.append('g').attr('class', 'nodeLabels')
      .selectAll('text')
      .data(this.label.nodes)
      .enter()
      .append('text')
      .text((d: any, i: number) => {
        if (d.node.properties.object == "activityGroup") {
          return i % 2 !== 0 ? '' : activitiesMapping[d.node.properties.name as keyof typeof activitiesMapping]
        }
        return i % 2 !== 0 ? '' : d.node.properties.name;
      })
      .attr('id', (d: any) => {
        return 'label-' + d.node.properties.id;
      })
      .attr('class', (d: any) => {
          return d.node.properties.type;
      });


    node.on('click', (e: any, d: any, i: any, n: any) => {
      const nodeIsPreselected = d3.select('#skillsGraphElements .nodes .selected');
      // here we update the activities components and skills
      if (nodeIsPreselected.size() === 0) {
        // click nothing is selected, so we want to select the new selected node
        this.currentNodeIdSelected = d3.select(e.currentTarget).attr('id');

        if (!this.skill_topics.includes(d.properties.type)) { // to switch on the activities buttons
          this.activityActionsService.setActivity(d.properties.type)
        } else {
          this.activityActionsService.setActivity(this.job_identifier)
        }

        this._graphSelectedFiltering(e.currentTarget);

      } else if (nodeIsPreselected.size() === 1) {
        // unclick we want to unselect the node, only on the original node !
        this.currentNodeIdSelected = this.defaultNodeIdSelected;
        this.activityActionsService.setActivity(this.job_identifier) // to switch on the activities buttons (default)
        this._defaultDisplayingByDate();

      } else {
          // nothing here : to avoid unfocused action on an other node than the origin node, else it will disable the graph interactivity
      }
    });

    node.call(
      d3.drag()
        .on('start', (e: any, d: any) => {
          e.sourceEvent.stopPropagation();
          if (!e.active) {
            graphLayout.alphaTarget(0.3).restart();
          }
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (e: any, d: any) => {
          d.fx = e.x;
          d.fy = e.y;
        })
        .on('end', (e: any, d: any) => {
          if (!e.active) {
            graphLayout.alphaTarget(0);
          }
          d.fx = null;
          d.fy = null;
        })
    );

    // to preselect a node
    if ( nodeIdToSelect !== null ) {
      this._graphSelectedFiltering('#skillsGraphElements #' + nodeIdToSelect);
    } else {
      this._defaultDisplayingByDate();
    }

  }

  private _neigh(a: any, b: any): boolean {
    return a === b || this.adjlist[a + '-' + b];
  }

  private _unfocusOnGraph(): void {
    d3.selectAll(`#${this.activityGraphSvgId} .links line`).style('opacity', 1);

    d3.selectAll(`#${this.activityGraphSvgId} .nodes circle`)
      .style('opacity', 1)
      .style('pointer-events', 'auto')
      .style('cursor', 'pointer');

    d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`)
      .attr('display', 'block');
  }

  private _focusOnGraph(element: any): any {

    let value: unknown | any;
    value = element.datum();
    const index = value.index;
    const otherNodes = d3.selectAll(`#${this.activityGraphSvgId} .nodes circle`);

    const nodeDisplayed = otherNodes.filter( (e: any) => {
        return this._neigh(index, e.index);
    });

    otherNodes.style('opacity', (o: any) => {
        return this._neigh(index, o.index) ? 1 : 0.1;
    });
    otherNodes.style('pointer-events', (o: any) => {
        return this._neigh(index, o.index) ? 'auto' : 'none';
    });
    otherNodes.style('cursor', (o: any) => {
        return this._neigh(index, o.index) ? 'pointer' : 'unset';
    });

    const labelNodes = d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`);
    labelNodes.attr('display', (o: any) => {
        return this._neigh(index, o.node.index) ? 'block' : 'none';
    });
    const links = d3.selectAll(`#${this.activityGraphSvgId} .links line`);
    links.style('opacity', (o: any) => {
        return o.source.index === index || o.target.index === index ? 1 : 0.1;
    });

    return nodeDisplayed;
  }


  private _defaultDisplayingByDate(): void {

    const elementSelected = d3.select('#skillsGraphElements .nodes .selected');
    if (elementSelected.size() === 1) {
      elementSelected.classed('selected', !elementSelected.classed('selected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' unselected');
      this._unfocusOnGraph();
    }

    // then we want to regenerate activities and skill components
    const skillsTypes = this._buildSkillsCategoriesParameters()
    let commonParams = { date: this.currentDate }
    let skillsParams = {...commonParams, ...{ category: skillsTypes} }

    const activitiesParameters = this._buildActivitiesParameters(commonParams)
    const skillsParameters = this._buildActivitiesParameters(skillsParams)
    this.resumeService.queryProfesionalActivitiesFromApi(activitiesParameters)
    this.resumeService.queryProfesionalSkillsFromApi(skillsParameters)
  }


  private _graphSelectedFiltering(element: any, withContent = true): void {

    const elementSelected: any = d3.select(element);

    const skillsTypes = this._buildSkillsCategoriesParameters()
    let commonParams = { date: this.currentDate }
    let skillsParams = {...commonParams, ...{ category: skillsTypes} }

    let activitiesParameters = {}
    let skillsParameters = {}

    if (elementSelected.size() > 0) {
      elementSelected.classed('unselected', !elementSelected.classed('unselected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' selected');
      this._focusOnGraph(elementSelected);
      

      if ( withContent ) {
        const elementData: any = d3.select(element).data()[0];
        // check origin node type

        const elementName = elementData.name
        const elementObject = elementData.properties.object
               
        if (elementObject === "activity") {
          // support activity display
          commonParams = { ...commonParams, ...{ activity_name: elementName } }
          
          activitiesParameters = this._buildActivitiesParameters(commonParams)
          skillsParameters = this._buildActivitiesParameters({ ...skillsParams, ... { activity_name: elementName } })

        } else if (elementObject === "activityGroup") {
          // support activity group display
          let jobParams = {}
          if (elementName !== "job") {
            jobParams = {hide: true}
          }
          let projectParams = {}
          if (elementName !== "personal-project") {
            projectParams = {hide: true}
          }
          let volunteerParams = {}
          if (elementName !== "volunteer") {
            volunteerParams = {hide: true}
          }
          activitiesParameters = this._buildActivitiesParameters(commonParams, jobParams, projectParams, volunteerParams)
          skillsParameters = this._buildActivitiesParameters(skillsParams)

        } else if (elementObject === "skill") {
          // support activity skill display
          commonParams = { ...commonParams, ...{ skill: elementName } }

          activitiesParameters = this._buildActivitiesParameters(commonParams)
          skillsParameters = this._buildActivitiesParameters({ ...skillsParams, ... { skill: elementName } })
        }

        this.resumeService.queryProfesionalActivitiesFromApi(activitiesParameters)
        this.resumeService.queryProfesionalSkillsFromApi(skillsParameters)

      }

    } else {
      activitiesParameters = this._buildActivitiesParameters(commonParams)
      skillsParameters = this._buildActivitiesParameters(skillsParams)
      this.resumeService.queryProfesionalActivitiesFromApi(activitiesParameters)
      this.resumeService.queryProfesionalSkillsFromApi(skillsParameters)

    }
  }

  private _buildSkillsCategoriesParameters(): string[] {
    let skillsTypes = []
    if (this.isThemesEnabled) {
      skillsTypes.push('themes')
    }
    if (this.isTechnicsEnabled) {
      skillsTypes.push('technics')
    }
    if (this.isToolsEnabled) {
      skillsTypes.push('tools')
    }
    return skillsTypes
  }

  private _buildActivitiesParameters(commonParameters: any, jobParameters: any = {}, projectParameters: any = {}, volunteerParameters: any = {}): any {
    return {
      "job": {...commonParameters, ...jobParameters },
      "personal-project": {...commonParameters, ...projectParameters},
      "volunteer": {...commonParameters, ...volunteerParameters}
    }
  }


  private _buildLabelLayout(): void {
    this.labelLayout = d3.forceSimulation(this.label.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('link', d3.forceLink(this.label.links).distance(0).strength(2));
  }

  private _fixna(x: number): number {
    if ( isFinite(x) ) { return x; }
    return 0;
  }

  private _ticked(): void {
    const links: any = d3.selectAll(`#${this.activityGraphSvgId} .links line`);
    const nodes: any = d3.selectAll(`#${this.activityGraphSvgId} .nodes circle`);
    const labelNodes: any = d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`);

    nodes.call(this._updateNode.bind(this));
    links.call(this._updateLink.bind(this));

    this.labelLayout.alphaTarget(0.1).restart();
    labelNodes.each( (d: any, i: number) => {
      if (i % 2 === 0) {
        d.x = d.node.x;
        d.y = d.node.y;
      } else {
        // TODO maybe not working
        d3.select('#label-' + d.id).attr('transform', `translate(${d.x},${d.y})`);
      }
    });
    // REFACTOR
    labelNodes.call(this._updateLabelNode.bind(this));
  }

  private _updateLink(linkElement: any): void {
    linkElement.attr('x1', (d: any) => {
      return this._fixna(d.source.x);
    })
    .attr('y1', (d: any) => {
      return this._fixna(d.source.y);
    })
    .attr('x2', (d: any) => {
      return this._fixna(d.target.x);
    })
    .attr('y2', (d: any) => {
      return this._fixna(d.target.y);
    });
  }

  private _updateNode(nodeElement: any): void {
    // to not fit drag on the bound
    // node.attr("transform", function(d) {
    //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
    // });
    const radius = 10;

    nodeElement
      .attr('cx', (d: any) => {
        return (d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)));
      })
      .attr('cy', (d: any) => {
        return (d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)));
      });
  }

  private _updateLabelNode(labelNodeElement: any): void {
    // to not fit drag on the bound
    // node.attr("transform", function(d) {
    //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
    // });
    const radius = 10;

    labelNodeElement
      .attr('x', (d: any) => {
        return (d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)));
      })
      .attr('y', (d: any) => {
        return (d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)));
      });
  }

}



