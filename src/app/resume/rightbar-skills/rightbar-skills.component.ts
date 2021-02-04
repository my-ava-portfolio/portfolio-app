import { Component, OnInit } from '@angular/core';

import { skillIcon, arrowDownIcon } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-rightbar-skills',
  templateUrl: './rightbar-skills.component.html',
  styleUrls: ['./rightbar-skills.component.css']
})
export class RightbarSkillsComponent implements OnInit {
  isDataAvailable = false;
  skillsCategories = {
    technics: 'Techniques',
    themes: 'Thématiques',
    tools: 'Outils'
  };

  technicsCategoryEnabled!: boolean;
  themesCategoryEnabled!: boolean;
  toolsCategoryEnabled!: boolean;
  skillsData!: any;

  skillIcon = skillIcon;
  arrowDownIcon = arrowDownIcon;

  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.skillsData = data;

        // this.themesCategoryEnabled = this.skillsData.themes.enabled

        this.isDataAvailable = true;
        console.log(data);
      },
      (error) => {
        console.log('error');
        this.isDataAvailable = false;

      }
    );

  }

  ngOnInit(): void {
    this.themesCategoryEnabled = true;
  }


}
