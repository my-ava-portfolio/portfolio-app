import { Component, OnInit, Input } from '@angular/core';

import { githubIcon, linkedinIcon, printIcon, emailIcon } from '../../core/inputs';
import { navIcon, projectIcon, publishIcon, jobIcon, volunteerIcon, presIcon } from '../../core/inputs';


@Component({
  selector: 'app-topbar-subview',
  templateUrl: './topbar-subview.component.html',
  styleUrls: ['./topbar-subview.component.scss']
})
export class TopbarSubviewComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
    this.inputProfilData = this.profilData;
    this.inputContactData = this.contactData;

  }

  reverse(value: string): void {
    let output = '';
    for (let i = value.length - 1; i >= 0; i--) {
      output += value[i];
    }
    this.linkBuilt = output;
  }

}
