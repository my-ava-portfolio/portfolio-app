import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { pagesObject } from '../core/inputs';

import { infoIcon, githubIcon, pythonIcon, githubUrl } from '../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { name } from '../../../package.json';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  quartersStatus!: any;
  pagesObject = pagesObject;

  // icons
  infoIcon = infoIcon;
  pythonIcon = pythonIcon;
  githubIcon = githubIcon;

  title = 'Portfolio';
  author = 'Amaury Valorge';
  starterMessage = 'Géomaticien | Développeur';
  defaultWelcomeMessage = 'Portfolio';
  githubUrl = githubUrl;

  quarterNotSelected = false;
  currentQuarterSelected!: string;
  welcomeMessage!: string;
  topicMessage!: string;

  authorRepoUrl = 'https://github.com/amauryval/portfolio';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    // to call function when root changes occur
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.resetQuartersStatus();

        // Show loading indicator
      }
      if (event instanceof NavigationEnd) {
        // Hide loading indicator
      }
      if (event instanceof NavigationError) {
        // Hide loading indicator
        // Present error to user
        console.log(event.error);
      }
    });

  }

  ngOnInit(): void {
    this.quartersStatus = this.pagesObject;
    this.welcomeMessage = this.defaultWelcomeMessage;
  }


  goToLink(topic: string): void {
    if (topic === 'github') {
      window.open(this.githubUrl, "_blank");
    } else {
      this.router.navigate(['/' + topic]);
    }
  }

  updateQuarterStatus(topic: string): void {
    const currentQuarterStatus: boolean = this.quartersStatus[topic].status;
    this.quartersStatus[topic].status = !currentQuarterStatus;
    this.quarterNotSelected = this.quartersStatus[topic].status;
    this.topicMessage = this.quartersStatus[topic].title;
  }


  getIcon(topic: string): any {
    const feature_found: any = this.pagesObject[topic];
    return feature_found.icon;
  }

  resetQuartersStatus(): void {
    for (const property in this.quartersStatus) {
      if (this.quartersStatus.hasOwnProperty(property)) {
        this.quartersStatus[property].status = false;
      }
    }
  }
}
