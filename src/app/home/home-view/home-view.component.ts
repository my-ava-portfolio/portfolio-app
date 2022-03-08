import { Component, OnInit, OnDestroy } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit, OnDestroy {

  generalData!: any;
  generalDataSubscription!: Subscription;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private resumeService: ResumeService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      },
      (error) => {
        console.log('error');
      }
    );



   }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
  }

  ngOnDestroy(): void {
    this.generalDataSubscription.unsubscribe()

  }

}
