import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';

import { faAddressCard, faImages, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

import { pagesObject } from '../../core/inputs';


@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  quartersStatus!: any;

  faAddressCard = faAddressCard;
  faImages = faImages;
  faBookOpen = faBookOpen;
  faGithub = faGithub;

  title = "Portfolio";
  author = "Amaury Valorge";
  starterMessage = "Géomaticien | Développeur";
  defaultWelcomeMessage = "Portfolio";

  quarterNotSelected = false;
  currentQuarterSelected!: string ;
  welcomeMessage!: string;
  topicMessage!: string;

  constructor(private router: Router) {

    // to call function when root changes occur
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.resetQuartersStatus()

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
    this.quartersStatus = pagesObject;
    this.welcomeMessage = this.defaultWelcomeMessage;
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
