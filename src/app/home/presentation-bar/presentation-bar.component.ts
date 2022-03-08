import { Component, Input, OnInit } from '@angular/core';
import { presIcon, expandIcon, resumePages, projectPages, imageProfile } from '../../core/inputs';


@Component({
  selector: 'app-presentation-bar',
  templateUrl: './presentation-bar.component.html',
  styleUrls: ['./presentation-bar.component.scss']
})
export class PresentationBarComponent implements OnInit {
  @Input() inputGeneralData!: any;


  resumePages: any[] = resumePages;
  projectPages: any[] = projectPages;

  imageProfile: string = imageProfile;
  // icons
  presIcon = presIcon;
  expandIcon = expandIcon;

  constructor() { }

  ngOnInit(): void {
  }

}
