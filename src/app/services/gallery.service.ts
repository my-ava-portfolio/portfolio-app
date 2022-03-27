import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '@shared/inputs';

@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  private apiUrlActivitiesGallery = apiUrl + 'gallery_activities?';
  ErrorActivitiesGalleryApiFound: Subject<string> = new Subject<string>();
  activitiesGalleryData: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  pullExistingActivitiesGallery(
    activityName: string | null,
    categoryName: string | null,
    typeName: string | null
  ): void {


    this.http.get<any>(`${this.apiUrlActivitiesGallery}activity_name=${activityName}&category_name=${categoryName}&type_name=${typeName}`
    ).subscribe({
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
