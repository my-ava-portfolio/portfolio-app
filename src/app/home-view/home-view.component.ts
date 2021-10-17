import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';


import { infoIcon, githubIcon, pythonIcon, githubUrl } from '../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { name, dependencies } from '../../../package.json';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {

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
    private activatedRoute: ActivatedRoute,
    private titleService: Title
    ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);


  }

  ngOnInit(): void {
  }


}


