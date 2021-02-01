import { Component, OnInit } from '@angular/core';

import { faStar, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

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
  faArrowAltCircleRight = faArrowAltCircleRight;

  constructor(
    private resumeService: ResumeService
  ) {

    this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.themesData = data['1themes'];
        this.technicsData = data['2technics'];
        this.toolsData = data['3tools'];

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
