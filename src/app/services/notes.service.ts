import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '@core/inputs';


@Injectable({
  providedIn: 'root'
})
export class NotesService {

  private apiUrlNotesData = apiUrl + 'notes';
  ErrorNotesDataApiFound: Subject<string> = new Subject<string>();
  notesData: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {  }

  pullNotesData(path: string): void {
    this.http.get<any>(`${this.apiUrlNotesData}${path}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorNotesDataApiFound.next(error.error.message);
      },
      next: response => {
        this.notesData.next(response);
      },
    });
  }

}
