import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '@core/inputs';


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
        // TODO improve error message, but API need improvments
        this.ErrorTopicsDataApiFound.next(error.error.message);
      },
      next: response => {
        this.topicsData.next(response);
      },
    });
  }

  pullNotesData(path: string): void {
    this.http.get<any>(`${this.apiUrlNotesData}notes${path}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorTopicsDataApiFound.next(error.error.message);
      },
      next: response => {
        this.topicData.next(response);
      },
    });

  }
}
