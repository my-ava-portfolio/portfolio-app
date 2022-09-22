import { Component, Input, OnInit } from '@angular/core';

import { faBook, faFilePdf } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-publication-bar',
  templateUrl: './publication-bar.component.html',
  styleUrls: ['./publication-bar.component.scss']
})
export class PublicationBarComponent implements OnInit {
  @Input() fragment: any;
  @Input() publicationsData: any;

  publishIcon = faBook;
  pdfFileIcon = faFilePdf;

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(data: any): string {
    return data.year + ' - ' + data.editor;
  }

}
