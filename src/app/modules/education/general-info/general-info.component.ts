import { Component, OnInit, Input } from '@angular/core';
import { assetsLogoPath } from '@core/global-values/main';
import { mapActivitiesPages } from '@core/global-values/topics';

import { faLanguage } from '@fortawesome/free-solid-svg-icons';
import { ResumeService } from '@services/resume.service';
import { backgroundTitle, specializationTitle } from '../core';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  mapPages: any = mapActivitiesPages;

  // TODO add them on API
  backgroundTitle = backgroundTitle;
  specializationTitle = specializationTitle;

  assetsLogoPath = assetsLogoPath;

  languagesData: any;
  userInfoData: any;

  // icons
  languageIcon = faLanguage;

  userInfoDataSubscription!: Subscription
  languagesDataSubscription!: Subscription

  constructor(
    private resumeService: ResumeService,
  ) {

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.userInfoData = data;
      }
    );

    this.languagesDataSubscription = this.resumeService.languagesDataSubject.subscribe(
      (data) => {
        this.languagesData = data;
      }
    );

  }
  ngOnInit(): void {
    this.resumeService.queryUserInfoFromApi()
    this.resumeService.queryLanguagesFromApi()
  }

}
