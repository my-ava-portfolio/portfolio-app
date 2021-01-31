import { Component, OnInit } from '@angular/core';

import { faGlobeEurope, faMapMarkerAlt, faImages, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-centerbar-jobs',
  templateUrl: './centerbar-jobs.component.html',
  styleUrls: ['./centerbar-jobs.component.css']
})
export class CenterbarJobsComponent implements OnInit {
  jobsData!: any;

  apiImgUrl = apiImgUrl;

  // icons
  faMapMarkerAlt = faMapMarkerAlt;
  faGlobeEurope = faGlobeEurope;
  faImages = faImages;
  faArrowAltCircleUp = faArrowAltCircleUp;

  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.activitiesFilteredData.subscribe(
      (data) => {
        this.jobsData = data.jobs;
        // this.personalProjectsData = data.personnal_projects
        console.log(this.jobsData)

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

}
