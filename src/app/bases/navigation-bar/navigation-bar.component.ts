import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { share } from 'rxjs/operators';

import { currentYear } from '@core/misc';

import { ResumeService } from 'src/app/services/resume.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { imageProfile } from '@core/globals/resume-shared-data';
import { githubBugIssueUrl, githubQuestionUrl, githubEnhancementUrl, issueSufixTitle } from '@core/globals/navigation-links';
import { homePages, legacyResumePage, mainTopicsPages, techStackPages } from '@core/globals/topics_skeleton';

import { githubIcon, linkedinIcon, emailIcon, menuIcon, bugIcon, exclamationIcon, helpIcon } from '@core/globals/icons';


@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @Input() sideBarCollapsed: any;

  currentPage!: string;

  topicPages: any = mainTopicsPages;
  homePages = homePages;
  legacyResumePage: any = legacyResumePage;
  techStackPage: any = techStackPages[0];

  GithubBugIssueLink = githubBugIssueUrl;
  GithubQuestionIssueLink = githubQuestionUrl;
  GithubEnhancementIssueLink = githubEnhancementUrl;

  contactPopupTitle = 'Contact';
  contactBugMessage = 'Un bug ?';
  contactHelpMessage = "Besoin d'aide ?"
  contactFeatureMessage = 'Des améliorations ?';

  issueSufixTitle = issueSufixTitle;

  // icons
  githubIcon = githubIcon;
  menuIcon = menuIcon;
  linkedinIcon = linkedinIcon;
  emailIcon = emailIcon;
  bugIcon = bugIcon;
  helpIcon = helpIcon;
  exclamationIcon = exclamationIcon

  authorRepoUrl = 'https://github.com/amauryval/portfolio';

  currentYear = currentYear;

  // https://stackoverflow.com/questions/63468292/how-to-add-active-class-to-link-which-has-fragmment-in-angular
  activeFragment = this.route.fragment.pipe(share());

  imageProfile: string = imageProfile;

  linkBuilt!: string;
  userContactData!: any;
  userContactDataSubscription!: Subscription;

  userInfoData!: any;

  userInfoDataSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    public route: ActivatedRoute,
    private resumeService: ResumeService,
    private modalService: NgbModal
  ) {

    // to get the current page opened and adapt content regarding orientation
    // todo: check if needed
    this.routeSubscription = this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
    });

    this.userContactDataSubscription = this.resumeService.userContactDataSubject.subscribe(
      (data: any) => {
        this.userContactData = data;
      }
    );

    this.userInfoDataSubscription = this.resumeService.userInfoDataSubject.subscribe(
      (data) => {
        this.userInfoData = data;
      }
    );


  }

  ngOnInit(): void {
    this.currentPage = this.location.path();
    this.resumeService.queryUserContactFromApi();
    this.resumeService.queryUserInfoFromApi();
  }

  ngOnDestroy(): void {
    this.userContactDataSubscription.unsubscribe();
    this.userInfoDataSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  reverse(value: string): void {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    this.linkBuilt = output;
  }

  openPortoflioTechDetails(content: any) {
    this.modalService.open(
      content,
      { centered: true, size: 'lg', modalDialogClass: 'tech-modal' }
    );
  }
}
