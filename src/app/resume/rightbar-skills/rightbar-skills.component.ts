import { Component, OnInit } from '@angular/core';

import { faStar, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

import { ResumeService } from '../../services/resume.service';


@Component({
  selector: 'app-rightbar-skills',
  templateUrl: './rightbar-skills.component.html',
  styleUrls: ['./rightbar-skills.component.css']
})
export class RightbarSkillsComponent implements OnInit {
  selectedNode!: string;
  selectedNodeFound!: string;
  displayAllSkillTopics = true;

  themesData!: any;
  themesTopicOpened = true;
  technicsData!: any;
  technicsTopicOpened = true;
  toolsData!: any;
  toolsTopicOpened = false;

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
        // this.selectedNodeFound = data.selected;
        // this.checkSelectedNode(data.selected)
        console.log(data);
      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
  }

  switchSkillCategoryDisplay(category: string): void {
    if (category === 'themes') {
      this.themesTopicOpened = !this.themesTopicOpened;
    }
    if (category === 'technics') {
      this.technicsTopicOpened = !this.technicsTopicOpened;
    }
    if (category === 'tools') {
      this.toolsTopicOpened = !this.toolsTopicOpened;
    }
  }

  // checkSelectedNode(selectedNode: string | null): void {
  //   if (selectedNode === null) {
  //     this.displayAllSkillTopics = true;
  //     this.selectedNode = '';
  //   } else {
  //     this.displayAllSkillTopics = false;
  //     this.selectedNode = selectedNode;
  //   }
  // }

}
