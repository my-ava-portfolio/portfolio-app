import { Component, OnInit, OnDestroy, AfterViewInit  } from '@angular/core';

import { ResumeService } from '../../services/resume.service';
import { NotesService } from '../../services/notes.service';
import { apiLogoUrl } from '../../core/inputs';

import { interval, Subscription } from 'rxjs';
import { startWith  } from 'rxjs/operators';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.scss']
})
export class ResumeViewComponent implements OnInit, OnDestroy, AfterViewInit  {
  fragment!: string | null;
  apiImgUrl = apiLogoUrl;

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
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.resumeDataSubscription = this.resumeService.resumeData.subscribe(
      (data) => {
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

  sendPathNotesLink(notePath: string): void {
    this.notesService.pullNotesData(notePath);
  }

}
