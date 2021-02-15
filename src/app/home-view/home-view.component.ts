import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { pagesObject } from '../core/inputs';

import { infoIcon, resumeIcon, galleryIcon, notesIcon, githubIcon, pythonIcon, githubUrl } from '../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { name, dependencies } from '../../../package.json';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  quartersStatus!: any;

  // icons
  resumeIcon = resumeIcon;
  galleryIcon = galleryIcon;
  notesIcon = notesIcon;
  githubIcon = githubIcon;
  infoIcon = infoIcon;
  pythonIcon = pythonIcon;

  pagesObject = pagesObject;

  title = 'Portfolio';
  author = 'Amaury Valorge';
  starterMessage = 'Géomaticien | Développeur';
  defaultWelcomeMessage = 'Portfolio';
  githubUrl = githubUrl;

  quarterNotSelected = false;
  currentQuarterSelected!: string ;
  welcomeMessage!: string;
  topicMessage!: string;

  authorRepoUrl = 'https://github.com/amauryval/portfolio-angular';
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

    this.angularVersion = dependencies['@angular/core'];
    this.bootstrapVersion = dependencies['@ng-bootstrap/ng-bootstrap'];
    this.leafletVersion = dependencies.leaflet;
    this.d3Version = dependencies.d3;

  }

  updateQuarterStatus(topic: string): void {
    const currentQuarterStatus: boolean = this.quartersStatus[topic].status;
    this.quartersStatus[topic].status = !currentQuarterStatus;
    this.quarterNotSelected = this.quartersStatus[topic].status;
    this.topicMessage = this.quartersStatus[topic].title;
  }

  resetQuartersStatus(): void {
    for (const property in this.quartersStatus) {
      if (this.quartersStatus.hasOwnProperty(property)) {
        this.quartersStatus[property].status = false;
      }
    }
  }

}
