import { Component, OnInit } from '@angular/core';

import { faStar, faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-rightbar-skills',
  templateUrl: './rightbar-skills.component.html',
  styleUrls: ['./rightbar-skills.component.css']
})
export class RightbarSkillsComponent implements OnInit {

  themesData!: any;
  technicsData!: any;
  toolsData!: any;

  faStar = faStar;
  faArrowAltCircleDown = faArrowAltCircleDown;

  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.themesData = data.themes;
        this.technicsData = data.technics;
        this.toolsData = data.tools;

        console.log(data);
      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

}
