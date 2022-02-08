import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';

import { apiLogoUrl } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';

import { expandIcon, volunteerIcon, galleryIcon, locationIcon, notesIcon, githubIcon, websiteIcon, filterIcon } from '../../core/inputs';

@Component({
  selector: 'app-centerbar-volunteer',
  templateUrl: './centerbar-volunteer.component.html',
  styleUrls: ['./centerbar-volunteer.component.css']
})
export class CenterbarVolunteerComponent implements OnInit {
  @Output() notePathEmit = new EventEmitter<string>();
  @Input() volunteersData: any;

  activityTitle = "Bénévolat";
  themesTitle = "Thèmes";
  contextTitle = "Contexte";
  missionTitle = "Missions";
  envTitle = "Environnement";
  trainingTitle = "Formations";
  detailsTitle = "Détails";
  
  apiImgUrl = apiLogoUrl;

  // icons
  volunteerIcon = volunteerIcon;
  galleryIcon = galleryIcon;
  githubIcon = githubIcon;
  notesIcon = notesIcon;
  websiteIcon = websiteIcon;
  filterIcon = filterIcon;
  locationIcon = locationIcon;
  expandIcon = expandIcon;

  constructor(
    private resumeService: ResumeService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  emitNotePath(notePath: string): void {
    this.notePathEmit.emit(notePath);
  }

  pushActivityId(activityId: string): void {
    this.resumeService.pullActivityIdToPreselectNodeGraph(activityId);
  }

  forceArrayType(input: any): string[] {
    return input
  }

}
