import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import { apiImgUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';

import { resumeIcon, galleryIcon, notesIcon, githubIcon, websiteIcon } from '../../core/inputs';



@Component({
  selector: 'app-centerbar-projects',
  templateUrl: './centerbar-projects.component.html',
  styleUrls: ['./centerbar-projects.component.css']
})
export class CenterbarProjectsComponent implements OnInit, OnDestroy {
  @Output() notePathEmit = new EventEmitter<string>();

  personalProjectsData!: any;

  apiImgUrl = apiImgUrl;

  // icons
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  githubIcon = githubIcon;
  notesIcon = notesIcon;
  websiteIcon = websiteIcon;

  activitiesFilteredSubscription!: Subscription;

  constructor(
    private resumeService: ResumeService
  ) {

    this.activitiesFilteredSubscription = this.resumeService.activitiesFilteredData.subscribe(
      (data) => {

        this.personalProjectsData = data.personal_projects;
        console.log(this.personalProjectsData);

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('lalala projects');
    this.activitiesFilteredSubscription.unsubscribe();
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

}
