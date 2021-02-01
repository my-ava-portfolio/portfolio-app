import { Component, OnInit, Input } from '@angular/core';

import { faGlobeEurope, faFilePdf, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-centerbar-publications',
  templateUrl: './centerbar-publications.component.html',
  styleUrls: ['./centerbar-publications.component.css']
})
export class CenterbarPublicationsComponent implements OnInit {
  @Input() publicationsData: any;

  inputpublicationData!: any;

  // icons
  faArrowAltCircleUp = faArrowAltCircleUp;
  faFilePdf = faFilePdf;
  faGlobeEurope = faGlobeEurope;

  constructor() { }

  ngOnInit(): void {
    this.inputpublicationData = this.publicationsData;
  }

}
