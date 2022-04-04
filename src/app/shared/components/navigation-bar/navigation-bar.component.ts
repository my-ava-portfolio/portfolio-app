import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { share } from 'rxjs/operators';

import { checkIfScreenPortraitOrientation, homePages, infoIcon, pythonIcon } from '@core/inputs';
import { githubIcon, linkedinIcon, emailIcon } from '@core/inputs';
import { menuIcon, helpIcon, exclamationIcon, bugIcon } from '@core/inputs';
import { githubBugIssueUrl, githubEnhancementUrl, githubQuestionUrl } from '@core/inputs';
import { currentYear, mainTopicsPages, imageProfile } from '@core/inputs';

import { ResumeService } from 'src/app/services/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit, OnDestroy {
  @Input() sideBarCollapsed: any;

  currentPage!: string;

  topicPages: any = mainTopicsPages;
  homePages: any = homePages[0];

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
  linkedinIcon = linkedinIcon;
  emailIcon = emailIcon;

  authorRepoUrl = 'https://github.com/amauryval/portfolio';

  currentYear = currentYear;

  pythonVersion = '3';
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

  // https://stackoverflow.com/questions/63468292/how-to-add-active-class-to-link-which-has-fragmment-in-angular
  activeFragment = this.route.fragment.pipe(share());

  imageProfile: string = imageProfile;

  linkBuilt!: string;
  contactData!: any;
  contactDataSubscription!: Subscription;

  generalData!: any;
  generalDataSubscription!: Subscription;
  routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private location: Location,
    public route: ActivatedRoute,
    private resumeService: ResumeService,
  ) {

    // to get the current page opened and adapt content regarding orientation
    // todo: check if needed
    this.routeSubscription = this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
    });

    this.contactDataSubscription = this.resumeService.contactData.subscribe(
      (data) => {
        console.log(data)
        this.contactData = data;
      }
    );

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        console.log(data)
        this.generalData = data;
      }
    );


  }

  ngOnInit(): void {
    this.currentPage = this.location.path();
    this.resumeService.pullContactData();
    this.resumeService.pullGeneralData();
  }

  ngOnDestroy(): void {
    this.contactDataSubscription.unsubscribe();
    this.generalDataSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  reverse(value: string): void {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    this.linkBuilt = output;
  }


}
