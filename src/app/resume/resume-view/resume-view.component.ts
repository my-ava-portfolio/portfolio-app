import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit  } from '@angular/core';

import { ResumeService } from '../../services/resume.service';
import { apiImgUrl } from '../../core/inputs';

import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeViewComponent implements OnInit, OnDestroy, AfterViewInit  {
  fragment!: string | null;
  apiImgUrl = apiImgUrl;

  // resume top bar
  profilData: any;
  contactData: any;

  // resume left sidebar
  degreesData: any;
  languagesData: any;
  trainingsData: any;

  // resume center bar
  summaryData!: any;
  publicationsData!: any;

  // resume center bar
  skillsData: any;
  generalData: any;

  isDataAvailable = false;

  resumeDataSubscription!: Subscription;

  isAnchorExistsChecker = interval(500); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,

  ) {

    this.resumeDataSubscription = this.resumeService.resumeData.subscribe(
      (data) => {
        console.log(data);
        this.contactData = data.contact;
        this.degreesData = data.education;
        this.generalData = data.general;
        this.languagesData = data.languages;
        this.profilData = data.profil;
        this.trainingsData = data.trainings;
        this.summaryData = data.carrier_summary;
        this.publicationsData = data.research_work;

        this.isDataAvailable = true;
      },
      (error) => {
        console.log('error');
      }
    );

   }

  ngOnInit(): void {
    // this.fragment = null
    this.resumeService.pullResumeGeneralData();
  }

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        console.log('ralala', fragment);
        if (fragment === undefined) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
        }

        console.log('ralala2', this.fragment);

        if (this.fragment !== null) {
          console.log('ralala3', this.fragment);
          this.checkAndScrollToAnchorIfNeeded();
        }
      }
    );
  }

  ngOnDestroy(): void {
    console.log('lalala resume content');
    this.resumeDataSubscription.unsubscribe();
  }


  checkAndScrollToAnchorIfNeeded(): void {

    this.isAnchorExistsCheckerSubscription = this.isAnchorExistsChecker.pipe(startWith(0)).subscribe(() => {
      try {
        console.log(this.fragment);
        if (this.fragment !== null) {
          const element: any = window.document.getElementById(this.fragment);
          element.scrollIntoView();
          console.log('bravo');
        } else {
          console.log('no anchor defined');
        }
        this.isAnchorExistsCheckerSubscription.unsubscribe();
      } catch (e) {
        console.log('anchor not found yet');
      }
    });
  }

}
