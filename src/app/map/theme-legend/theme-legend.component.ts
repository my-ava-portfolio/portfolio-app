import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theme-legend',
  templateUrl: './theme-legend.component.html',
  styleUrls: ['./theme-legend.component.css']
})
export class ThemeLegendComponent implements OnInit {
  widthLegendElement = 200;
  heightLegendElement = 100;

  // activity month legend data
  activityMonthLegendData: any = {
    circleMonthR: [40, 20, 10],
    circleCxPos: 50,
    textXPos: 120
  };

  // activity typs legend data
  activityTypesLegendData: any = {
    circleR: 18,
    circleCxPos: 20,
    textXPos: 50,
    circleJobs: [
      { cy: 25, class: 'jobs', label: 'Expériences' },
      { cy: 70, class: 'education', label: 'Formations' }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

}
