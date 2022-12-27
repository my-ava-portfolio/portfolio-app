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

  jobCategory: string = "job";

  activityTypesMetadata: activitiesCountOutputTypes[] = []

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

        this.activityTypesMetadata = [
          {
            type: "job",
            count: data["job"].length
          },
          {
            type: "personal-project",
            count: data["personal-project"].length
          },
          {
            type: "volunteer",
            count: data["volunteer"].length
          }
        ]
        
        // To handle the activity switching
        let availableActivities = this.activityTypesMetadata.filter((feature: any) => {
          return feature.count > 0 && this.tabView === feature.type
        })
        if (availableActivities.length === 0) {
          // the current tab is not the right one, select the tabs where there are activities
          let availableActivities = this.activityTypesMetadata.filter((feature: any) => {
            return feature.count > 0
          })
          if (availableActivities.length > 0) {
            // set the first tabView where we got activities ; the current tab is not the right one
            this.enableActivity(availableActivities[0].type)
          } else {
            // 0 activities found (out of data scope)
            this.enableActivity("null")
          }

        } else if (availableActivities.length === 1) {
          // current tabView is the right one
          this.enableActivity(availableActivities[0].type)

        } else {
          // 0 activities found (out of data scope)
          this.enableActivity("null")
        }
               
      }
    )

  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi()
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
