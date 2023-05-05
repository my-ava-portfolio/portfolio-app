import { Component, OnInit, OnDestroy } from '@angular/core';
import { assetsLogoPath } from '@core/globals/resume-shared-data';
import { mapActivitiesPages } from '@core/globals/topics_skeleton';

import { ResumeService } from '@services/resume.service';
import { backgroundTitle, specializationTitle } from '../core';
import { Subscription } from 'rxjs/internal/Subscription';
import { languageIcon } from '@core/globals/icons';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  mapPages: any = mapActivitiesPages;

  // TODO add them on API
  backgroundTitle = backgroundTitle;
  specializationTitle = specializationTitle;

  assetsLogoPath = assetsLogoPath;

  languagesData: any;
  userInfoData: any;

  // icons
  languageIcon = languageIcon;
  
  userInfoDataSubscription!: Subscription
  languagesDataSubscription!: Subscription

  constructor(
    private resumeService: ResumeService,
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data: any) => {
        this.userInfoData = data;
      }
    );

    this.languagesDataSubscription = this.resumeService.languagesDataSubject.subscribe(
      (data: any) => {
        this.languagesData = data;
      }
    );
  }

  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi();
    this.resumeService.queryLanguagesFromApi();
  }

  ngOnDestroy(): void {
    this.userInfoDataSubscription.unsubscribe();
    this.languagesDataSubscription.unsubscribe();
  }

}
