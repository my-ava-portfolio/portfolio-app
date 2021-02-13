import { Component, OnInit, OnDestroy  } from '@angular/core';

import { ResumeService } from '../../services/resume.service';
import { apiLogoUrl } from '../../core/inputs';

import { Subscription } from 'rxjs';

import { githubIcon, linkedinIcon, emailIcon, phoneIcon, websiteIcon } from '../../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-short-view',
  templateUrl: './short-view.component.html',
  styleUrls: ['./short-view.component.css']
})
export class ShortViewComponent implements OnInit, OnDestroy {
  currentDate: number = new Date().getFullYear();

  // icons
  githubIcon = githubIcon;
  linkedinIcon = linkedinIcon;
  emailIcon = emailIcon;
  phoneIcon = phoneIcon;
  websiteIcon = websiteIcon;

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
  jobsData!: any;
  personalProjectsData!: any;

  isDataAvailable = false;

  resumeDataSubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;
  skillsDataSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
    ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

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

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        this.personalProjectsData = data.personal_projects;
      },
      (error) => {
        console.log('error');
      }
    );

    this.skillsDataSubscription = this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.skillsData = data;
        console.log(data);
      },
      (error) => {
        console.log('error');

      }
    );

   }

  ngOnInit(): void {
    this.resumeService.pullResumeGeneralData();
    this.resumeService.pullActivitiesResumeFromGraph(
      this.currentDate,
      null
    );
    this.resumeService.pullSkillsResumeFromGraph(
      this.currentDate,
      true,
      true,
      true,
      null
    );
  }

  ngOnDestroy(): void {
    console.log('lalala resume content');
    this.resumeDataSubscription.unsubscribe();
    this.activitiesFilteredSubscription.unsubscribe();
    this.skillsDataSubscription.unsubscribe();
  }


  reverse(value: string): string {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    return output;
  }

}
