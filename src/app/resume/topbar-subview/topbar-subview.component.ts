import { Component, OnInit, Input } from '@angular/core';

import { githubIcon, linkedinIcon, printIcon } from '../../core/inputs';


@Component({
  selector: 'app-topbar-subview',
  templateUrl: './topbar-subview.component.html',
  styleUrls: ['./topbar-subview.component.css']
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
