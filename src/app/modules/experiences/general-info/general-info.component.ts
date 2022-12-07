import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ResumeService } from '@services/resume.service';
import { tickStep } from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivityActionsService } from '../services/activity-actions.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  userInfoData: any;
  jobDuration!: any;
  
  jobCategory = "job";

  activityTypesMetadata: any[] = []
  tabView = this.jobCategory;

  userInfoDataSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
    private activityActionsService: ActivityActionsService
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data: any) => {
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
      (data: any) => {
        this.activityTypesMetadata = data
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
