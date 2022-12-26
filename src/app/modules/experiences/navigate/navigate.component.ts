import { AfterViewInit, Component, OnInit, ElementRef, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

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
  @Output() graphInitialized = new EventEmitter<boolean>();
  
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
    const skillsCategoriesStatus = {
      "themes": this.isThemesEnabled,
      "technics": this.isTechnicsEnabled,
      "tools": this.isToolsEnabled
    }
    let skill_categories = Object.keys(skillsCategoriesStatus).filter( (key: string) => {
      return skillsCategoriesStatus[key as keyof typeof skillsCategoriesStatus]
    });

    const activityGroupStatus = {
      "job": this.isJobsGrouped,
      "personal-project": this.isProjectsGrouped,
      "volunteer": this.isVolunteersGrouped
    }
    let activity_group = Object.keys(activityGroupStatus).filter( (key: string) => {
      return activityGroupStatus[key as keyof typeof activityGroupStatus]
    });

    this.resumeService.queryGraphFromApi({
        date: this.currentDate,
        skill_categories: skill_categories,
        activity_group: activity_group
      }
    );
  }

  private buildGraph(graphData: any, nodeIdToSelect: string | null): void {
    
    const svgElements: any = d3.select(`#${this.activityGraphSvgId}`);
    svgElements.select('.bg-date').remove();
    svgElements.append('g').attr('class', 'bg-date')
      .append('text')
      .attr('x', '50%')
      .attr('y', '50%')
      .text(this.currentDate);

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
      .attr('stroke', '#aaaa')
      .attr('stroke-width', '1px');

    const node = svgElements.append('g').attr('class', 'nodes')
      .selectAll('circle')
      .data(graphData.nodes)
      .enter()
      .append('circle')
      .attr('class', (d: any) => `svg-color-${d.properties.type} unselected`) // to filter from job/project card
      .attr('id', (d: any) => 'node-' + d.properties.id)
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
      .data(graphData.nodes)
      .enter()
      .append('text')
      .text((d: any, i: number) => {
        if (d.object == "activityGroup") {
          return activitiesMapping[d.properties.name as keyof typeof activitiesMapping]
        }
        return d.properties.name;
      })
      .attr('id', (d: any) => 'label-' + d.properties.id)
      .attr('class', (d: any) => d.properties.type);


    node.on('click', (e: any, d: any, i: any, n: any) => {
      const nodeIsPreselected = d3.select(`#${this.activityGraphSvgId} .nodes .selected`);
      
      // here we update the activities components and skills
      if (nodeIsPreselected.size() === 0) {
        // click nothing is selected, so we want to select the new selected node
        this.currentNodeIdSelected = d3.select(e.currentTarget).attr('id');
        this._displayActivitiesAndSkillsFromElement(`#${this.activityGraphSvgId} #${this.currentNodeIdSelected}`);
        if (!this.skill_topics.includes(d.properties.type)) { // to switch on the activities buttons
          this.activityActionsService.setActivity(d.properties.type)
        } else {
          this.activityActionsService.setActivity(this.job_identifier)
        }

      } else if (nodeIsPreselected.size() === 1) {
        // unclick we want to unselect the node, only on the original node !
        this.currentNodeIdSelected = this.defaultNodeIdSelected;
        this.activityActionsService.setActivity(this.job_identifier) // to switch on the activities buttons (default)
        this._normalDisplayActivitiesAndSkills();

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
      this._displayActivitiesAndSkillsFromElement(`#${this.activityGraphSvgId} #${nodeIdToSelect}`);
    } else {
      this._normalDisplayActivitiesAndSkills();
    }

  }

  private _selectNeighbors(a: any, b: any): boolean {
    return a === b || this.adjlist[a + '-' + b];
  }

  private _graphSetDisplayStatus(mode: 'unfocus' | 'hidden'): void {
    let opacity = 1;
    let display = 'block'
    if (mode === 'hidden') {
      opacity = 0.1
      display = 'none'
    }

    d3.selectAll(`#${this.activityGraphSvgId} .links line`)
      .style('opacity', opacity);

    d3.selectAll(`#${this.activityGraphSvgId} .nodes circle`)
      .style('opacity', opacity)
      .style('pointer-events', 'auto')
      .style('cursor', 'pointer');

    const a = d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`)
      .attr('display', display);
  }

  private _graphFocusOnElement(element: any): void {

    const index = element.datum().index;
    
    d3.selectAll(`#${this.activityGraphSvgId} .nodes circle`)
      .style('opacity', (d: any) => this._selectNeighbors(index, d.index) ? 1 : 0.1)
      .style('pointer-events', (d: any) => this._selectNeighbors(index, d.index) ? 'auto' : 'none')
      .style('cursor', (d: any) => this._selectNeighbors(index, d.index) ? 'pointer' : 'unset');

    d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`)
      .attr('display', (d: any) => this._selectNeighbors(index, d.index) ? 'block' : 'none');
    
    d3.selectAll(`#${this.activityGraphSvgId} .links line`)
      .style('opacity', (d: any) => d.source.index === index || d.target.index === index ? 1 : 0.1);
  }

  private _normalDisplayActivitiesAndSkills(): void {

    const elementSelected = d3.select(`#${this.activityGraphSvgId} .nodes .selected`);
    if (elementSelected.size() === 1) {
      elementSelected.classed('selected', !elementSelected.classed('selected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' unselected');
      this._graphSetDisplayStatus('unfocus');
    }

    // then we want to regenerate activities and skill components
    const skillsTypes = this._buildSkillsCategoriesParameters()
    let commonParams = { date: this.currentDate }
    let skillsParams = {...commonParams, ...{ category: skillsTypes} }

    const activitiesParameters = this._buildParameters(commonParams)
    const skillsParameters = this._buildParameters(skillsParams)
    this.resumeService.queryProfesionalActivitiesFromApi(activitiesParameters)
    this.resumeService.queryProfesionalSkillsFromApi(skillsParameters)

    this.graphInitialized.emit(true)
  }


  private _displayActivitiesAndSkillsFromElement(element: string): void {

    const skillsTypes = this._buildSkillsCategoriesParameters()
    let commonParams = { date: this.currentDate }
    let skillsParams = {...commonParams, ...{ category: skillsTypes} }

    let activitiesParameters = {}
    let skillsParameters = {}

    const elementSelected: any = d3.select(element);

    if (elementSelected.size() > 0) {
      elementSelected.classed('unselected', !elementSelected.classed('unselected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' selected');
      this._graphFocusOnElement(elementSelected);
     
      const elementData: any = d3.select(element).data()[0];
      // check origin node type
  
      const elementName = elementData.name
      const elementObject = elementData.properties.object
                
      if (elementObject === "activity") {
        // support activity display
        commonParams = { ...commonParams, ...{ activity_name: elementName } }
          
        activitiesParameters = this._buildParameters(commonParams)
        skillsParameters = this._buildParameters({ ...skillsParams, ... { activity_name: elementName } })

      } else if (elementObject === "activityGroup") {
        // support activity group display
        let jobParams = { hide: elementName !== "job" }
        let projectParams = { hide: elementName !== "personal-project" }
        let volunteerParams = { hide: elementName !== "volunteer" }

        activitiesParameters = this._buildParameters(commonParams, jobParams, projectParams, volunteerParams)
        skillsParameters = this._buildParameters(skillsParams)

      } else if (elementObject === "skill") {
        // support activity skill display
        commonParams = { ...commonParams, ...{ skill: elementName } }

        activitiesParameters = this._buildParameters(commonParams)
        skillsParameters = this._buildParameters({ ...skillsParams, ... { skill: elementName } })
      }
      this.graphInitialized.emit(true)

    } else {
      // display nothing because the node selected is out of the scope
      this._graphSetDisplayStatus('hidden')
      let skillsParams = { ...commonParams, ...{ category: skillsTypes } }
      
      this.graphInitialized.emit(false)
      activitiesParameters = this._buildParameters(commonParams, { hide: true }, { hide: true }, { hide: true })
      skillsParameters = this._buildParameters(skillsParams, { hide: true }, { hide: true }, { hide: true })

    }
    this.resumeService.queryProfesionalActivitiesFromApi(activitiesParameters)
    this.resumeService.queryProfesionalSkillsFromApi(skillsParameters)

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
    labelNodes.call(this._updateNodeLabel.bind(this));
  }

  private _updateLink(linkElement: any): void {
    linkElement
      .attr('x1', (d: any) => this._fixna(d.source.x))
      .attr('y1', (d: any) => this._fixna(d.source.y))
      .attr('x2', (d: any) => this._fixna(d.target.x))
      .attr('y2', (d: any) => this._fixna(d.target.y));
  }

  private _updateNode(nodeElement: any): void {
    // to not fit drag on the bound
    // node.attr("transform", function(d) {
    //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
    // });
    const radius = 10;
    nodeElement
      .attr('cx', (d: any) => d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)))
      .attr('cy', (d: any) => d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)))
  }

  private _updateNodeLabel(labelElement: any): void {
    const radius = 10;
    labelElement
      .attr('x', (d: any) => d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)))
      .attr('y', (d: any) => d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)));
  }


  // Build parameters for api call // 
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

  private _buildParameters(commonParameters: any, jobParameters: any = {}, projectParameters: any = {}, volunteerParameters: any = {}): any {
    return {
      "job": {...commonParameters, ...jobParameters },
      "personal-project": {...commonParameters, ...projectParameters},
      "volunteer": {...commonParameters, ...volunteerParameters}
    }
  }
    // Build parameters for api call // 


}




