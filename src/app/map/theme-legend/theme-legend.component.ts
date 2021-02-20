import { Component, OnInit } from '@angular/core';
import { trainIconUnicode, tagIcon } from '../../core/inputs';


@Component({
  selector: 'app-theme-legend',
  templateUrl: './theme-legend.component.html',
  styleUrls: ['./theme-legend.component.css']
})
export class ThemeLegendComponent implements OnInit {

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

}
