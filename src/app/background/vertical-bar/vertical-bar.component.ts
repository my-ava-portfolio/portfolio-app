import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { share } from 'rxjs/operators';

import { Location } from '@angular/common';

import { navBarTitle, homePages, resumePages, projectPages } from '../../core/inputs';
import { caretRightIcon, helpIcon, exclamationIcon, bugIcon } from '../../core/inputs';
import { githubBugIssueUrl, githubEnhancementUrl, githubQuestionUrl } from '../../core/inputs';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent implements OnInit {
  selectedAnchor: boolean = false;

  currentPage!: string;

  homePages: any = homePages;
  navBarTitle: string = navBarTitle;
  resumePages: any = resumePages;
  projectPages: any = projectPages;

  bugIcon = bugIcon;
  helpIcon = helpIcon;
  exclamationIcon = exclamationIcon;
  caretRightIcon = caretRightIcon;
  GithubBugIssueLink = githubBugIssueUrl;
  GithubQuestionIssueLink = githubQuestionUrl;
  GithubEnhancementIssueLink = githubEnhancementUrl;

  contactPopupTitle = 'Contact';
  contactBugMessage = 'Un bug ?';
  contactHelpMessage = "Besoin d'aide ?"
  contactFeatureMessage = 'Des améliorations ?';

  issueSufixTitle = ' page:';

  // https://stackoverflow.com/questions/63468292/how-to-add-active-class-to-link-which-has-fragmment-in-angular
  activeFragment = this.route.fragment.pipe(share());

  constructor(
    private router: Router,
    private location: Location,
    public route: ActivatedRoute
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
