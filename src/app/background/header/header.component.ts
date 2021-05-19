import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { navBarTitle, homePage, pages } from '../../core/inputs';
import { helpIcon, exclamationIcon, bugIcon } from '../../core/inputs';
import { githubBugIssueUrl, githubEnhancementUrl, githubQuestionUrl } from '../../core/inputs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentPage!: string;

  homePage: any = homePage;
  navBarTitle: string = navBarTitle;
  portfolioPages: any = pages;

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
  }

}
