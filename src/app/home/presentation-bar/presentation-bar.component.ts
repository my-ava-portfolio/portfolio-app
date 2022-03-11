import { Component, Input, OnInit } from '@angular/core';
import { plusIcon, presIcon, expandIcon, resumePages, projectPages, imageProfile } from '../../core/inputs';


@Component({
  selector: 'app-presentation-bar',
  templateUrl: './presentation-bar.component.html',
  styleUrls: ['./presentation-bar.component.scss']
})
export class PresentationBarComponent implements OnInit {
  @Input() inputGeneralData!: any;

  @Input() inputThemesData!: any;
  @Input() inputTechnicsData!: any;
  @Input() inputToolsData!: any;

  resumePages: any[] = resumePages;
  projectPages: any[] = projectPages;

  imageProfile: string = imageProfile;
  // icons
  presIcon = presIcon;
  expandIcon = expandIcon;
  plusIcon = plusIcon;
  
  constructor() { }

  ngOnInit(): void {
  }

}
