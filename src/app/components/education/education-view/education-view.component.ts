import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';

import { ResumeService } from '@services/resume.service';
import { NotesService } from '@services/notes.service';
import { ControlerService } from '@services/controler.service';

import { apiLogoUrl } from '@shared/inputs';
import { educationPages } from '@shared/inputs';

import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-education-view',
  templateUrl: './education-view.component.html',
  styleUrls: ['./education-view.component.scss']
})
export class EducationViewComponent implements OnInit {
  fragment!: string | null;
  apiImgUrl = apiLogoUrl;


  activityIdFromActivityComponents!: string;

  // resume top bar
  profilData: any;
  contactData: any;

  // resume left sidebar
  degreesData: any;
  languagesData: any;
  trainingsData: any;

  // resume center bar
  generalData: any;

  isDataAvailable = false;

  educationTopics: any[] = educationPages;

  isAnchorExistsChecker = interval(1000); // observable which run all the time
  isAnchorExistsCheckerSubscription!: Subscription;

  resumeDataSubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.resumeDataSubscription = this.resumeService.resumeData.subscribe(
      (data) => {
        this.contactData = data.contact;
        this.degreesData = data.education;
        // this.generalData = data.general;
        this.languagesData = data.languages;
        this.profilData = data.profil;
        this.trainingsData = data.trainings;
        // this.summaryData = data.profil.carrier_summary;
        // this.qualitiesData = data.profil.qualities;
        // this.publicationsData = data.research_work;

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
    this.sendResumeSubMenus()
  }

  ngAfterViewInit(): void {
    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment === undefined) {
          this.fragment = null;
        } else {
          this.fragment = fragment;
        }

        if (this.fragment !== null) {
          this.checkAndScrollToAnchorIfNeeded();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.resumeDataSubscription.unsubscribe();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.educationTopics)
  }

  checkAndScrollToAnchorIfNeeded(): void {

    this.isAnchorExistsCheckerSubscription = this.isAnchorExistsChecker.pipe(startWith(0)).subscribe(() => {
      try {
        if (this.fragment !== null) {
          const element: any = window.document.getElementById(this.fragment);
          element.scrollIntoView();
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
