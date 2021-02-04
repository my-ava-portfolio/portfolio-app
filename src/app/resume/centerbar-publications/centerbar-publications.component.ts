import { Component, OnInit, Input } from '@angular/core';

import { resumeIcon, arrowUpIcon, pdfFileIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-publications',
  templateUrl: './centerbar-publications.component.html',
  styleUrls: ['./centerbar-publications.component.css']
})
export class CenterbarPublicationsComponent implements OnInit {
  @Input() publicationsData: any;

  inputpublicationData!: any;

  // icons
  arrowUpIcon = arrowUpIcon;
  pdfFileIcon = pdfFileIcon;
  resumeIcon = resumeIcon;

  constructor() { }

  ngOnInit(): void {
    this.inputpublicationData = this.publicationsData;
  }

}
