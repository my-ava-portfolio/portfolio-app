import { Component, OnInit, Input } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-activities-graph',
  templateUrl: './activities-graph.component.html',
  styleUrls: ['./activities-graph.component.css']
})
export class ActivitiesGraphComponent implements OnInit {
  @Input() graphInputData!: any;

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
    { id: 'grouper_jobs group_disabled', label: 'grouper jobs', cy: 32, text_cx: 35 },  // jobs grouped is disabled (style)
    { id: 'grouper_projects', label: 'grouper projets', cy: 57, text_cx: 35 }
  ];

  constructor() { }

  ngOnInit(): void {

    this.buildActivitiesGraph();
  }

  buildActivitiesGraph() {

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

        let nodeSelectedOnGraph = d3.select('#skillsGraphElements .nodes .selected');

        if (nodeSelectedOnGraph.size() === 0) {
          // if none node is selected
          console.log('a')
          // this.buildGraphElements('');

        } else if (nodeSelectedOnGraph.size() === 1) {
          // if a node is selected
          let element_selected_in_graph = nodeSelectedOnGraph.attr('class').split(/\s+/);

          if (
            element_selected_in_graph.includes('themes')
            || element_selected_in_graph.includes('technics')
            || element_selected_in_graph.includes('tools')
          ) {
              // it's a skill node
              // unselect (so it's like a reset but on the current date)
              // this.buildGraphElements('');
          } else {
              // it's a job/project node
              // click on the expected node
              // this.buildGraphElements(element_selected_on_graph.attr('id'));
          }
        }
      });

    svgContainer.selectAll()
      .data(this.legend_group_input)
      .enter()
        .append('svg:foreignObject')
        .attr('width', 18)
        .attr('height', 18)
        .attr('class', (d: any) => d.id)
        .html('<i class="fas fa-object-group"></i>')
        .attr('x', (d: any) => d.text_cx)
        .attr('y', (d: any) => d.cy)
        .on('click', (d: any, i: any, n: any) => {
            d3.select(n[i]).classed('group_disabled', !d3.select(n[i]).classed('group_disabled'));
            // this.buildGraphElements('');
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

    // this.buildGraphElements('');

  }

}


