import { Injectable } from '@angular/core';
import { catchError, defaultIfEmpty, forkJoin, Observable, of, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '@core/global-values/main';
import { query } from '@angular/animations';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {

  ErrorResumeDataApiFound: Subject<string> = new Subject<string>();

  private userInfoRoute = apiUrl + 'user/info';
  userInfoDataSubject: Subject<any> = new Subject<any>();

  private userContactRoute = apiUrl + 'user/contact';
  userContactDataSubject: Subject<any> = new Subject<any>();

  private languagesRoute = apiUrl + 'languages';
  languagesDataSubject: Subject<any> = new Subject<any>();

  private acitvitiesRoute = apiUrl + 'activities';
  activitiesDataSubject: Subject<any> = new Subject<any>();
  private acitvitiesJobDurationRoute = apiUrl + 'activities/job/duration';
  activitiesJobDurationDataSubject: Subject<any> = new Subject<any>();
  profesionalActivitiesDataSubject: Subject<any> = new Subject<any>();
  
  private skillsRoute = apiUrl + 'skills';
  profesionalSkillsDataSubject: Subject<any> = new Subject<any>();


  private publicationsRoute = apiUrl + 'publications';
  publicationsDataSubject: Subject<any> = new Subject<any>();

  private trainingsRoute = apiUrl + 'trainings/';
  trainingsDataSubject: Subject<any> = new Subject<any>();

  private graphRoute = apiUrl + 'graph/'
  graphDataSubject: Subject<any> = new Subject<any>();
  private validityRangeActivitisJobRoute = apiUrl + 'activities/job/validity_range'
  validityRangeActivitisJobDataSubject: Subject<any> = new Subject<any>();

  activityId: Subject<string> = new Subject<string>();

  constructor(
      private http: HttpClient
  ) {}


  pullActivityIdToPreselectNodeGraph(activityId: string): void {
    this.activityId.next(activityId);
  }

  queryLanguagesFromApi(): void {
    console.log(this.languagesRoute)
    this.http.get<any>(`${this.languagesRoute}/`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.languagesDataSubject.next(response);
        }
      },
    });
  }

  queryUserInfoFromApi(): void {
    this.http.get<any>(`${this.userInfoRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.userInfoDataSubject.next(response);
        }
      },
    });
  }

  queryUserContactFromApi(): void {
    this.http.get<any>(`${this.userContactRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.userContactDataSubject.next(response);
        }
      },
    });
  }

  queryActivitiesFromApi(activityType: string, parameters: any = null): void {
    this.http.get<any>(
      `${this.acitvitiesRoute}/${activityType}`,
      {params: parameters}
    ).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.activitiesDataSubject.next(response);
        }
      },
    });
  }

  queryProfesionalActivitiesFromApi(parameters: any): void {
    let jobQuery = this.http.get<any>(`${this.acitvitiesRoute}/job`, { params: parameters["job"] }).pipe(catchError(() => of([])))
    let personalProjectQuery = this.http.get<any>(`${this.acitvitiesRoute}/personal-project`, {params: parameters["personal-project"]}).pipe(catchError(() => of([])))
    let volunteerQuery = this.http.get<any>(`${this.acitvitiesRoute}/volunteer`, {params: parameters["volunteer"]}).pipe(catchError(() => of([])))

    forkJoin([jobQuery, personalProjectQuery, volunteerQuery]).subscribe(
      {
        complete: () => {
        },
        error: error => {
          // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
        },
        next: response => {
          // is null only if query return a 204 error (empty result)
          if (response !== null) {
            const outputData = {
              "job": response[0],
              "personal-project": response[1],
              "volunteer": response[2]
            }
            this.profesionalActivitiesDataSubject.next(outputData);
          }
        },
      }
    );
  }

  queryProfesionalSkillsFromApi(parameters: any): void {
    let jobQuery = this.http.get<any>(`${this.skillsRoute}/job`, { params: parameters["job"] }).pipe(catchError(() => of([])))
    let personalProjectQuery = this.http.get<any>(`${this.skillsRoute}/personal-project`, {params: parameters["personal-project"]}).pipe(catchError(() => of([])))
    let volunteerQuery = this.http.get<any>(`${this.skillsRoute}/volunteer`, {params: parameters["volunteer"]}).pipe(catchError(() => of([])))

    forkJoin([jobQuery, personalProjectQuery, volunteerQuery]).subscribe(
      {
        complete: () => {
        },
        error: error => {
          // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
        },
        next: response => {
          // is null only if query return a 204 error (empty result)
          if (response !== null) {
            const outputData = {
              "job": response[0],
              "personal-project": response[1],
              "volunteer": response[2]
            }
            this.profesionalSkillsDataSubject.next(outputData);
          }
        },
      }
    );
  }

  queryActivitiesJobDurationFromApi(): void {
    this.http.get<any>(`${this.acitvitiesJobDurationRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.activitiesJobDurationDataSubject.next(response);
        }
      },
    });
  }

  // queryActivitiesCountFromApi(date: number): void {
  //   this.http.get<any>(`${this.acitvitiesCountRoute}/${date}`).subscribe({
  //     complete: () => {
  //     },
  //     error: error => {
  //       // TODO improve error message, but API need improvments
  //       this.ErrorResumeDataApiFound.next(error.error.message);
  //     },
  //     next: response => {
  //       // is null only if query return a 204 error (empty result)
  //       if (response !== null) {
  //         this.activitiesCountDataSubject.next(response);
  //       }
  //     },
  //   });
  // }

  queryPublicationsFromApi(activityType: string): void {
    this.http.get<any>(`${this.publicationsRoute}/${activityType}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.publicationsDataSubject.next(response);
        }
      },
    });
  }
  
  queryTrainingsFromApi(): void {
    this.http.get<any>(this.trainingsRoute).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.trainingsDataSubject.next(response);
        }
      },
    });
  }

  queryGraphFromApi(queryParams: any): void {
    this.http.get<any>(
      this.graphRoute,
      {params: queryParams}
    ).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.graphDataSubject.next(response);
        }
      },
    });
  }

  queryValidityRangeActivitisJobRouteFromApi(): void {
    this.http.get<any>(this.validityRangeActivitisJobRoute).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.validityRangeActivitisJobDataSubject.next(response);
        }
      },
    });
  }

}
