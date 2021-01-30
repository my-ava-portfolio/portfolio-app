import { Component, OnInit } from '@angular/core';
import { faAddressCard, faImages, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons'

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  defaultQuartersStatus: any = {
    resume: {
      title: 'Profil',
      status: false
    },
    maps_library: {
      title: 'Cartes',
      status: false
    },
    notes: {
      title: 'Notes',
      status: false
    },
    github: {
      title: 'Github',
      status: false
    }
  };
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
  welcomeMessage!: string;
  topicMessage!: string;

  constructor() {
  }

  ngOnInit(): void {
    this.quartersStatus = this.defaultQuartersStatus
    this.welcomeMessage = this.defaultWelcomeMessage
  }

  updateQuarterStatus(topic: string): void {
    const currentQuarterStatus: boolean = this.quartersStatus[topic].status
    this.quartersStatus = this.defaultQuartersStatus
    this.quartersStatus[topic].status = !currentQuarterStatus
    this.quarterNotSelected = this.quartersStatus[topic].status
    this.topicMessage = this.quartersStatus[topic].title
  }




}
