import { Component, OnInit, OnDestroy } from '@angular/core';

import { faGlobeEurope, faMapMarkerAlt, faImages, faArrowAltCircleUp, faBookOpen, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';


import { Subscription } from 'rxjs';



@Component({
  selector: 'app-centerbar-projects',
  templateUrl: './centerbar-projects.component.html',
  styleUrls: ['./centerbar-projects.component.css']
})
export class CenterbarProjectsComponent implements OnInit, OnDestroy {
  personalProjectsData!: any;

  apiImgUrl = apiImgUrl;

  // icons
  faMapMarkerAlt = faMapMarkerAlt;
  faGlobeEurope = faGlobeEurope;
  faImages = faImages;
  faArrowAltCircleUp = faArrowAltCircleUp;
  faGithub = faGithub;
  faBookOpen = faBookOpen;
  faGlobe = faGlobe;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService
  ) {

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {

        this.personalProjectsData = data.personal_projects
        console.log(this.personalProjectsData)

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('lalala projects')
    this.activitiesFilteredSubscription.unsubscribe();
  }

}
