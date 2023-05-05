import { Component, OnInit, OnDestroy } from '@angular/core';
import { assetsLogoPath } from '@core/globals/resume-shared-data';

import { faUserGraduate, faMapMarkerAlt, faLanguage, faAddressBook, faExpand } from '@fortawesome/free-solid-svg-icons';
import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-trainings-bar',
  templateUrl: './trainings-bar.component.html',
  styleUrls: ['./trainings-bar.component.scss'],
})
export class TrainingsBarComponent implements OnInit, OnDestroy {

  assetsLogoPath = assetsLogoPath;
  trainingsData: any;

  trainingsDataSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService,
  ) {

    this.trainingsDataSubscription = this.resumeService.trainingsDataSubject.subscribe(
      (data: any) => {
        this.trainingsData = data;
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.queryTrainingsFromApi();
  }

  ngOnDestroy(): void {
    this.trainingsDataSubscription.unsubscribe();
  }

}
