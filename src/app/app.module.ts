import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { HomeViewComponent } from './home-view/home-view.component';
import { ResumeViewComponent } from './resume/resume-view/resume-view.component';
import { GalleryViewComponent } from './gallery/gallery-view/gallery-view.component';
import { NotesViewComponent } from './notes/notes-view/notes-view.component';

import { ResumeService } from './services/resume.service';
import { GalleryService } from './services/gallery.service';
import { SafeUrl, JoinPipe } from './core/pipes';

import { Routes } from '@angular/router';
import { CenterBarNavigationComponent } from './resume/centerbar-navigation/centerbar-navigation.component';
import { TopbarSubviewComponent } from './resume/topbar-subview/topbar-subview.component';
import { LeftbarSubviewComponent } from './resume/leftbar-subview/leftbar-subview.component';
import { CenterbarJobsComponent } from './resume/centerbar-jobs/centerbar-jobs.component';
import { CenterbarProjectsComponent } from './resume/centerbar-projects/centerbar-projects.component';
import { CenterbarPublicationsComponent } from './resume/centerbar-publications/centerbar-publications.component';
import { RightbarSkillsComponent } from './resume/rightbar-skills/rightbar-skills.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShortViewComponent } from './resume/short-view/short-view.component';
import { MainViewComponent } from './main-view/main-view.component';
import { BackgroundComponent } from './background-view/map/background.component';
import { ThemeLegendComponent } from './map/theme-legend/theme-legend.component';
import { MapViewComponent } from './map/map-view/map-view.component';


const appRoutes: Routes = [

  // Site routes sharing main-view component layout
  {
      path: '',
      component: MainViewComponent,
      children: [
        { path: 'resume', component: ResumeViewComponent },
        { path: 'gallery', component: GalleryViewComponent },
        { path: 'notes', component: NotesViewComponent },
        { path: '', redirectTo: '/home', pathMatch: 'full' }, // in order to redirect to the home page if the main url is called
      ]
  },

  // no layout routes
  { path: 'map', component: MapViewComponent },
  { path: 'short_resume', component: ShortViewComponent },
  { path: 'home', component: HomeViewComponent },
];



@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    ResumeViewComponent,
    GalleryViewComponent,
    NotesViewComponent,
    CenterBarNavigationComponent,
    TopbarSubviewComponent,
    LeftbarSubviewComponent,
    CenterbarJobsComponent,
    CenterbarProjectsComponent,
    CenterbarPublicationsComponent,
    RightbarSkillsComponent,
    SafeUrl,
    JoinPipe,
    ShortViewComponent,
    MainViewComponent,
    BackgroundComponent,
    ThemeLegendComponent,
    MapViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64] // [x, y]
    }),
    NgbModule
  ],
  providers: [
    ResumeService,
    GalleryService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
