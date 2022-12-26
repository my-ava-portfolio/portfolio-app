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
  @Input() tabView!: string;
  @Output() tabViewEmit = new EventEmitter<string>();

  activitiesMapping: any = activitiesMapping;

  userInfoData!: any;
  jobDuration!: any;

  jobCategory: string = "job";
  activityCategoryHidden = "education"

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
    // this.activitiesIdSubscription.unsubscribe();
  }

  enableActivity(idName: string): void {
    this.tabViewEmit.emit(idName)
  }

}
