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
  generalData!: any;

  imageProfile: string = imageProfile;


  generalDataSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {


    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
  }

  ngOnDestroy(): void {
    this.generalDataSubscription.unsubscribe();
  }
}
