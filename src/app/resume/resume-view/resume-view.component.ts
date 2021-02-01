import { Component, OnInit, ViewEncapsulation  } from '@angular/core';

import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '../../services/resume.service';
import { apiImgUrl } from '../../core/inputs';


@Component({
  selector: 'app-resume-view',
  templateUrl: './resume-view.component.html',
  styleUrls: ['./resume-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ResumeViewComponent implements OnInit {

  apiImgUrl = apiImgUrl;

  // icons
  faGlobeEurope = faGlobeEurope;

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

  isDataAvailable = false


  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.resumeData.subscribe(
      (data) => {
        console.log(data)
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
    this.resumeService.pullResumeGeneralData();
  }

}
