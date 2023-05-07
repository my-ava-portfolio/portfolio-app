import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private resumeApiUrl = environment.resumeApiUrl
  ErrorTopicsDataApiFound: Subject<string> = new Subject<string>();
  blogData: Subject<any[]> = new Subject<any[]>();

  constructor(
    private http: HttpClient
  ) { }

  queryBlogTopics(): void {

    this.http.get<any>(`${this.resumeApiUrl}blog/`).subscribe({
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
