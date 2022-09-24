import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';
import { currentYear } from '@core/misc';

import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faGlobe, faFilePdf } from '@fortawesome/free-solid-svg-icons';

import { ControlerService } from '@services/controler.service';
import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('content') PageContent!: ElementRef;
  @ViewChild('legacyResume') legacyResume: any;

  currentDate: number = currentYear;

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
  contactData: any;

  // resume left sidebar
  degreesData: any;
  languagesData: any;
  trainingsData: any;

  // resume center bar
  summaryData!: any; // TODO SHORT VERSION
  publicationsData!: any;

  // resume center bar
  skillsData: any;
  generalData: any;
  jobsData!: any;
  personalProjectsData!: any;

  dataAvailable = false;
  isPrinting = false;

  generalDataSubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private controlerService: ControlerService,
  ) {

    this.generalDataSubscription = this.resumeService.resumeData.subscribe(
      (data) => {
        this.contactData = data.contact;
        this.degreesData = data.education;
        this.generalData = data.general;
        this.languagesData = data.languages;
        this.profilData = data.profil;
        this.trainingsData = data.trainings;
        this.summaryData = data.profil.carrier_summary;
        this.publicationsData = data.publications;

        this.dataAvailable = true;
      }
    );

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.activities_data.jobs;
        console.log(data)

        this.personalProjectsData = data.activities_data["personal-projects"].reverse();
        this.skillsData = data.skills_data;
      }
    );



   }

  ngOnInit(): void {
    this.sendResumeSubMenus()
    this.resumeService.pullResumeGeneralData();
    this.resumeService.pullActivitiesResumeFromGraph(
      this.currentDate,
      true,
      true,
      true,
      null
    );
  }

  ngAfterViewInit(): void {
    // this.adjustZoom();
  }


  ngOnDestroy(): void {
    this.generalDataSubscription.unsubscribe();
    this.activitiesFilteredSubscription.unsubscribe();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);

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
