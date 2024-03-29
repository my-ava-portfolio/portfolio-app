import { Component } from '@angular/core';
import { blogPages, resumeTopicsPages, techStackPages } from '@core/globals/topics_skeleton';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  portfolioPages: any[] = [...resumeTopicsPages, ...blogPages, ...techStackPages];

  constructor( ) { }

}

