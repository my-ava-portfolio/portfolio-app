import { AfterViewInit, Component, DoCheck, OnInit, ElementRef, ViewChild, OnDestroy, ViewEncapsulation, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';

import * as d3 from 'd3';

import { Subscription } from 'rxjs';

import { ResumeService } from '@services/resume.service';
import { ungroupIconUnicode } from '@core/styles/icons';
import { skillsMapping, activitiesMapping, skillsMappingStatus } from '@core/globals/resume-shared-data';
import { currentYear } from '@core/misc';
import { activities } from '@core/data-types';
import { MainService } from '@services/main.service';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigateComponent implements OnInit, AfterViewInit, DoCheck, OnDestroy {
  @Output() graphInitialized = new EventEmitter<boolean>();
  @Output() tabViewEmit = new EventEmitter<string>();

  @Input() fragment: any;
  @Input() tabView: any;

  @ViewChild('svgGraphChart') svgGraphChart!: ElementRef;

  private defaultNodeIdSelected = null;

  startDate!: number;
  endDate: number = currentYear;

  activitiesGroupStatus = {
    "job": false,
    "personal-project": false,
    "volunteer": true
  }

  skillsCategoriesStatus: skillsMappingStatus = {
    "themes": true,
    "technics": true,
    "tools": false
  }

  // icons
  ungroupIconUnicode = ungroupIconUnicode;

  currentDate!: number;
  currentNodeIdSelected: string | null = null;

  graphData!: any;

  adjlist!: any;
  labelLayout!: any;
  label!: any;

  chartHeight = 300;
  chartWidth!: number;

  legendWidth = 180; // try to not change
  legendHeight = 120;

  // circle
  strokeWidth = '0px';
  opacityForDisabledNode = 0.2;

  job_identifier: activities = 'job'
  personal_project_identifier: activities = 'personal-project'
  volunteer_identifier: activities = 'volunteer'
  skillsMapping = skillsMapping;
  skill_topics = Object.keys(skillsMapping)

  activityGraphDiv = "#activitiesGraph"
  activityGraphSvgId = "activitiesGraph__svgChart"
  activitiesLegendSvgId = "activitiesGraph__svgLegendActivities"
  skillsLegendSvgId = "activitiesGraph__svgLegendSkills"

  legendActivitiesIdDiv = "#legendGraph__themes"
  legendIdSkillsDiv = "#legendGraph__skills"

  legendActivitiesInputTitles = [
    { id: 'legend-graph-title', label: 'Activités', cx: 5, cy: 15 },
  ];
  legendActivitiesInput = [
    { id: this.job_identifier, status: '',  label: activitiesMapping[this.job_identifier], cx: 20, cy: 49, text_cx: 65, r: 11, rOver: 15 },
    { id: this.personal_project_identifier, status: '', label: activitiesMapping[this.personal_project_identifier], cx: 20, cy: 76, text_cx: 65, r: 11, rOver: 15 },
    { id: this.volunteer_identifier, status: '', label: activitiesMapping[this.volunteer_identifier], cx: 20, cy: 103, text_cx: 65, r: 11, rOver: 15 },
  ];

  legendSkillsInputTitles = [
    { id: 'legend-graph-title', label: 'Compétences', cx: 5, cy: 15 },
  ];
  legendSkillsInput = [
    { id: 'themes', status: 'enabled-topic', label: this.skillsMapping['themes'], cx: 20, cy: 42, text_cx: 35, r: 6, rOver: 10 },
    { id: 'technics', status: 'enabled-topic', label: this.skillsMapping['technics'], cx: 20, cy: 67, text_cx: 35, r: 6, rOver: 10 },
    { id: 'tools', status: 'enabled-topic', label: this.skillsMapping['tools'], cx: 20, cy: 92, text_cx: 35, r: 6, rOver: 10 }
  ];

  legendGroupActivitiesInput = [
    { id: 'job', label: 'grouper jobs', cy: 38, cx: 40 },
    { id: 'personal-project', label: 'grouper projets', cy: 65, cx: 40 },
    { id: 'volunteer', label: 'grouper volunteers', cy: 92, cx: 40 }
  ];
  legendInputs = [...this.legendActivitiesInput, ...this.legendSkillsInput]

  activitiesValidityRangeSubscription!: Subscription;
  graphSubscription!: Subscription;
  activitiesIdSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private mainService: MainService,
  ) {

    this.graphSubscription = this.resumeService.graphDataSubject.subscribe(
      (graphData: any) => {
        this.buildGraph(graphData, this.currentNodeIdSelected);
        // this.highLightNodesGraph(this.tabView)  // useful when the graph is initialized

      }
    );

    this.activitiesValidityRangeSubscription = this.resumeService.validityRangeActivitisJobDataSubject.subscribe(
      (data: any) => {
        this.startDate = data.start_date;
        this.endDate = data.end_date;
        this.currentDate = this.endDate;
        this.getGraphFeatures();
      }
    )

    this.activitiesIdSubscription = this.resumeService.activityId.subscribe(
      (activityId: string) => {
        this.selectGraphNode(activityId)
        this.mainService.scrollToTopAction()
      }
    )

   }

  ngOnInit(): void {
    this.initSvgGraph();
    this.buildActivitiesLegend();
    this.buildSkillsLegend();

    this.resumeService.queryValidityRangeActivitisJobRouteFromApi();

    if (this.fragment !== '') {
      this.selectGraphNode(this.fragment)
    }
  }

  ngDoCheck(): void {
      this.highLightNodesGraph(this.tabView)
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

  enableActivity(tabName: string): void {
    this.tabViewEmit.emit(tabName)
  }

  highLightNodesGraph(activityCategory: string): void {
    const nodes = d3.selectAll(`circle.highlight`)
    if (nodes.size() > 0) {
      nodes.classed('highlight', !nodes.classed('highlight'));
    }
    
    const nodesToHightLight = d3.selectAll(`circle.${activityCategory}`)
    if (nodesToHightLight.size() > 0) {
      nodesToHightLight.classed('highlight', !nodesToHightLight.classed('highlight'));
    }
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
    this.skillsCategoriesStatus.themes = true
    this.skillsCategoriesStatus.technics = true
    this.skillsCategoriesStatus.tools = false

    this.activitiesGroupStatus.job = false;
    this.activitiesGroupStatus['personal-project'] = false;
    this.activitiesGroupStatus.volunteer = true

    this.resetLegend();
    this.getGraphFeatures();

  }

  // here to control default topic graph.
  resetChart(): void {
    this.currentNodeIdSelected = this.defaultNodeIdSelected;
    this.graphReset()
  }

  selectGraphNode(nodeToSelect: string): void {
    this.currentNodeIdSelected = 'node-' + nodeToSelect; // here we want to preselect the chart graph created (few seconds later)
    this.clickOnGraphNode(this.currentNodeIdSelected);
  }

  clickOnGraphNode(nodeId: string): void {
    d3.select(`#${this.activityGraphSvgId} .nodes #${nodeId}`).dispatch('click');
  }

  resetLegend(): void {
    d3.select(`#${this.activitiesLegendSvgId}`).remove();
    this.buildActivitiesLegend();
    d3.select(`#${this.skillsLegendSvgId}`).remove();
    this.buildSkillsLegend()
  }

  private buildActivitiesLegend(): void {
    const svg = d3.select(this.legendActivitiesIdDiv)
      .append('svg').attr('id', this.activitiesLegendSvgId)
      .attr('width', this.legendWidth)
      .attr('height', this.legendHeight);

    const svgContainer = svg.append('g')
      .attr('class', 'skillsLegend');

    const LegendElements = svgContainer.selectAll(null)
      .data(this.legendActivitiesInput)
      .enter()
      .append('g')
      .style('r', (d: any) => d.r)
      .style('stroke-width', this.strokeWidth)
      .on('mouseover', (e: any, d: any) => {
        const element = this.legendActivitiesInput.filter(e => e.id === d.id);
        d3.selectAll(`#${this.activityGraphSvgId} circle.${d.id}`)
        .transition()
        .duration(1000)
        .ease(d3.easeElastic)
          .attr("r", element[0].rOver)         
      })
      .on('mouseout', (e: any, d: any) => {
        const element = this.legendActivitiesInput.filter(e => e.id === d.id);
        d3.selectAll(`#${this.activityGraphSvgId} circle.${d.id}`)
          .transition()
          .duration(1000)
          .ease(d3.easeElastic)
          .attr("r", element[0].r);
      })

    svgContainer.selectAll()
      .data(this.legendGroupActivitiesInput)
      .enter()
      .append('svg:foreignObject')
      .attr('width', 18)
      .attr('height', 18)
      .attr('class', (d: any) => {
        // in order to control the display or node, check header variables
        let classesValue = `${d.id} fw-bolder`;
        if (!this.activitiesGroupStatus[d.id as keyof typeof this.activitiesGroupStatus]) {
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
        // if a selection is done and an activity is group, the selection is reset
        this.currentNodeIdSelected = null

        this.activitiesGroupStatus[
          d.id as keyof typeof this.activitiesGroupStatus
        ] = !this.activitiesGroupStatus[d.id as keyof typeof this.activitiesGroupStatus]

        d3.select(e.currentTarget).classed('disabled-group', !d3.select(e.currentTarget).classed('disabled-group'));
        this.getGraphFeatures();
      });

    svgContainer.selectAll()
      .data(this.legendActivitiesInputTitles)
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
      .attr('class', (d) => d.id + ' pointer svg-color-' + d.id)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('r', (d) => d.r)
      .on('click', (e: any, d: any) => {
        // unselect if needed
        if (this.currentNodeIdSelected !== null) {
          this.clickOnGraphNode(this.currentNodeIdSelected)
        }
        this.enableActivity(d.id)
      });
    
    LegendElements
      .append('text')
        .style('text-anchor', 'left')
        .style('font-size', '12')
        .style('dominant-baseline', 'middle')
        .attr('x', (d: any) => d.text_cx)
        .attr('y', (d: any) => d.cy)
        .text((d: any) => d.label);
  }

  private buildSkillsLegend(): void {
    const svg = d3.select(this.legendIdSkillsDiv)
      .append('svg').attr('id', this.skillsLegendSvgId)
      .attr('width', this.legendWidth)
      .attr('height', this.legendHeight);

    const svgContainer = svg.append('g')
      .attr('class', 'skillsLegend');

    const LegendElements = svgContainer.selectAll(null)
      .data(this.legendSkillsInput)
      .enter()
      .append('g')
      .attr('class', (d) => {
        // in order to control the display or node, check header variables
        let classesValue = `${d.id} ${d.status}`;
        const categoryStatus = this.skillsCategoriesStatus[d.id as keyof typeof this.skillsCategoriesStatus]
        if (!categoryStatus) {
          classesValue = classesValue + ' disabled-node';
        }
        return classesValue;
      })
      .style('r', (d: any) => d.r)
      .style('stroke-width', this.strokeWidth)
      .on('mouseover', (e: any, d: any) => {
        const element = this.legendInputs.filter(e => e.id === d.id);
        d3.selectAll(`#${this.activityGraphSvgId} circle.${d.id}`)
        .transition()
        .duration(1000)
        .ease(d3.easeElastic)
        .attr("r", element[0].rOver)
      })
      .on('mouseout', (e: any, d: any) => {
        const element = this.legendInputs.filter(e => e.id === d.id);
        d3.selectAll(`#${this.activityGraphSvgId} circle.${d.id}`)
          .transition()
          .duration(1000)
          .ease(d3.easeElastic)
          .attr("r", element[0].r);
      })
    .on('click', (e: any, d: any) => {
        this.skillsCategoriesStatus[
          d.id as keyof typeof this.skillsCategoriesStatus
        ] = !this.skillsCategoriesStatus[d.id as keyof typeof this.skillsCategoriesStatus]
        d3.select(e.currentTarget).classed('disabled-node', !d3.select(e.currentTarget).classed('disabled-node'));
        this.getGraphFeatures();
      });

    svgContainer.selectAll()
      .data(this.legendSkillsInputTitles)
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
      .attr('class', (d) => d.id + ' pointer svg-color-' + d.id)
      .attr('cx', (d) => d.cx)
      .attr('cy', (d) => d.cy)
      .attr('r', (d) => d.r)
    
    // create line to display that object is disabled
    LegendElements
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
        .attr('x', (d: any) => d.text_cx)
        .attr('y', (d: any) => d.cy)
        .text((d: any) => d.label);
  }

  private getGraphFeatures(): void {

    // then we want to regenerate activities and skill components
    let skill_categories = Object.keys(this.skillsCategoriesStatus).filter( (key: string) => {
      return this.skillsCategoriesStatus[key as keyof typeof this.skillsCategoriesStatus]
    });

    let activity_group = Object.keys(this.activitiesGroupStatus).filter( (key: string) => {
      return this.activitiesGroupStatus[key as keyof typeof this.activitiesGroupStatus]
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
      .force('y', d3.forceY(this.chartHeight / 2.3))
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
      .attr('class', (d: any) => `svg-color-${d.properties.type} ${d.properties.type} unselected`) // to filter from job/project card
      .attr('id', (d: any) => 'node-' + d.properties.id)
      .attr('r', (d: any) => {
        const element = this.legendInputs.filter(e => e.id === d.properties.type);
          return element[0].r;
      })
      .on('mouseover', (e: any, d: any) => {
        const element = this.legendInputs.filter(e => e.id === d.properties.type);
        d3.select(e.currentTarget)
          .transition()
          .duration(1000)
          .ease(d3.easeElastic)
          .attr("r", element[0].rOver)

        d3.selectAll(`.skillsLegend circle.${d.properties.type}`)
          .transition()
          .duration(1000)
          .ease(d3.easeElastic)
          .attr("r", element[0].rOver)
      })
      .on('mouseout', (e: any, d: any) => {
        const element = this.legendInputs.filter(e => e.id === d.properties.type);
        d3.select(e.currentTarget)
          .transition()
          .duration(1000)
          .ease(d3.easeElastic)
          .attr("r", element[0].r)
        
        d3.selectAll(`.skillsLegend circle.${d.properties.type}`)
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
        if (d.properties.object == "activityGroup") {
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

      } else if (nodeIsPreselected.size() === 1) {
        // unclick we want to unselect the node, only on the original node !
        this.currentNodeIdSelected = this.defaultNodeIdSelected;
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
    if (nodeIdToSelect !== null) {
      // only for anchor
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
      opacity = this.opacityForDisabledNode
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
      .style('opacity', (d: any) => this._selectNeighbors(index, d.index) ? 1 : this.opacityForDisabledNode)
      .style('pointer-events', (d: any) => this._selectNeighbors(index, d.index) ? 'auto' : 'none')
      .style('cursor', (d: any) => this._selectNeighbors(index, d.index) ? 'pointer' : 'unset');

    d3.selectAll(`#${this.activityGraphSvgId} .nodeLabels text`)
      .attr('display', (d: any) => this._selectNeighbors(index, d.index) ? 'block' : 'none');
    
    d3.selectAll(`#${this.activityGraphSvgId} .links line`)
      .style('opacity', (d: any) => d.source.index === index || d.target.index === index ? 1 : this.opacityForDisabledNode);
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
    //to not fit drag on the bound
    // nodeElement.attr("transform", (d: any) => {
    //     return "translate(" + this._fixna(d.x) + "," + this._fixna(d.y) + ")";
    // });
    const radius = 30;
    nodeElement
      .attr('cx', (d: any) => d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)))
      .attr('cy', (d: any) => d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)))
  }

  private _updateNodeLabel(labelElement: any): void {
    //to not fit drag on the bound
    labelElement.attr("transform", (d: any) => {
        return "translate(" + this._fixna(d.x + 10) + "," + this._fixna(d.y - 10) + ")";
    });
    // const radius = 10;
    // labelElement
    //   .attr('x', (d: any) => d.x = Math.max(radius, Math.min(this.chartWidth - radius, d.x)))
    //   .attr('y', (d: any) => d.y = Math.max(radius, Math.min(this.chartHeight - radius, d.y)));
  }


  // Build parameters for api call // 
  private _buildSkillsCategoriesParameters(): string[] {
    return Object.keys(this.skillsCategoriesStatus).filter((key: string) => this.skillsCategoriesStatus[key as keyof typeof this.skillsCategoriesStatus])
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




