import { TimeLineComponent } from '@shared/modules/timeline/time-line/time-line.component';
import { activitiesStyle, activityLayerName, activitySelectedStyle, getFeatureFromLayer } from '@modules/map-activities/shared/core';
import { Component, OnInit, ViewEncapsulation, Input, SimpleChanges, OnChanges } from '@angular/core';

import { Subscription } from 'rxjs';


import { MapService } from '@services/map.service';

import * as d3 from 'd3';
import { legendActivitiesId } from '@modules/map-activities/shared/core';

import Map from 'ol/Map';

@Component({
  selector: 'app-time-legend',
  templateUrl: './../../../shared/modules/timeline/time-line/time-line.component.html',
  styleUrls: [
    './time-legend.component.scss',
    './../../../shared/modules/timeline/time-line/time-line.component.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class TimeLegendComponent extends TimeLineComponent implements OnInit, OnChanges  {
  @Input() timelineDataViz!: any;

  map!: Map;

  mapSubscription!: Subscription;

  constructor(
    private mapService: MapService
   ) {
    super();

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );

  }

  ngOnInit(): void {
    super.ngOnInit();

    this.mapService.getMap();
  }


  ngOnChanges(changes: SimpleChanges) {
    super.ngOnChanges(changes);

    if (changes.timelineDataViz) {
      const circleEvents = d3.select('.circle-events')
      circleEvents.selectAll('circle').data(this.timelineDataViz).enter()
      .append('circle')
        .attr('class', (d: any) => {
          const featureDate = new Date(d.properties.start_date);
          if (featureDate <= this.currentDate) {
            return 'pointer svg-color-' + d.properties.type;
          } else {
            return 'trace'
          }
        })
      .attr('r', "4")
      .attr('cx', (d: any) => {
        const startDate = new Date(d.properties.start_date);
        return this.dateRange(startDate);
      })
      .on('mouseover', (e: any, d: any) => {

        this.interactionWithEventNode(e.currentTarget, d);
        // to link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('display', 'block')
          .style('right', '1em')
          .style('top', '5em');

        const feature = getFeatureFromLayer(this.map, activityLayerName, d.properties.id, 'id')
        feature.setStyle(activitySelectedStyle(feature.get('radius')))

      })
      .on('mouseout', (e: any, d: any) => {

        this.interactionWithEventNode(e.currentTarget, d);
        // link with popup
        d3.select('#popup-feature-' + d.properties.id)
          .style('display', 'none')
          .style('right', 'unset')
          .style('top', 'unset');

        const feature = getFeatureFromLayer(this.map, activityLayerName, d.properties.id, 'id')
        feature.setStyle(activitiesStyle(feature))

      });
      ;

    }

    if (changes.currentDate) {
      d3.selectAll('.circle-events circle')
      .attr('class', (d: any) => {
        const featureDate = new Date(d.properties.start_date);
        if (featureDate <= this.currentDate) {
          return 'pointer svg-color-' + d.properties.type;
        } else {
          return 'trace'
        }
      })
    }

  }

  interactionWithEventNode(svgObject: any, data: any): void {

    const currentElement: any = d3.select(svgObject);
    currentElement.classed('selected', !currentElement.classed('selected')); // toggle class

    const legendElement: any = d3.select("#" + legendActivitiesId + " circle." + data.properties.type);
    legendElement.classed('selected', !legendElement.classed('selected'));
    //TODO select circle
  }


}
