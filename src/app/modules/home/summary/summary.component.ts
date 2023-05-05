import { Component } from '@angular/core';
import { projectPages, resumeTopicsPages } from '@core/globals/topics_skeleton';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent {

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;

  constructor( ) { }

}

