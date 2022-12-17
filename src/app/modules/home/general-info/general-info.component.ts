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
  imageProfile: string = imageProfile;

  userInfoDataSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.userInfoData = data;
      }
    );

  }

  ngOnInit(): void {
    //TODO add job duration; check html comment
    this.resumeService.queryUserInfoFromApi();
  }

  ngOnDestroy(): void {
    this.userInfoDataSubscription.unsubscribe();
  }
}
