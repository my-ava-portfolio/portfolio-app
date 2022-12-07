import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { activitiesMapping } from '@core/global-values/main';
import { activitiesCountOutput } from '@core/global-values/route-output-types';
import { ResumeService } from '@services/resume.service';
import { tickStep } from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivityActionsService } from '../services/activity-actions.service';
import { activities } from '../../../core/data-types';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  activitiesMapping: any = activitiesMapping;

  userInfoData!: any;
  jobDuration!: any;
  
  jobCategory: string = "job";

  activityTypesMetadata: activitiesCountOutput[] = []
  tabView: string = this.jobCategory;

  userInfoDataSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activityActionsService: ActivityActionsService
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.userInfoData = data;
      }
    );

    this.activityEnablingSubscription = this.activityActionsService.activityId.subscribe(
      (activityId) => {
        this.tabView = activityId
      }
    )

    this.resumeService.activitiesJobDurationDataSubject.subscribe(
      (data: any) => {
        this.jobDuration = data
      }
    )

    this.resumeService.activitiesCountDataSubject.subscribe(
      (data: activitiesCountOutput[]) => {
        this.activityTypesMetadata = data.filter((feature: any) => {
          return feature.type !== 'education';
        });
        console.log(data)
      }
    )

  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi()
  }

  ngOnDestroy(): void {
    this.activityEnablingSubscription.unsubscribe()
  }

  enableActivity(idName: string): void {
    this.activityActionsService.setActivity(idName)
    this.tabView = idName
  }

}
