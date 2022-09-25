import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '@core/global-values/main';



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrlNotesData = apiUrl;
  ErrorTopicsDataApiFound: Subject<string> = new Subject<string>();
  topicsData: Subject<any[]> = new Subject<any[]>();
  topicData: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  pulltopicsData(): void {

    this.http.get<any>(`${this.apiUrlNotesData}blog_topics`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorTopicsDataApiFound.next(error.message);
      },
      next: response => {
        this.topicsData.next(response);
      },
    });
  }

}
