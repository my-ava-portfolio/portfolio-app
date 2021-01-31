import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-activities-graph',
  templateUrl: './activities-graph.component.html',
  styleUrls: ['./activities-graph.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ActivitiesGraphComponent implements OnInit {
  @Input() graphInputData!: any;

  private defaultActivityCategoryId = '';
  private defaultNodeIdSelected = '';

  currentDate!: number;
  currentActivityCategoryId!: string;
  currentNodeIdSelected!: string;

  graphData!: any;

  chartHeight = 300;

  themes_title = '1themes';
  technis_title = '2technics';
  tools_title = '3tools';

  skill_categories_ids = [this.themes_title, this.technis_title, this.tools_title];

  legend_input_titles = [
    { id: 'legend_graph_title', label: 'Activités', cx: 5, cy: 15 },
    { id: 'legend_graph_title', label: 'Compétences', cx: 160, cy: 15 },
  ];

  legend_input = [
    { id: 'jobs', status: 'silent-topic', label: 'Expériences', cx: 20, cy: 42, text_cx: 55, r: 10 },
    { id: 'personal_projects', status: 'silent-topic', label: 'Projets personnels', cx: 20, cy: 67, text_cx: 55, r: 10 },
    { id: 'themes', status: 'active-topic', label: 'Thématiques', cx: 175, cy: 35, text_cx: 190, r: 6 },
    { id: 'technics', status: 'active-topic', label: 'Techniques', cx: 175, cy: 55, text_cx: 190, r: 6 },
    { id: 'tools', status: 'active-topic node_disabled', label: 'Outils', cx: 175, cy: 75, text_cx: 190, r: 6 }
  ];

  legend_group_input = [
    { id: 'grouper_jobs group_disabled', label: 'grouper jobs', cy: 28, cx: 35, text: '❉' },  // jobs grouped is disabled (style)
    { id: 'grouper_projects', label: 'grouper projets', cy: 54, cx: 35, text: '❉' }
  ];

  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.ActivitiesChartData.subscribe(
      (data) => {
        console.log(this.currentActivityCategoryId, this.currentNodeIdSelected, this.currentDate)
        this.graphData = data
        this.generateGraph(this.currentNodeIdSelected)
      },
      (error) => {
        console.log('error');
      }
    );

   }

  ngOnInit(): void {
    this.currentActivityCategoryId = this.defaultActivityCategoryId
    this.currentNodeIdSelected = this.defaultNodeIdSelected
    this.currentDate = this.graphInputData.end_date_graph_slider;
    this.initSvgGraph();
    this.buildActivitiesGraph();
    this.buildGraphElements(this.currentActivityCategoryId);
  }

  updateDate(event: any): void {
    this.currentDate = event.target.value;
    this.buildGraphElements(this.currentActivityCategoryId)
  }

  initSvgGraph(): void {
    const svgGraph = d3.select('.carrier_summary_chart')
    .append('svg').attr('id', 'svgSkillsChart')
    .attr('width', '100%')
    .attr('height', this.chartHeight)
    .append('g').lower().attr('id', 'skillsGraphElements');
  }



  buildActivitiesGraph(): void {

    const svg = d3.select('.carrier_summary_legend')
      .append('svg').attr('id', 'svgSkillsLegend')
      .attr('width', 270)
      .attr('height', 100);

    const svgContainer = svg.append('g')
      .attr('class', 'skillsLegend');

    const LegendElements = svgContainer.selectAll(null)
      .data(this.legend_input)
      .enter()
      .append('g')
      .attr('class', (d) => {
            return 'group_' + d.id + ' ' + d.status;
      })
      .on('click', (d: any, i: any, n: any) => {
        d3.select(n[i]).classed('node_disabled', !d3.select(n[i]).classed('node_disabled'));

        const nodeSelectedOnGraph = d3.select('#skillsGraphElements .nodes .selected');

        if (nodeSelectedOnGraph.size() === 0) {
          // if none node is selected
          console.log('a');
          this.buildGraphElements(this.currentActivityCategoryId);

        } else if (nodeSelectedOnGraph.size() === 1) {
          // if a node is selected
          const element_selected_in_graph = nodeSelectedOnGraph.attr('class').split(/\s+/);

          if (
            element_selected_in_graph.includes('themes')
            || element_selected_in_graph.includes('technics')
            || element_selected_in_graph.includes('tools')
          ) {
              // it's a skill node
              // unselect (so it's like a reset but on the current date)
              this.currentActivityCategoryId = this.defaultActivityCategoryId
              this.buildGraphElements(this.currentActivityCategoryId);
          } else {
              // it's a job/project node
              // click on the expected node
              this.currentActivityCategoryId = nodeSelectedOnGraph.attr('id')
              this.buildGraphElements(this.currentActivityCategoryId);
          }
        }
      });

    svgContainer.selectAll()
      .data(this.legend_group_input)
      .enter()
      .append('svg:foreignObject')
      .attr('width', 18)
      .attr('height', 18)
      .attr('class', (d: any) => d.id + ' font-weight-bold')
      .text(function (d: any) { return d.text })
      .attr('x', (d: any) => d.cx)
      .attr('y', (d: any) => d.cy)
      .on('click', (d: any, i: any, n: any) => {
        d3.select(n[i]).classed('group_disabled', !d3.select(n[i]).classed('group_disabled'));
        this.currentActivityCategoryId = this.defaultActivityCategoryId
        this.buildGraphElements(this.currentActivityCategoryId);
      });

    svgContainer.selectAll()
      .data(this.legend_input_titles)
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


  buildGraphElements(activityCategoryId: string): void {
    // $("#svgSkillsChart").remove()

    const currentDateValue = this.currentDate;

    // ungroup if necessary
    const grouperJobsElement = d3.select('#svgSkillsLegend .grouper_jobs');
    const grouperProjectsElement = d3.select('#svgSkillsLegend .grouper_projects');

    if (activityCategoryId === 'jobs' && !grouperJobsElement.classed('group_disabled')) {
      grouperJobsElement.classed('group_disabled', !grouperJobsElement.classed('group_disabled'));

    } else if (activityCategoryId === 'personal_projects' && !grouperProjectsElement.classed('group_disabled')) {
      grouperProjectsElement.classed('group_disabled', !grouperProjectsElement.classed('group_disabled'));

    } else if (activityCategoryId === 'jobs_and_personal_projects') {
      if (!grouperJobsElement.classed('group_disabled')) {
        grouperJobsElement.classed('group_disabled', !grouperJobsElement.classed('group_disabled'));
      }
      if (!grouperProjectsElement.classed('group_disabled')) {
        grouperProjectsElement.classed('group_disabled', !grouperProjectsElement.classed('group_disabled'));
      }
    }


    let isTechnics: boolean | string = true;
    const technicsNodeDisabled = d3.select('.skillsLegend .group_technics').classed('node_disabled');
    if (technicsNodeDisabled) {
      isTechnics = '';
    }

    let isThemes: boolean | string = true;
    const themesNodeDisabled = d3.select('.skillsLegend .group_themes').classed('node_disabled');
    if (themesNodeDisabled) {
      isThemes = '';
    }

    let isTools: boolean | string = true;
    const toolsNodeDisabled = d3.select('.skillsLegend .group_tools').classed('node_disabled');
    if (toolsNodeDisabled) {
      isTools = '';
    }

    let grouperProjects: boolean | string = true;
    const grouperProjectsDisabled = d3.select('.skillsLegend .grouper_projects').classed('group_disabled');
    if (grouperProjectsDisabled) {
      grouperProjects = '';
    }

    let grouperJobs: boolean | string = true;  // group jobs is disabled (display)
    const grouperJobsDisabled = d3.select('.skillsLegend .grouper_jobs').classed('group_disabled');
    if (grouperJobsDisabled) {
      grouperJobs = '';
    }

    this.resumeService.pullActivitiesGraphData(
      isTechnics,
      isThemes,
      isTools,
      currentDateValue,
      grouperProjects,
      grouperJobs
    )
  }

  generateGraph(nodeIdToSelect: string): void {

    const nodes: any[] = [];
    const links: any[] = [];

    const label = {
        nodes,
        links
    };

    this.graphData.nodes.forEach( (d: any, i: number) => {
        label.nodes.push({node: d});
        label.nodes.push({node: d});
        label.links.push({
            source: i * 2,
            target: i * 2 + 1
        });
    });

    const svgElements: any = d3.select('#skillsGraphElements')
    d3.select('#svgSkillsChart .GraphDate').remove();
    svgElements.append('g').attr('class', 'GraphDate')
      .append('text')
      .attr('x', '50%')
      .attr('y', '50%')
      .text(this.currentDate);

    const labelLayout = d3.forceSimulation(label.nodes)
      .force('charge', d3.forceManyBody().strength(-50))
      .force('link', d3.forceLink(label.links).distance(0).strength(2));

    // TODO improve width... (define it)
    // const chartWidth: any = d3.select('#svgSkillsChart').node().getBBox().width()
    const chartWidth = 560;
    const graphLayout = d3.forceSimulation(this.graphData.nodes)
      .force('charge', d3.forceManyBody().strength(-400))
      .force('x', d3.forceX(chartWidth / 2))
      .force('y', d3.forceY(this.chartHeight / 2))
      .force('center', d3.forceCenter(chartWidth / 2, this.chartHeight / 2))
      .force('link', d3.forceLink(this.graphData.links).id( (d: any) => {
          return d.properties.name;
      }).distance(60).strength(1))
      .nodes(this.graphData.nodes)
      .on('tick', ticked);

    const adjlist: any = {};
    this.graphData.links.forEach( (d: any): any => {
        adjlist[d.source.index + '-' + d.target.index] = true;
        adjlist[d.target.index + '-' + d.source.index] = true;
    });

    function neigh(a: any, b: any): boolean {
        return a === b || adjlist[a + '-' + b];
    }

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
          const element = this.legend_input.filter(e => e.id === d.properties.type);
          return element[0].r;
      });


    const labelNode = svgElements.append('g').attr('class', 'nodeLabels')
      .selectAll('text')
      .data(label.nodes)
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

    node.on('click', (d: any, i: any, n: any) => {
      const nodeIsPreselected = d3.select('#skillsGraphElements .nodes .selected');

      if (nodeIsPreselected.size() === 0) {
        // click nothing is selected, so we want to select the new selected node
        this.currentNodeIdSelected = d3.select(n[i]).attr("id");
        console.log(this.currentNodeIdSelected)
        SelectedDisplaying(this, n[i]);

      } else if (nodeIsPreselected.size() === 1) {
        // unclick we want to unselect the node, only on the original node !
        this.currentNodeIdSelected = this.defaultNodeIdSelected

        defaultDisplayingByDate(this);

      } else {
          // nothing here : to avoid unfocused action on an other node than the origin node, else it will disable the graph interactivity
      }
    });

    node.call(
      d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

    // to preselect a node
    if ( nodeIdToSelect.length > 0 ) {
      SelectedDisplaying(this, '#skillsGraphElements #' + nodeIdToSelect);
    } else {
      defaultDisplayingByDate(this);
    }
    // TODO place div on the right place
    // $('#technis').prependTo('.skills_bar');
    // $('#themes').prependTo('.skills_bar');

    function ticked(): void {

      node.call(updateNode);
      link.call(updateLink);

      labelLayout.alphaTarget(0.1).restart();
      labelNode.each( (d: any, i: number) => {
        if (i % 2 === 0) {
          d.x = d.node.x;
          d.y = d.node.y;
        } else {
          // TODO maybe not working
          d3.select('#label-' + d.id).attr('transform', 'translate(' + d.x + ',' + d.y + ')');
        }
      });
      // REFACTOR
      labelNode.call(updateLabelNode);
    }

    function fixna(x: number): number {
        if ( isFinite(x) ) { return x; }
        return 0;
    }

    function SelectedDisplaying(self: any, element: string): void {

      const elementSelected = d3.select(element)
      elementSelected.classed('unselected', !elementSelected.classed('unselected'));
      elementSelected.attr('class', elementSelected.attr('class') + ' selected');

      const nodes_displayed = focus_on_graph(element);

      const element_data: any = d3.select(element).data()[0];
      // check origin node type

      // callApiProfil(currentDate, element_data.properties.id);
      self.resumeService.pullSkillsResumeFromGraph(self.currentDate, element_data.properties.id);
      self.resumeService.pullActivitiesResumeFromGraph(self.currentDate, element_data.properties.id);


    }

    function defaultDisplayingByDate(self: any) {

      const elementSelected = d3.select('#skillsGraphElements .nodes .selected');
      if (elementSelected.size() === 1) {
        console.log(elementSelected.attr('class'))

          elementSelected.classed('selected', !elementSelected.classed('selected'));
          elementSelected.attr('class',  elementSelected.attr('class') + ' unselected');
          unfocus_on_graph();
        }
      self.resumeService.pullSkillsResumeFromGraph(self.currentDate, null);
      self.resumeService.pullActivitiesResumeFromGraph(self.currentDate, null);
    }

    function focus_on_graph(element: any): void {
        let value: unknown | any
        value = d3.select(element).datum();
        const index = value.index;
        const nodeDisplayed = node.filter( (e: any) => {
            return neigh(index, e.index);
        });
        node.style('opacity', (o: any) => {
            return neigh(index, o.index) ? 1 : 0.1;
        });
        node.style('pointer-events', (o: any) => {
            return neigh(index, o.index) ? 'auto' : 'none';
        });
        node.style('cursor', (o: any) => {
            return neigh(index, o.index) ? 'pointer' : 'unset';
        });
        labelNode.attr('display', (o: any) => {
            return neigh(index, o.node.index) ? 'block' : 'none';
        });
        link.style('opacity', (o: any) => {
            return o.source.index === index || o.target.index === index ? 1 : 0.1;
        });

        return nodeDisplayed;
    }

    function unfocus_on_graph() {
        labelNode.attr('display', 'block');
        node.style('opacity', 1);
        node.style('pointer-events', 'auto');
        node.style('cursor', 'pointer');
        link.style('opacity', 1);
    }

    function updateLink(link: any): any {
      link.attr('x1', (d: any) => {
        return fixna(d.source.x);
      })
      .attr('y1', (d: any) => {
        return fixna(d.source.y);
      })
      .attr('x2', (d: any) => {
        return fixna(d.target.x);
      })
      .attr('y2', (d: any) => {
        return fixna(d.target.y);
      });
    }

    function updateNode(node: any) {
      // to not fit drag on the bound
      // node.attr("transform", function(d) {
      //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
      // });
      const radius = 10;

      // TODO improve width... (define it)
      // const chartWidth: any = d3.select('#svgSkillsChart').node().getBBox().width()
      const chartWidth = 560;
      const chartHeight = 300;

      node
        .attr('cx', (d: any) => {
          return (d.x = Math.max(radius, Math.min(chartWidth - radius, d.x)));
        })
        .attr('cy', (d: any) => {
          return (d.y = Math.max(radius, Math.min(chartHeight - radius, d.y)));
        });
    }

    function updateLabelNode(labelNode: any) {
      // to not fit drag on the bound
      // node.attr("transform", function(d) {
      //     return "translate(" + fixna(d.x) + "," + fixna(d.y) + ")";
      // });
      const radius = 10;

      // TODO improve width... (define it)
      // const chartWidth: any = d3.select('#svgSkillsChart').node().getBBox().width()
      const chartWidth = 560;
      const chartHeight = 300;

      labelNode
        .attr('x', (d: any) => {
          return (d.x = Math.max(radius, Math.min(chartWidth - radius, d.x)));
        })
        .attr('y', (d: any) => {
          return (d.y = Math.max(radius, Math.min(chartHeight - radius, d.y)));
        });
    }

    function dragstarted(d: any): void {
      d3.event.sourceEvent.stopPropagation();
      if (!d3.event.active) {
        graphLayout.alphaTarget(0.3).restart()
      };
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d: any): void {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d: any): void {
      if (!d3.event.active) {
        graphLayout.alphaTarget(0)
      };
      d.fx = null;
      d.fy = null;
    }

  }

}


