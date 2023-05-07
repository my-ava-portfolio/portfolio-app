import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private portfolioApiUrl = environment.resumeApiUrl

  ErrorResumeDataApiFound: Subject<string> = new Subject<string>();

  private userInfoRoute = this.portfolioApiUrl + 'user/info';
  userInfoDataSubject: Subject<any> = new Subject<any>();

  private userContactRoute = this.portfolioApiUrl + 'user/contact';
  userContactDataSubject: Subject<any> = new Subject<any>();

  private languagesRoute = this.portfolioApiUrl + 'languages';
  languagesDataSubject: Subject<any> = new Subject<any>();

  private acitvitiesRoute = this.portfolioApiUrl + 'activities';
  activitiesDataSubject: Subject<any> = new Subject<any>();
  private activitiesJobDurationRoute = this.portfolioApiUrl + 'activities/job/duration';
  activitiesJobDurationDataSubject: Subject<any> = new Subject<any>();
  profesionalActivitiesDataSubject: Subject<any> = new Subject<any>();

  private skillsRoute = this.portfolioApiUrl + 'skills';
  skillsDataSubject: Subject<any> = new Subject<any>();

  private publicationsRoute = this.portfolioApiUrl + 'publications';
  publicationsDataSubject: Subject<any> = new Subject<any>();

  private trainingsRoute = this.portfolioApiUrl + 'trainings/';
  trainingsDataSubject: Subject<any> = new Subject<any>();

  private graphRoute = this.portfolioApiUrl + 'graph/'
  graphDataSubject: Subject<any> = new Subject<any>();
  private validityRangeActivitisJobRoute = this.portfolioApiUrl + 'activities/job/validity_range'
  validityRangeActivitisJobDataSubject: Subject<any> = new Subject<any>();

  activityId: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {}


  pullActivityIdToPreselectNodeGraph(activityId: string): void {
    this.activityId.next(activityId);
  }

  queryLanguagesFromApi(): void {
    this.http.get<any>(`${this.languagesRoute}/`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.languagesDataSubject.next(response);
      },
    });
  }

  queryUserInfoFromApi(): void {
    this.http.get<any>(`${this.userInfoRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.userInfoDataSubject.next(response);
      },
    });
  }

  queryUserContactFromApi(): void {
    this.http.get<any>(`${this.userContactRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.userContactDataSubject.next(response);
      },
    });
  }

  queryActivitiesFromApi(activityType: string, parameters: any = null): void {
    this.http.get<any>(
      `${this.acitvitiesRoute}/${activityType}`, {params: parameters}
    ).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.activitiesDataSubject.next(response);
      },
    });
  }

  queryProfesionalActivitiesFromApi(parameters: any): void {

    const queries = {
      "job": this.http.get<any>(`${this.acitvitiesRoute}/job`, { params: parameters["job"] }),
      "personal-project": this.http.get<any>(`${this.acitvitiesRoute}/personal-project`, {params: parameters["personal-project"]}),
      "volunteer": this.http.get<any>(`${this.acitvitiesRoute}/volunteer`, {params: parameters["volunteer"]})
    }

    forkJoin(queries).subscribe(
      {
        complete: () => {
        },
        error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
        },
        next: response => {
          this.profesionalActivitiesDataSubject.next(response);
        },
      }
    );
  }

  queryProfesionalSkillsFromApi(parameters: any): void {

    const queries = {
      "job": this.http.get<any>(`${this.skillsRoute}/job`, { params: parameters["job"] }),
      "personal-project": this.http.get<any>(`${this.skillsRoute}/personal-project`, {params: parameters["personal-project"]}),
      "volunteer": this.http.get<any>(`${this.skillsRoute}/volunteer`, {params: parameters["volunteer"]})
    }
    forkJoin(queries).subscribe({
        complete: () => {
        },
        error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
        },
        next: response => {
          this.skillsDataSubject.next(response);
        },
      }
    );
  }

  queryFullSkillsFromApi(parameters: any): void {
    this.http.get<any>(`${this.skillsRoute}/`, { params: parameters }).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.skillsDataSubject.next(response);
      },
    });
  }

  queryActivitiesJobDurationFromApi(): void {
    this.http.get<any>(`${this.activitiesJobDurationRoute}`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.activitiesJobDurationDataSubject.next(response);
       },
    });
  }

  queryPublicationsFromApi(activityType: string): void {
    this.http.get<any>(`${this.publicationsRoute}/${activityType}`).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.publicationsDataSubject.next(response);
      },
    });
  }

  queryTrainingsFromApi(): void {
    this.http.get<any>(this.trainingsRoute).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.trainingsDataSubject.next(response);
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
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.graphDataSubject.next(response);
      },
    });
  }

  queryValidityRangeActivitisJobRouteFromApi(): void {
    this.http.get<any>(this.validityRangeActivitisJobRoute).subscribe({
      complete: () => {
      },
      error: error => {
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        this.validityRangeActivitisJobDataSubject.next(response);
      },
    });
  }

}
