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
  objectSelected!: string;

  jobCategory: string = "job";
  activityCategoryHidden = "education"

  activityTypesMetadata: activitiesCountOutput[] = []
  tabView: string = this.jobCategory;

  userInfoDataSubscription!: Subscription;
  activityEnablingSubscription!: Subscription;
  activitiesJobDurationSubscription!: Subscription;
  activitiesCountSubscription!: Subscription;
  professionalActivitiesSubscription!: Subscription;

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

    this.activitiesJobDurationSubscription = this.resumeService.activitiesJobDurationDataSubject.subscribe(
      (data: any) => {
        this.jobDuration = data
      }
    )

    // this.activitiesCountSubscription = this.resumeService.activitiesCountDataSubject.subscribe(
    //   (data: activitiesCountOutput[]) => {
    //     let activityTypesMetadata = data.filter((feature: any) => {
    //       return feature.type !== this.activityCategoryHidden;
    //     });
    //     this.activityTypesMetadata = activityTypesMetadata.sort((a, b) => (a.type < b.type ? -1 : 1))
    //   }
    // )

    this.professionalActivitiesSubscription = this.resumeService.profesionalActivitiesDataSubject.subscribe(
      (data: any) => {

        this.activityTypesMetadata = [
          {
            type: "job",
            count: data[0].length
          },
          {
            type: "personal-project",
            count: data[1].length
          },
          {
            type: "volunteer",
            count: data[2].length
          }
        ]
      }
    )

    this.activityActionsService.activityParameters.subscribe(
      (data: any) => {
        console.log(data)
        // this.objectSelected = data.object
        this.resumeService.queryProfesionalActivitiesFromApi(data.parameters, data.activityTypes)
      }
    )

  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi()
  }

  ngOnDestroy(): void {
    this.userInfoDataSubscription.unsubscribe();
    this.activityEnablingSubscription.unsubscribe();
    this.activitiesJobDurationSubscription.unsubscribe();
    // this.activitiesCountSubscription.unsubscribe();
    this.professionalActivitiesSubscription.unsubscribe();
  }

  enableActivity(idName: string): void {
    this.activityActionsService.setActivity(idName)
    this.tabView = idName
  }

}
