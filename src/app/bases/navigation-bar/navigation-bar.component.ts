import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { Location } from '@angular/common';
import { share } from 'rxjs/operators';

import { currentYear } from '@core/misc';

import { ResumeService } from 'src/app/services/resume.service';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { backEndInfo, dataProcessingInfo, frontEndInfo } from '@core/global-values/tech-infos';
import { imageProfile } from '@core/global-values/main';
import { githubBugIssueUrl, githubQuestionUrl, githubEnhancementUrl } from '@core/global-values/navigation-links';
import { faPython, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { faBug, faQuestionCircle, faExclamationCircle, faCogs, faBars, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { homePages, legacyResumePage, mainTopicsPages } from '@core/global-values/topics';
import { activitiesPagesType } from '@core/data-types';

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

  bugIcon = faBug;
  helpIcon = faQuestionCircle;
  exclamationIcon = faExclamationCircle;
  GithubBugIssueLink = githubBugIssueUrl;
  GithubQuestionIssueLink = githubQuestionUrl;
  GithubEnhancementIssueLink = githubEnhancementUrl;

  contactPopupTitle = 'Contact';
  contactBugMessage = 'Un bug ?';
  contactHelpMessage = "Besoin d'aide ?"
  contactFeatureMessage = 'Des améliorations ?';

  issueSufixTitle = ' page:';

  // icons
  infoIcon = faCogs;
  pythonIcon = faPython;
  githubIcon = faGithub;
  menuIcon = faBars;
  linkedinIcon = faLinkedinIn;
  emailIcon = faEnvelope;

  authorRepoUrl = 'https://github.com/amauryval/portfolio';

  currentYear = currentYear;


  dataProcessing = dataProcessingInfo;
  backEnd = backEndInfo;
  frontEnd = frontEndInfo;

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
    private modalService: NgbModal
  ) {

    // to get the current page opened and adapt content regarding orientation
    // todo: check if needed
    this.routeSubscription = this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
    });

    this.contactDataSubscription = this.resumeService.contactData.subscribe(
      (data) => {
        this.contactData = data;
      }
    );

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
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

  openPortoflioTechDetails(content: any) {
    this.modalService.open(
      content,
      { centered: true, size: 'lg', modalDialogClass: 'tech-modal' }
    );
  }
}
