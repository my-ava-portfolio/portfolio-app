import { Component, Input, OnInit } from '@angular/core';
import { pdfFileIcon, publishIcon } from '@core/inputs';

@Component({
  selector: 'app-publication-bar',
  templateUrl: './publication-bar.component.html',
  styleUrls: ['./publication-bar.component.scss']
})
export class PublicationBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() publicationsData: any;

  publishIcon = publishIcon;
  pdfFileIcon = pdfFileIcon;

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(data: any): string {
    return data.year + ' - ' + data.editor;
  }

}
