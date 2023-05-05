import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { pdfFileIcon, publicationIcon } from '@core/globals/icons';

import { ResumeService } from '@services/resume.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-publication-bar',
  templateUrl: './publication-bar.component.html',
  styleUrls: ['./publication-bar.component.scss']
})
export class PublicationBarComponent implements OnInit, OnDestroy {
  @Input() activityType: any;

  publishIcon = publicationIcon;
  pdfFileIcon = pdfFileIcon;

  publicationsData!: any;
  
  publicationsDataSubscription!: Subscription

  constructor(
    private resumeService: ResumeService,
  ) {

    this.publicationsDataSubscription = this.resumeService.publicationsDataSubject.subscribe(
      (data: any) => {
        this.publicationsData = data;
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.queryPublicationsFromApi(this.activityType)
  }

  ngOnDestroy(): void {
    this.publicationsDataSubscription.unsubscribe();
  }

  getTitle(data: any): string {
    return data.year + ' - ' + data.editor;
  }

}
