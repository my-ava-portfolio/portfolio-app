import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { navBarTitle, homePages, githubIcon, githubUrl, infoIcon, pythonIcon } from '../../core/inputs';
import { menuIcon, helpIcon, exclamationIcon, bugIcon } from '../../core/inputs';
import { githubBugIssueUrl, githubEnhancementUrl, githubQuestionUrl } from '../../core/inputs';
import { resumePages, projectPages } from '../../core/inputs';

import { name, dependencies } from '../../../../package.json';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage!: string;

  navBarTitle: string = navBarTitle;
  topicPages: any = [...resumePages, ...projectPages];
  homePage: any = homePages[0];

  bugIcon = bugIcon;
  helpIcon = helpIcon;
  exclamationIcon = exclamationIcon;
  GithubBugIssueLink = githubBugIssueUrl;
  GithubQuestionIssueLink = githubQuestionUrl;
  GithubEnhancementIssueLink = githubEnhancementUrl;

  contactPopupTitle = 'Contact';
  contactBugMessage = 'Un bug ?';
  contactHelpMessage = "Besoin d'aide ?"
  contactFeatureMessage = 'Des améliorations ?';

  issueSufixTitle = ' page:';

  // icons
  infoIcon = infoIcon;
  pythonIcon = pythonIcon;
  githubIcon = githubIcon;
  menuIcon = menuIcon;

  title = 'Portfolio';
  author = 'Amaury Valorge';
  starterMessage = 'Géomaticien | Développeur';
  defaultWelcomeMessage = 'Portfolio';
  githubUrl = githubUrl;

  quarterNotSelected = false;
  currentQuarterSelected!: string ;
  welcomeMessage!: string;
  topicMessage!: string;

  authorRepoUrl = 'https://github.com/amauryval/portfolio';
  nameApp = name;
  year = 2021;

  pythonVersion = '3.8';

  lib1Name = 'Flask';
  lib1Version = '';
  lib1RepoUrl = 'https://github.com/pallets/flask';

  angularVersion!: string;
  angularRepoUrl = 'https://github.com/angular/angular';

  bootstrapVersion!: string;
  bootstrapRepoUrl = 'https://ng-bootstrap.github.io/#/home';

  leafletVersion!: string;
  leafletRepoUrl = 'https://github.com/Leaflet/Leaflet';

  d3Version!: string;
  d3RepoUrl = 'https://github.com/d3/d3';


  constructor(
    private router: Router,
    private location: Location,
  ) {

    // to get the current page opened and adapt content regarding orientation
    // todo: check if needed
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
    });

   }

  ngOnInit(): void {
    this.currentPage = this.location.path();

    this.angularVersion = dependencies['@angular/core'];
    this.bootstrapVersion = dependencies['bootstrap'];
    this.leafletVersion = dependencies.leaflet;
    this.d3Version = dependencies.d3;
  }

}
