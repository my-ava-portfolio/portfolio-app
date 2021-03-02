import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { skillIcon, arrowDownIcon } from '../../core/inputs';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-rightbar-skills',
  templateUrl: './rightbar-skills.component.html',
  styleUrls: ['./rightbar-skills.component.scss']
})
export class RightbarSkillsComponent implements OnInit, OnDestroy {
  isDataAvailable = false;
  skillsCategories = {
    technics: 'Techniques',
    themes: 'Thématiques',
    tools: 'Outils'
  };

  skillsData!: any;

  skillIcon = skillIcon;
  arrowDownIcon = arrowDownIcon;

  skillsDataSubscription!: Subscription;


  constructor(
    private resumeService: ResumeService
  ) {

    this.skillsDataSubscription = this.resumeService.skillsFilteredData.subscribe(
      (data) => {
        this.skillsData = data;

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
  }

  ngOnDestroy(): void {
    this.skillsDataSubscription.unsubscribe();
  }

}
