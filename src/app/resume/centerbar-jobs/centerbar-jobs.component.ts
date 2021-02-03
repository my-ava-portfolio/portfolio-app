import { Component, OnInit, OnDestroy } from '@angular/core';

import { faGlobeEurope, faMapMarkerAlt, faImages, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';



@Component({
  selector: 'app-centerbar-jobs',
  templateUrl: './centerbar-jobs.component.html',
  styleUrls: ['./centerbar-jobs.component.css']
})
export class CenterbarJobsComponent implements OnInit, OnDestroy {
  jobsData!: any;

  apiImgUrl = apiImgUrl;

  // icons
  faMapMarkerAlt = faMapMarkerAlt;
  faGlobeEurope = faGlobeEurope;
  faImages = faImages;
  faArrowAltCircleUp = faArrowAltCircleUp;


  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService
  ) {

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        // this.personalProjectsData = data.personnal_projects
        console.log(this.jobsData);

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('lalala jobs')
    this.activitiesFilteredSubscription.unsubscribe();
  }

}
