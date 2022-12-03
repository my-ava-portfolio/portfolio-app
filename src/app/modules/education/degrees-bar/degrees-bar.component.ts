import { Component, OnInit, Input } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';
import { mapActivitiesPages } from '@core/global-values/topics';

import { faUserGraduate, faLanguage, faAddressBook, faExpand, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit {

  activityType = "education"
  isImageValid = true;

  mapPages: any = mapActivitiesPages;

  assetsLogoPath = assetsLogoPath;

  activityData: any;

  // icons
  locationIcon = faMapMarkerAlt;
  degreeIcon = faUserGraduate;
  languageIcon = faLanguage;
  presIcon = faAddressBook;
  expandIcon = faExpand;

  activitiesDataSubscription!: Subscription

  constructor(
    private resumeService: ResumeService,
  ) {

    this.activitiesDataSubscription = this.resumeService.activitiesDataSubject.subscribe(
      (data: any) => {
        this.activityData = data;
        console.log(data)
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.queryActivitiesFromApi(this.activityType)
  }

  getTitle(data: any): string {
    return (new Date(data.start_date)).getFullYear() + ' - ' +
     (new Date(data.end_date)).getFullYear();
  }

}
