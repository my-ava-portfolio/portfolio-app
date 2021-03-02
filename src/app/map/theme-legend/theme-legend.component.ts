import { Component, OnInit, AfterViewInit } from '@angular/core';

import { trainIconUnicode, tagIcon } from '../../core/inputs';
import { svgActivitiesPointsLayerId, svgTripIdPrefix, legendActivities, sliderBarId } from '../../core/inputs';


import * as d3 from 'd3';


@Component({
  selector: 'app-theme-legend',
  templateUrl: './theme-legend.component.html',
  styleUrls: ['./theme-legend.component.scss']
})
export class ThemeLegendComponent implements OnInit, AfterViewInit {
  svgActivitiesPointsLayerId = svgActivitiesPointsLayerId;
  svgTripIdPrefix = svgTripIdPrefix;
  legendActivities = legendActivities;
  sliderBarId = sliderBarId;

  widthLegendElement = 250;
  heightLegendElement = 90;
  heightMoveLegendElement = 60;

  tagIcon = tagIcon;

  fontSize = '19px';
  // activity month legend data
  activityMonthLegendData: any = {
    circleMonthR: [40, 20, 10],
    circleCxPos: 50,
    textXPos: 120
  };

  // activity types legend data
  activityTypesLegendData: any = {
    circleR: 18,
    circleCxPos: 20,
    textXPos: 50,
    circleJobs: [
      { cy: 25, class: 'jobs', label: 'Expériences' },
      { cy: 70, class: 'education', label: 'Formations' }
    ]
  };

  // moves legend data
  movesLineLegendData: any = {
    textXPos: 50,
    markerFontSize: '12px',
    moves: [
      { x1: 0, x2: 45, y1: 0, y2: 45 , r: 12,
        classLine: 'train-line',
        classMarker: 'train-marker',
        classMarkerText: 'train-marker-text',
        markerIcon: trainIconUnicode,
        label: 'Train (pendulaire)'
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.interactWithActivitiesLegend()
    this.interactWithMovesLegend()
  }

  interactWithActivitiesLegend(): void {
    d3.selectAll('#' + this.legendActivities + ' circle')
      .style('cursor', 'pointer')
      .on('click', (e: any, d: any) => {
        const currentElement = d3.select(e.currentTarget)
        currentElement.classed('disabled', !currentElement.classed('disabled')); // toggle class

        const currentElementTypes = this.activityTypesLegendData.circleJobs.filter(
          (element: any) => currentElement.classed(element.class)
        );

        if (currentElementTypes.length === 1) {
          // TODO svg id to constants!
          const currentActivitiesMapCircles = d3.selectAll('#' + this.svgActivitiesPointsLayerId + ' .' + currentElementTypes[0].class)
          currentActivitiesMapCircles.classed('invisible', !currentActivitiesMapCircles.classed('invisible')); // toggle class

          const currentSliderMarkersOnTimeline = d3.selectAll('#' + this.sliderBarId + ' .' + currentElementTypes[0].class)
          currentSliderMarkersOnTimeline.classed('invisible', !currentSliderMarkersOnTimeline.classed('invisible')); // toggle class

        } else {
          console.log('error')
        }
      });
  }

  interactWithMovesLegend(): void {
    this.movesLineLegendData.moves.forEach((element: any) => {
      d3.selectAll('.' + element.classMarker)
      .style('cursor', 'pointer')
      .on('click', (e: any, d: any) => {
        const currentElement = d3.select(e.currentTarget)
        currentElement.classed('disabled', !currentElement.classed('disabled')); // toggle class

        const currentMovesMapLines = d3.selectAll('[id^=' + this.svgTripIdPrefix + ']')
        currentMovesMapLines.classed('invisible', !currentMovesMapLines.classed('invisible')); // toggle class

      })
    });

  }

}
