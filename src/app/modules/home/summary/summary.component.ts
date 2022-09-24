import { Component, OnDestroy, OnInit } from '@angular/core';
import { projectPages, resumeTopicsPages } from '@core/global-values/topics';


@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit, OnDestroy {

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;


  constructor( ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}

