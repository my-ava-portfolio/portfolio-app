import { Component, OnInit, Input } from '@angular/core';
import { skillsMapping } from '@core/global-values/main';

import { faStar } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  @Input() skillsData: any;
  @Input() isActivitiesDataAvailable: any;


  skillsCategories = skillsMapping;

  skillIcon = faStar;

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
