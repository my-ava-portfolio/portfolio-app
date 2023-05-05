import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { apiUrl } from '@core/globals/resume-shared-data';



@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrlNotesData = apiUrl;
  ErrorTopicsDataApiFound: Subject<string> = new Subject<string>();
  blogData: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  queryBlogTopics(): void {

    this.http.get<any>(`${this.apiUrlNotesData}blog/`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorTopicsDataApiFound.next(error.message);
      },
      next: response => {
        this.blogData.next(response);
      },
    });
  }

}
