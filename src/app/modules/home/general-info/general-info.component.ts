import { Component, OnInit } from '@angular/core';
import { imageProfile } from '@core/global-values/main';
import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {
  
  userInfoData!: any;
  jobDuration!: any;

  imageProfile: string = imageProfile;

  userInfoDataSubscription!: Subscription;
  activitiesJobDurationSubscription!: Subscription;

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

  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryActivitiesJobDurationFromApi()
  }

  ngOnDestroy(): void {
    this.userInfoDataSubscription.unsubscribe();
    this.activitiesJobDurationSubscription.unsubscribe();
  }
}
