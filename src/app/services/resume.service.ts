import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiBaseUrl } from '../core/inputs';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  private apiUrl = apiBaseUrl + 'general_resume_data';
  ErrorApiFound: Subject<string> = new Subject<string>();
  resumeData: Subject<any> = new Subject<any>();


  constructor(
      private http: HttpClient
  ) {}

  pullResumeGeneralData(): void {

    this.http.get<any>(this.apiUrl).subscribe(
      (response) => {
        this.resumeData.next(response);
      },
      (response) => {
        // TODO improve error message, but API need improvments
        this.ErrorApiFound.next(response.error.message);
      }
    );
  }

}
