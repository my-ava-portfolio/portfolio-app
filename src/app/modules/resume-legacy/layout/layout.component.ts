import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { assetsLogoPath, skillsMapping } from '@core/global-values/main';

import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faGlobe, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {
  @ViewChild('content') PageContent!: ElementRef;
  @ViewChild('legacyResume') legacyResume: any;

  skillsCategories = skillsMapping;

  // icons
  githubIcon = faGithub;
  linkedinIcon = faLinkedinIn;
  emailIcon = faEnvelope;
  phoneIcon = faPhone;
  websiteIcon = faGlobe;
  pdfFileIcon = faFilePdf;

  apiImgUrl = assetsLogoPath;

  // resume top bar
  profilData: any;
  jobDuration: any;
  contactData: any;

  // resume left sidebar
  degreesData: any;
  languagesData: any;
  trainingsData: any;

  // resume center bar
  publicationsData: any[] = [];

  // resume center bar
  skillsData: any;
  jobsData!: any;
  personalProjectsData!: any;

  isPrinting = false;

  userContactDataSubscription!: Subscription;
  userInfoDataSubscription!: Subscription;
  activitiesJobDurationSubscription!: Subscription;
  activitiesDataSubscription!: Subscription;
  trainingsDataSubscription!: Subscription;
  languagesDataSubscription!: Subscription;
  publicationsDataSubscription!: Subscription;
  skillsSubscription!: Subscription;

  constructor(
    private cdRef: ChangeDetectorRef,
    private resumeService: ResumeService,
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.profilData = data;
      }
    );

    this.activitiesJobDurationSubscription = this.resumeService.activitiesJobDurationDataSubject.subscribe(
      (data: any) => {
        this.jobDuration = data
      }
    )

    this.userContactDataSubscription = this.resumeService.userContactDataSubject.subscribe(
      (data: any) => {
        this.contactData = data;
      }
    );

    this.activitiesDataSubscription = this.resumeService.activitiesDataSubject.subscribe(
      (data: any) => {
        if (data[0].type === "education") {
          this.degreesData = data;
        }
        if (data[0].type === "job") {
          this.jobsData = data;
        }
        if (data[0].type === "personal-project") {
          this.personalProjectsData = data;
        }
      }
    );

    this.trainingsDataSubscription = this.resumeService.trainingsDataSubject.subscribe(
      (data: any) => {
        this.trainingsData = data;
      }
    );

    this.languagesDataSubscription = this.resumeService.languagesDataSubject.subscribe(
      (data) => {
        this.languagesData = data;
      }
    );

    this.publicationsDataSubscription = this.resumeService.publicationsDataSubject.subscribe(
      (data: any) => {
        this.publicationsData = this.publicationsData.concat(data);
      }
    );

    this.skillsSubscription = this.resumeService.skillsDataSubject.subscribe(
      (data: any) => {
          this.skillsData = data
      }
    )

   }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryUserContactFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi();
    this.resumeService.queryActivitiesFromApi("education");
    this.resumeService.queryActivitiesFromApi("job");
    this.resumeService.queryActivitiesFromApi("personal-project");
    this.resumeService.queryTrainingsFromApi();
    this.resumeService.queryLanguagesFromApi();
    this.resumeService.queryPublicationsFromApi("education")
    this.resumeService.queryPublicationsFromApi("job")
    this.resumeService.queryFullSkillsFromApi({category: ["themes", "technics", 'tools']})
  }

  ngOnDestroy(): void {
    this.userContactDataSubscription.unsubscribe();
    this.userInfoDataSubscription.unsubscribe();
    this.activitiesJobDurationSubscription.unsubscribe();
    this.activitiesDataSubscription.unsubscribe();
    this.trainingsDataSubscription.unsubscribe();
    this.languagesDataSubscription.unsubscribe();
    this.publicationsDataSubscription.unsubscribe();
    this.skillsSubscription.unsubscribe();
  }


  reverse(value: string): string {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    return output;
  }

  printDiv(divId: string): void {
    this.isPrinting = true;
    this.cdRef.detectChanges()
    let printContents = document.getElementById(divId)
    if (printContents?.innerHTML ) {
      document.body.innerHTML = printContents?.innerHTML;
      window.print();
      this.isPrinting = false;
      window.location.reload();
    }

  }

  forceArrayType(input: any): string[] {
    return input
  }

}
