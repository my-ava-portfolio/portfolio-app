import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { skillIcon, arrowDownIcon, expandIcon } from '@core/inputs';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit, OnDestroy {
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
