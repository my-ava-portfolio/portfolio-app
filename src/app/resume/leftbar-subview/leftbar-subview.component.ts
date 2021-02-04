import { Component, OnInit, Input } from '@angular/core';

import { faUserGraduate, faMapMarkerAlt, faLanguage } from '@fortawesome/free-solid-svg-icons';
import { apiImgUrl } from '../../core/inputs';

@Component({
  selector: 'app-leftbar-subview',
  templateUrl: './leftbar-subview.component.html',
  styleUrls: ['./leftbar-subview.component.css']
})
export class LeftbarSubviewComponent implements OnInit {
  
  @Input() degreesData: any;
  @Input() languagesData: any;
  @Input() trainingsData: any;

  apiImgUrl = apiImgUrl;

  inputDegreesData: any;
  inputLanguagesData: any;
  inputTrainingsData: any;

  // icons
  faUserGraduate = faUserGraduate;
  faMapMarkerAlt = faMapMarkerAlt;
  faLanguage = faLanguage;

  constructor() { }

  ngOnInit(): void {
    this.inputDegreesData = this.degreesData;
    this.inputLanguagesData = this.languagesData;
    this.inputTrainingsData = this.trainingsData;
  }

}