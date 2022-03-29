import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import { skillIcon, arrowDownIcon, expandIcon } from '@core/inputs';

import { ResumeService } from '@services/resume.service';


@Component({
  selector: 'app-rightbar-skills',
  templateUrl: './rightbar-skills.component.html',
  styleUrls: ['./rightbar-skills.component.scss']
})
export class RightbarSkillsComponent implements OnInit, OnDestroy {
  @Input() skillsData: any;
  @Input() isActivitiesDataAvailable: any;


  skillsCategories = {
    technics: 'Techniques',
    themes: 'Thématiques',
    tools: 'Outils'
  };

  skillIcon = skillIcon;
  expandIcon = expandIcon;
  arrowDownIcon = arrowDownIcon;

  skillsDataSubscription!: Subscription;


  constructor(
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  trackByMethod(index: number, el: any): number {
    // TODO add an id field
    return el.name;
  }

}
