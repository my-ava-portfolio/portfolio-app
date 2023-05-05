import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { locationIcon, degreeIcon, languageIcon } from '@core/globals/icons';
import { assetsLogoPath } from '@core/globals/resume-shared-data';
import { mapActivitiesPages } from '@core/globals/topics_skeleton';

import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-degrees-bar',
  templateUrl: './degrees-bar.component.html',
  styleUrls: ['./degrees-bar.component.scss'],
})
export class DegreesBarComponent implements OnInit, OnDestroy {
  @Input() activityType: any;

  mapPages: any = mapActivitiesPages;

  assetsLogoPath = assetsLogoPath;

  activityData: any;

  // icons
  locationIcon = locationIcon;
  degreeIcon = degreeIcon;
  languageIcon = languageIcon;

  activitiesDataSubscription!: Subscription

  constructor(
    private resumeService: ResumeService,
  ) {

    this.activitiesDataSubscription = this.resumeService.activitiesDataSubject.subscribe(
      (data: any) => {
        this.activityData = data;
      }
    );
  }

  ngOnInit(): void {
    this.resumeService.queryActivitiesFromApi(this.activityType)
  }

  ngOnDestroy(): void {
    this.activitiesDataSubscription.unsubscribe();
  }

  getTitle(data: any): string {
    return (new Date(data.start_date)).getFullYear() + ' - ' +
     (new Date(data.end_date)).getFullYear();
  }

}
