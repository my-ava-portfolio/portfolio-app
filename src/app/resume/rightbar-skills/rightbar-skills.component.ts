import { navBarTitle } from './../../core/inputs';
import { Component, OnInit } from '@angular/core';

import { faStar, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '../../services/resume.service';

import { NgbCollapse } from '@ng-bootstrap/ng-bootstrap';


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

  faStar = faStar;
  faArrowAltCircleDown = faArrowAltCircleDown;

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
