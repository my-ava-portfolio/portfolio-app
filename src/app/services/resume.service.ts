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


  /////
  private apiUrlResumeData = apiUrl + 'resume_static_data';
  resumeData: Subject<any> = new Subject<any>();
  private apiUrlContactData = apiUrl + 'contact_data';
  contactData: Subject<any> = new Subject<any>();
  // private apiUrlGeneralData = apiUrl + 'general_data';
  // generalData: Subject<any> = new Subject<any>();
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

    this.http.get<any>(`${this.languagesRoute}`).subscribe({
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

  queryActivitiesFromApi(activityType: string): void {

    this.http.get<any>(`${this.acitvitiesRoute}/${activityType}`).subscribe({
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

  pullFullSkillsData(): void {
    // not used

    this.http.get<any>(`${this.apiUrlFullSkillsData}`).subscribe({
      complete: () => {
      },
      error: error => {
        // TODO improve error message, but API need improvments
        this.ErrorResumeDataApiFound.next(error.error.message);
      },
      next: response => {
        // is null only if query return a 204 error (empty result)
        if (response !== null) {
          this.fullSkillsData.next(response);
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
