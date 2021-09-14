import { AfterViewInit, Component, OnInit, Input, ElementRef, ViewChild, OnDestroy } from '@angular/core';

import * as d3 from 'd3';

import { Subscription } from 'rxjs';

import { ResumeService } from '../../services/resume.service';
import { topicIcon, helpIcon, ungroupIconUnicode, nextIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-navigation',
  templateUrl: './centerbar-navigation.component.html',
  styleUrls: ['./centerbar-navigation.component.scss']
})
export class CenterBarNavigationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() graphInputData!: any;

  @ViewChild('svgGraphChart') svgGraphChart!: ElementRef;

  private defaultNodeIdSelected = null;

  isJobsGrouped: boolean | string = false;
  isProjectsGrouped: boolean | string = true;
  isVolunteersGrouped: boolean | string = true;
  isThemesEnabled: boolean | string = true;
  isTechnicsEnabled: boolean | string = true;
  isToolsEnabled: boolean | string = false;

  // icons
  topicIcon = topicIcon;
  helpIcon = helpIcon;
  ungroupIconUnicode = ungroupIconUnicode;
  nextIcon = nextIcon;

  currentDate: number = new Date().getFullYear();
  currentNodeIdSelected: string | null = null;

  graphData!: any;
  currentJobsActivitiesData: any = [];
  currentPersonalProjectsActivitiesData: any = [];
  currentVolunteersActivitiesData: any = [];

  adjlist!: any;
  labelLayout!: any;
  label!: any;

  chartHeight = 300;
  chartWidth!: number;

  legendWidth = 270;
  legendHeight = 120;

  // circle
  strokeWidth = '0px';

  job_identifier = 'job'
  personal_project_identifier = 'personal_project'
  volunteer_identifier = 'volunteer'

  legendInputTitles = [
    { id: 'legend_graph_title', label: 'Activités', cx: 5, cy: 15 },
    { id: 'legend_graph_title', label: 'Compétences', cx: 160, cy: 15 },
  ];

  // here to control topic graph... TODO improve it !
  legendInput = [
    { id: this.job_identifier, status: 'unabled-topic', label: 'Expériences', cx: 20, cy: 42, text_cx: 55, r: 10, rOver: 15 },
    { id: this.personal_project_identifier, status: 'unabled-topic', label: 'Projets personnels', cx: 20, cy: 67, text_cx: 55, r: 10, rOver: 15 },
    { id: this.volunteer_identifier, status: 'unabled-topic', label: 'Bénévolat', cx: 20, cy: 92, text_cx: 55, r: 10, rOver: 15 },
    { id: 'themes', status: 'enabled-topic', label: 'Thématiques', cx: 175, cy: 42, text_cx: 190, r: 5, rOver: 10 },
    { id: 'technics', status: 'enabled-topic', label: 'Techniques', cx: 175, cy: 67, text_cx: 190, r: 5, rOver: 10 },
    { id: 'tools', status: 'enabled-topic', label: 'Outils', cx: 175, cy: 92, text_cx: 190, r: 5, rOver: 10 }
  ];

  legendGroupInput = [
    { id: 'grouper_jobs', label: 'grouper jobs', cy: 31, cx: 35 },  // jobs grouped is disabled (style)
    { id: 'grouper_projects', label: 'grouper projets', cy: 56, cx: 35 },
    { id: 'grouper_volunteers', label: 'grouper volunteers', cy: 82, cx: 35 }
  ];

  activitiesFilteredSubscription!: Subscription;
  activitiesIdSubscription!: Subscription;
  activitiesJobsAvailableSubscription!: Subscription;
  activitiesProjectsAvailableSubscription!: Subscription;


  constructor(
    private resumeService: ResumeService,
  ) {

    this.activitiesFilteredSubscription = this.resumeService.ActivitiesChartData.subscribe(
      (data) => {
        this.graphData = data;

        // current_activities
        this._generateGraph(this.currentNodeIdSelected);

      },
      (error) => {
        console.log('error');
      }
    );


    this.activitiesIdSubscription = this.resumeService.activityId.subscribe(
      (activityId) => {
        if (this.currentNodeIdSelected === null) {
          // in order to filter graph from components job and personal project
          const elementId: string = 'node-' + activityId;
          this.rebuildActivitiesChartWithAPreselection(elementId);
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

    this.activitiesJobsAvailableSubscription = this.resumeService.activitiesAvailable.subscribe(
      (activitiesAvailable) => {
        // to display activities list
        this.currentPersonalProjectsActivitiesData = activitiesAvailable.personal_projects;
        this.currentJobsActivitiesData = activitiesAvailable.jobs;
        this.currentVolunteersActivitiesData = activitiesAvailable.volunteers
      }
    )

   }

  ngOnInit(): void {
    this.initSvgGraph();
    this._buildLegendGraphActivities();
    this.resetChart();
  }

  ngAfterViewInit(): void {
    this.chartWidth = this.svgGraphChart.nativeElement.offsetWidth;
  }

  ngOnDestroy(): void {
    this.activitiesFilteredSubscription.unsubscribe();
    this.activitiesIdSubscription.unsubscribe();
  }

  graphHightligthing(activityIdentifier: string, activityType: string): void {

    const nodeToPreselected = d3.selectAll('#skillsGraphElements #node-' + activityIdentifier);

    if ( nodeToPreselected.size() === 1 ) {
      this._graphSelectedFiltering('#skillsGraphElements #node-' + activityIdentifier, false);
    } else if ( nodeToPreselected.size() === 0 ) {
      // means that activities are grouped
      if ( activityType === this.job_identifier ) {
        // job node grouped
        this._graphSelectedFiltering('#skillsGraphElements #node-job', false);
      } else if ( activityType === this.personal_project_identifier ) {
        // personal project node grouped
        this._graphSelectedFiltering('#skillsGraphElements #node-personal_project', false);
      } else if ( activityType === this.volunteer_identifier ) {
        // volunteer node grouped
        this._graphSelectedFiltering('#skillsGraphElements #node-volunteer', false);
      }
      // this.nodehighlighter()
    } else {
      console.log("graph hightlighting error")
    }
  }

  graphUnHightligthing(): void {
    this._defaultDisplayingByDate();
  }

  updateDate(event: any): void {
    this.currentDate = event.target.value;
    this.buildGraphElements();
  }

  private initSvgGraph(): void {
    d3.select('.graph-content')
      .append('svg').attr('id', 'svgSkillsChart')
      .attr('width', '100%')
      .attr('height', this.chartHeight)
      .append('g').lower()
      .attr('id', 'skillsGraphElements');
  }

  // here to control default topic graph.
  resetChart(): void {
    this.currentNodeIdSelected = this.defaultNodeIdSelected;
    this.currentDate = this.graphInputData.end_date_graph_slider;
    this.isThemesEnabled = true;
    this.isTechnicsEnabled = true;
    this.isToolsEnabled = false;
    this.isJobsGrouped = false;
    this.isProjectsGrouped = false;
    this.isVolunteersGrouped = true;
    this.resetLegend();
    this.buildGraphElements();
  }

  // scrollToActivity(activityId: string): void {
  //   const nodeSelected = d3.selectAll('#svgSkillsChart .nodes .selected');
  //   if (nodeSelected.size() === 1) {
  //     nodeSelected.dispatch('click');
  //   }
  //   const nodeSelected_1 = d3.selectAll('#svgSkillsChart .nodes .selected');
  //   if (nodeSelected_1.size() === 0) {
  //     const element: any = window.document.getElementById(activityId);
  //     element.scrollIntoView();
  //   }
  // }

  rebuildActivitiesChartWithAPreselection(nodeToSelect: string): void {
    this.currentNodeIdSelected = nodeToSelect; // here we want to preselect the chart graph created (few seconds later)
    this.currentDate = this.graphInputData.end_date_graph_slider;
    this.isThemesEnabled = true;
    this.isTechnicsEnabled = true;
    this.isToolsEnabled = false;
    this.isJobsGrouped = false;
    this.isProjectsGrouped = false;
    this.isVolunteersGrouped = false
    this.resetLegend();
    this.buildGraphElements();
    d3.select('#svgSkillsChart .nodes #node-' + nodeToSelect).dispatch('click');
  }

  resetLegend(): void {
    d3.select('#svgSkillsLegend').remove();
    this._buildLegendGraphActivities();
  }

  private _buildLegendGraphActivities(): void {
    const svg = d3.select('.graph-legend')
      .append('svg').attr('id', 'svgSkillsLegend')
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
        let classesValue = d.id + ' ' + d.status;
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

        const nodeSelectedOnGraph = d3.select('#skillsGraphElements .nodes .selected');

        if (nodeSelectedOnGraph.size() === 0) {
          // if none node is selected
          this.buildGraphElements();

        } else if (nodeSelectedOnGraph.size() === 1) {
          // if a node is selected
          const elementSelectedInGraph = nodeSelectedOnGraph.attr('class').split(/\s+/);

          if (
            elementSelectedInGraph.includes('themes')
            || elementSelectedInGraph.includes('technics')
            || elementSelectedInGraph.includes('tools')
          ) {
            // it's a skill node
            // unselect (so it's like a reset but on the current date)
            this.buildGraphElements();
          } else {
            // it's a job/project node
            // click on the expected node
            this.buildGraphElements();
          }
        }
      });

    svgContainer.selectAll()
      .data(this.legendGroupInput)
      .enter()
      .append('svg:foreignObject')
      .attr('width', 18)
      .attr('height', 18)
      .attr('class', (d: any) => {
        // in order to control the display or node, check header variables
        let classesValue = d.id + ' font-weight-bold';
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
        this.buildGraphElements();
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
        .attr('class', (d) => d.id)
        .attr('cx', (d) => d.cx)
        .attr('cy', (d) => d.cy)
        .attr('r', (d) => d.r);

    LegendElements
      .append('text')
        .style('text-anchor', 'left')
        .style('font-size', '12')
        .style('dominant-baseline', 'middle')
        // .style("pointer-events", "auto")
        .attr('x', (d: any) => d.text_cx)
        .attr('y', (d: any) => d.cy)
        .text((d: any) => d.label);

    // TODO seems regenerate graph twice
    // this.buildGraphElements('');

  }

  private buildGraphElements(): void {

    if (!this.isJobsGrouped) {
      this.isJobsGrouped = '';
    }

    if (!this.isProjectsGrouped) {
      this.isProjectsGrouped = '';
    }

    if (!this.isVolunteersGrouped) {
      this.isVolunteersGrouped = '';
    }

    if (!this.isTechnicsEnabled) {
      this.isTechnicsEnabled = '';
    }

    if (!this.isThemesEnabled) {
      this.isThemesEnabled = '';
    }

    if (!this.isToolsEnabled) {
      this.isToolsEnabled = '';
    }

    this.resumeService.pullActivitiesGraphData(
      this.isTechnicsEnabled,
      this.isThemesEnabled,
      this.isToolsEnabled,
      this.currentDate,
      this.isProjectsGrouped,
      this.isJobsGrouped,
      this.isVolunteersGrouped,
    );
  }

  private _initLabel(): void {
    const nodes: any[] = [];
    const links: any[] = [];

    this.label = {
        nodes,
        links
    };
  }

  private _generateGraph(nodeIdToSelect: string | null): void {

    this._initLabel();

    this.graphData.nodes.forEach( (d: any, i: number) => {
      this.label.nodes.push({node: d});
      this.label.nodes.push({node: d});
      this.label.links.push({
        source: i * 2,
        target: i * 2 + 1
      });
    });

    const svgElements: any = d3.select('#skillsGraphElements');
    d3.select('#svgSkillsChart .bg-date').remove();
    svgElements.append('g').attr('class', 'bg-date')
      .append('text')
      .attr('x', '50%')
      .attr('y', '50%')
      .text(this.currentDate);

    this._buildLabelLayout();

    const graphLayout = d3.forceSimulation(this.graphData.nodes)
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX(this.chartWidth / 2))
      .force('y', d3.forceY(this.chartHeight / 2))
      .force('center', d3.forceCenter(this.chartWidth / 2, this.chartHeight / 2))
      .force('link', d3.forceLink(this.graphData.links).id( (d: any) => {
          return d.properties.name;
      }).distance(60).strength(1))
      .nodes(this.graphData.nodes)
      .on('tick', this._ticked.bind(this));

    this.adjlist = {};
    this.graphData.links.forEach( (d: any): any => {
      this.adjlist[d.source.index + '-' + d.target.index] = true;
      this.adjlist[d.target.index + '-' + d.source.index] = true;
    });


    d3.select('#svgSkillsChart .links').remove();
    d3.select('#svgSkillsChart .nodes').remove();
    d3.select('#svgSkillsChart .nodeLabels').remove();

    const link = svgElements.append('g').attr('class', 'links')
      .selectAll('line')
      .data(this.graphData.links)
      .enter()
      .append('line')
      .attr('stroke', '#aaa')
      .attr('stroke-width', '1px');

    const node = svgElements.append('g').attr('class', 'nodes')
      .selectAll('circle')
      .data(this.graphData.nodes)
      .enter()
      .append('circle')
      .attr('class', (d: any) => {
          return d.properties.type + ' unselected'; // to filter from job/project card
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
        d3.select(e.currentTarget).attr('r', element[0].rOver);
      })
      .on('mouseout', (e: any, d: any) => {
        const element = this.legendInput.filter(e => e.id === d.properties.type);
        d3.select(e.currentTarget).attr('r', element[0].r);
       })
      ;


    const labelNode = svgElements.append('g').attr('class', 'nodeLabels')
      .selectAll('text')
      .data(this.label.nodes)
      .enter()
      .append('text')
      .text( (d: any, i: number) => {
          return i % 2 === 0 ? '' : d.node.properties.name;
      })
      .attr('id', (d: any) => {
        return 'label-' + d.node.properties.id;
      })
      .attr('class', (d: any) => {
          return d.node.properties.type;
      });

    node.on('click', (e: any, d: any, i: any, n: any) => {
      const nodeIsPreselected = d3.select('#skillsGraphElements .nodes .selected');

      if (nodeIsPreselected.size() === 0) {
        // click nothing is selected, so we want to select the new selected node
        this.currentNodeIdSelected = d3.select(e.currentTarget).attr('id');
        this._graphSelectedFiltering(e.currentTarget);

      } else if (nodeIsPreselected.size() === 1) {
        // unclick we want to unselect the node, only on the original node !
        this.currentNodeIdSelected = this.defaultNodeIdSelected;
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
    d3.selectAll('#svgSkillsChart .links line').style('opacity', 1);

    d3.selectAll('#svgSkillsChart .nodes circle')
      .style('opacity', 1)
      .style('pointer-events', 'auto')
      .style('cursor', 'pointer');

    d3.selectAll('#svgSkillsChart .nodeLabels text')
      .attr('display', 'block');
  }

  private _focusOnGraph(element: any): any {

    let value: unknown | any;
    value = element.datum();
    const index = value.index;
    const otherNodes = d3.selectAll('#svgSkillsChart .nodes circle');

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

    const labelNodes = d3.selectAll('#svgSkillsChart .nodeLabels text');
    labelNodes.attr('display', (o: any) => {
        return this._neigh(index, o.node.index) ? 'block' : 'none';
    });
    const links = d3.selectAll('#svgSkillsChart .links line');
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
    this.resumeService.pullActivitiesResumeFromGraph(
      this.currentDate,
      this.isThemesEnabled,
      this.isTechnicsEnabled,
      this.isToolsEnabled,
      null
    );
  }


  private _graphSelectedFiltering(element: string, withContent = true): void {

    const elementSelected: any = d3.select(element);
    if (elementSelected.size() > 0) {
      elementSelected.classed('unselected', !elementSelected.classed('unselected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' selected');

      this._focusOnGraph(elementSelected);
      if ( withContent ) {
        const elementData: any = d3.select(element).data()[0];
        // check origin node type

        this.resumeService.pullActivitiesResumeFromGraph(
          this.currentDate,
          this.isThemesEnabled,
          this.isTechnicsEnabled,
          this.isToolsEnabled,
          elementData.properties.id
        );
      }


    } else {

      this.resumeService.pullActivitiesResumeFromGraph(
        this.currentDate,
        this.isThemesEnabled,
        this.isTechnicsEnabled,
        this.isToolsEnabled,
        null
      );
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
    const links: any = d3.selectAll('#svgSkillsChart .links line');
    const nodes: any = d3.selectAll('#svgSkillsChart .nodes circle');
    const labelNodes: any = d3.selectAll('#svgSkillsChart .nodeLabels text');

    nodes.call(this._updateNode.bind(this));
    links.call(this._updateLink.bind(this));

    this.labelLayout.alphaTarget(0.1).restart();
    labelNodes.each( (d: any, i: number) => {
      if (i % 2 === 0) {
        d.x = d.node.x;
        d.y = d.node.y;
      } else {
        // TODO maybe not working
        d3.select('#label-' + d.id).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
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


