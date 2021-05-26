import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiCoreUrl } from '../core/inputs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `${apiCoreUrl}health`;
  apiHealth: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  callApiStatus(): void {

    // add timeout to return an error...
    this.http.get<any>(this.apiUrl).pipe(timeout(500)).subscribe({
      next: (response) => {
        this.apiHealth.next(response.status);
      },
     error: (err) => {
        this.apiHealth.next('Starting...');
      }
    });
  }
}
