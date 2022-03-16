import { Component, OnInit, Input } from '@angular/core';

import { githubIcon, linkedinIcon, printIcon, emailIcon } from '../../core/inputs';
import { navIcon, projectIcon, publishIcon, jobIcon, volunteerIcon, presIcon } from '../../core/inputs';
import { experiencesPages } from '../../core/inputs';


@Component({
  selector: 'app-profil-bar',
  templateUrl: './profil-bar.component.html',
  styleUrls: ['./profil-bar.component.scss']
})
export class ProfilBarComponent implements OnInit {
  @Input() profilData: any;
  @Input() contactData: any;

  inputProfilData!: any;
  inputContactData!: any;

  linkBuilt!: string;

  // icons
  printIcon = printIcon;
  githubIcon = githubIcon;
  linkedinIcon = linkedinIcon;
  emailIcon = emailIcon;

  projectIcon = projectIcon;
  publishIcon = publishIcon;
  volunteerIcon = volunteerIcon;
  jobIcon = jobIcon;
  presIcon = presIcon;
  navIcon = navIcon;
  avatarImg: string = "https://fakeimg.pl/75x75/";

  experiencesTopics: any = experiencesPages.sub_menus;

  constructor() { }

  ngOnInit(): void {
    this.inputProfilData = this.profilData;
    this.inputContactData = this.contactData;
    console.log(this.experiencesTopics);
  }

  reverse(value: string): void {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    this.linkBuilt = output;
  }


}
