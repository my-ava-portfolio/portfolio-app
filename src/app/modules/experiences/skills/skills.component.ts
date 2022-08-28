import { Component, OnInit, Input } from '@angular/core';

import { skillIcon, skillsMapping } from '@core/inputs';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skillsData: any;
  @Input() isActivitiesDataAvailable: any;


  skillsCategories = skillsMapping;

  skillIcon = skillIcon;

  constructor(  ) {  }

  ngOnInit(): void {
  }

  trackByMethod(index: number, el: any): number {
    // TODO add an id field
    return el.name;
  }

  keepOrder(): any {
    // check https://stackoverflow.com/a/72286062/13168168
  }

}
