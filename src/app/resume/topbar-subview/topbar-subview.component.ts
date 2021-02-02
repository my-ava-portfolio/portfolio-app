import { Component, OnInit, Input } from '@angular/core';

import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';


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
  faPrint = faPrint;
  faGithub = faGithub;
  faLinkedinIn = faLinkedinIn;

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
