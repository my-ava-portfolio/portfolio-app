import { Component, OnInit } from '@angular/core';

import { educationColor, jobColor, legendActivitiesId, sliderBarId, strokeColor, travelMovingNodeColor, travelNodeStrokeColor, volunteerColor } from '@modules/map-activities/shared/core';


@Component({
  selector: 'app-theme-legend',
  templateUrl: './theme-legend.component.html',
  styleUrls: ['./theme-legend.component.scss']
})
export class ThemeLegendComponent implements OnInit {

  sliderBarId = sliderBarId;
  legendActivitiesId = legendActivitiesId;

  widthLegendElement = 200;
  heightLegendElement = 140;
  heightMoveLegendElement = 60;

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
      { cy: 25, class: 'education', label: 'Formations', color: educationColor, strokeColor: strokeColor },
      { cy: 70, class: 'job', label: 'Entreprises', color: jobColor, strokeColor: strokeColor },
      { cy: 115, class: 'volunteer', label: 'Bénévolat', color: volunteerColor, strokeColor: strokeColor },
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
        label: 'Train',
        circleColor: travelMovingNodeColor,
        strokeColor: travelNodeStrokeColor
      },
    ]
  };

  constructor() { }

  ngOnInit(): void {

  }

}
