import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeViewComponent } from './home/home-view/home-view.component';
import { ResumeViewComponent } from './resume/resume-view/resume-view.component';

import { Routes } from '@angular/router';


const appRoutes: Routes = [
  { path: 'home', component: HomeViewComponent },
  { path: 'resume', component: ResumeViewComponent },
];


@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    ResumeViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
