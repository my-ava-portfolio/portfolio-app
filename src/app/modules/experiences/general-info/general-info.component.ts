import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { activitiesMapping } from '@core/global-values/main';
import { activitiesCountOutputTypes } from '@core/global-values/route-output-types';
import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {
  @Output() tabViewEmit = new EventEmitter<string>();

  @Input() tabView!: string;

  activitiesMapping: any = activitiesMapping;

  userInfoData!: any;
  jobDuration!: any;

  activityTypesMetadata: activitiesCountOutputTypes[] = [
    { type: "job", count: 0 },
    { type: "personal-project", count: 0 },
    { type: "volunteer", count: 0 }
  ]

  userInfoDataSubscription!: Subscription;
  activitiesJobDurationSubscription!: Subscription;
  professionalActivitiesSubscription!: Subscription;
  activitiesIdSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.userInfoData = data;
      }
    );

    this.activitiesJobDurationSubscription = this.resumeService.activitiesJobDurationDataSubject.subscribe(
      (data: any) => {
        this.jobDuration = data
      }
    )

    this.professionalActivitiesSubscription = this.resumeService.profesionalActivitiesDataSubject.subscribe(
      (data: any) => {
        let activityIdsPossible: string[] = []
        this.activityTypesMetadata.forEach((_: any, index: number) => {
          const count = data[this.activityTypesMetadata[index].type].length
          const activityType = this.activityTypesMetadata[index].type

          this.activityTypesMetadata[index].count = data[activityType].length
          if (count > 0) {
            activityIdsPossible.push(activityType)
          }
        })

        let tabToSwitch: string = 'null';

        if (activityIdsPossible.length === 1) {
          tabToSwitch = activityIdsPossible[0]

        } else if (activityIdsPossible.length > 1) {
          const activityIdsPossibleFiltered = activityIdsPossible.filter((feature: string) => {
            return this.tabView === feature
          })
          if (activityIdsPossibleFiltered.length > 0) {
            tabToSwitch = activityIdsPossibleFiltered[0]
          } else {
            tabToSwitch = activityIdsPossible[0]
          }

        } 
        this.enableActivity(tabToSwitch)
      }
    )
    
  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi();
  }

  ngOnDestroy(): void {
    this.userInfoDataSubscription.unsubscribe();
    this.activitiesJobDurationSubscription.unsubscribe();
    this.professionalActivitiesSubscription.unsubscribe();
  }

  enableActivity(tabName: string): void {
    this.tabViewEmit.emit(tabName)
  }

}
