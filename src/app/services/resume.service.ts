import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { apiUrl } from '@core/global-values/main';


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
  private acitvitiesCountRoute = apiUrl + 'activities/count';
  activitiesCountDataSubject: Subject<any> = new Subject<any>();

  private publicationsRoute = apiUrl + 'publications';
  publicationsDataSubject: Subject<any> = new Subject<any>();

  private trainingsRoute = apiUrl + 'trainings/';
  trainingsDataSubject: Subject<any> = new Subject<any>();

  private graphRoute = apiUrl + 'graph/'
  graphDataSubject: Subject<any> = new Subject<any>();
  private validityRangeActivitisJobRoute = apiUrl + 'activities/job/validity_range'
  validityRangeActivitisJobDataSubject: Subject<any> = new Subject<any>();

  /////
  private apiUrlResumeData = apiUrl + 'resume_static_data';
  resumeData: Subject<any> = new Subject<any>();
  private apiUrlContactData = apiUrl + 'contact_data';
  contactData: Subject<any> = new Subject<any>();

  private apiUrlFullSkillsData = apiUrl + 'full_skills_data';
  fullSkillsData: Subject<any> = new Subject<any>();

  private apiUrlGraphData = apiUrl + 'activities_graph_data?';
  errorActivitiesChartApiFound: Subject<string> = new Subject<string>();
  ActivitiesChartData: Subject<any> = new Subject<any>();

  // deprecated
  private apiUrlSkillsFilteredData = apiUrl + 'skills_filtered?';
  errorUrlSkillsFilteredApiFound: Subject<string> = new Subject<string>();
  skillsFilteredData: Subject<any> = new Subject<any>();

  private apiUrlActivitiesFilteredData = apiUrl + 'activities_filtered?';
  errorUrlActivitiesFilteredApiFound: Subject<string> = new Subject<string>();
  activitiesFilteredData: Subject<any> = new Subject<any>();

  activityId: Subject<string> = new Subject<string>();

  // activitiesAvailable: Subject<any> = new Subject<any>();


  constructor(
      private http: HttpClient
  ) {}

  // pullActivitiesAvailable(activities: any[]): void {
  //   this.activitiesAvailable.next(activities);
  // }

  pullActivityIdToPreselectNodeGraph(activityId: string): void {
    this.activityId.next(activityId);
  }

  pullResumeGeneralData(): void {

    this.http.get<any>(this.apiUrlResumeData).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.resumeData.next(response);
        }
      },
    });
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

  queryActivitiesCountFromApi(date: number): void {
    this.http.get<any>(`${this.acitvitiesCountRoute}/${date}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.activitiesCountDataSubject.next(response);
        }
      },
    });
  }

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

  

  pullActivitiesGraphData(
    isTechnics: boolean | string,
    isThemes: boolean | string,
    isTools: boolean | string,
    currentDateValue: number,
    grouperProjects: boolean | string,
    grouperJobs: boolean | string,
    grouperVolunteers: boolean | string,
  ): void {
    this.http.get<any>(
      `${this.apiUrlGraphData}technics=${isTechnics}&themes=${isThemes}&tools=${isTools}&start_date=${currentDateValue}&group_projects=${grouperProjects}&group_jobs=${grouperJobs}&group_volunteers=${grouperVolunteers}`
    ).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.errorActivitiesChartApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.ActivitiesChartData.next(response);
        }
      },
    });
  }

  pullActivitiesResumeFromGraph( // TODO RENAME IT
    currentDate: number,
    isThemes: boolean | string,
    isTechnics: boolean | string,
    isTools: boolean | string,
    fromSkill: string | null,
  ): void {
    this.http.get<any>(
      `${this.apiUrlActivitiesFilteredData}start_date=${currentDate}&technics=${isTechnics}&themes=${isThemes}&tools=${isTools}&from_feature=${fromSkill}`
    ).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.errorUrlActivitiesFilteredApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.activitiesFilteredData.next(response);
        }
      },
    });
  }

}
