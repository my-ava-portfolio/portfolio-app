import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable()
export class GalleryService {
  private galleryApiUrl = environment.resumeApiUrl + 'gallery/'
  ErrorActivitiesGalleryApiFound: Subject<string> = new Subject<string>();
  activitiesGalleryData: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  queryGalleryFeatures(parameters: any): void {

    this.http.get<any>(`${this.galleryApiUrl}`, {params: parameters}).subscribe({
      complete: () => {
      },
      error: error => {
      // TODO improve error message, but API need improvments
      this.ErrorActivitiesGalleryApiFound.next(error.error.message);
      },
      next: response => {
        this.activitiesGalleryData.next(response);
      },
    });
  }

  }
