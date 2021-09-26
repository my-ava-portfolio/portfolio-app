import { Component, OnInit, Input } from '@angular/core';

import { expandIcon, publishIcon, arrowUpIcon, pdfFileIcon } from '../../core/inputs';


@Component({
  selector: 'app-centerbar-publications',
  templateUrl: './centerbar-publications.component.html',
  styleUrls: ['./centerbar-publications.component.scss']
})
export class CenterbarPublicationsComponent implements OnInit {
  @Input() publicationsData: any;

  inputpublicationData!: any;

  // icons
  arrowUpIcon = arrowUpIcon;
  pdfFileIcon = pdfFileIcon;
  publishIcon = publishIcon;
  expandIcon = expandIcon;

  constructor() { }

  ngOnInit(): void {
    this.inputpublicationData = this.publicationsData;
  }

}
