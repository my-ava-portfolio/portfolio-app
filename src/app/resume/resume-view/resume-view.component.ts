import { Component, OnInit } from '@angular/core';

import { faUserGraduate, faMapMarkerAlt, faLanguage, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '../../services/resume.service';
import { apiBaseUrl } from '../../core/inputs';


@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css']
})
export class ResumeViewComponent implements OnInit {

  apiImgUrl = `${apiBaseUrl}/images/logo/`;

  // icons
  faUserGraduate = faUserGraduate;
  faMapMarkerAlt = faMapMarkerAlt;
  faLanguage = faLanguage;
  faGlobeEurope = faGlobeEurope;

  // resume top bar
  profilData: any;
  contactData: any;

  // resume left sidebar
  degreesData: any;
  languagesData: any;
  trainingsData: any;

  // resume center bar
  summaryData: any;

  // resume center bar
  jobsData: any = [];
  personalProjectsData: any = [];
  skillsData: any;
  generalData: any;

  isDataAvailable = false


  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.resumeData.subscribe(
      (data) => {
        this.contactData = data.contact;
        this.degreesData = data.education;
        this.generalData = data.general;
        this.languagesData = data.languages;
        this.profilData = data.profil;
        this.trainingsData = data.trainings;
        this.summaryData = data.carrier_summary;

        this.isDataAvailable = true;
      },
      (error) => {
        console.log('error');
      }
    );

    this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.skillsData = data;
        console.log(this.skillsData)
      },
      (error) => {
        console.log('error');
      }
    );

    this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        this.personalProjectsData = data.personnal_projects
        console.log(data)

      },
      (error) => {
        console.log('error');
      }
    );


   }

  ngOnInit(): void {
    this.resumeService.pullResumeGeneralData();
  }

}
