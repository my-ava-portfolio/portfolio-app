import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from './services/api.service';
import { ResumeService } from './services/resume.service';
import { GalleryService } from './services/gallery.service';
import { MapService } from './services/map.service';
import { SafeUrl, JoinPipe, ReversePipe } from './core/pipes';

import { Routes } from '@angular/router';

import { HomeViewComponent } from './home-view/home-view.component';

import { GalleryViewComponent } from './gallery/gallery-view/gallery-view.component';

import { NotesViewComponent } from './notes/notes-view/notes-view.component';

import { MainViewComponent } from './main-view/main-view.component';
import { ResumeViewComponent } from './resume/resume-view/resume-view.component';
import { CenterBarNavigationComponent } from './resume/centerbar-navigation/centerbar-navigation.component';
import { TopbarSubviewComponent } from './resume/topbar-subview/topbar-subview.component';
import { LeftbarSubviewComponent } from './resume/leftbar-subview/leftbar-subview.component';
import { CenterbarJobsComponent } from './resume/centerbar-jobs/centerbar-jobs.component';
import { CenterbarProjectsComponent } from './resume/centerbar-projects/centerbar-projects.component';
import { CenterbarPublicationsComponent } from './resume/centerbar-publications/centerbar-publications.component';
import { CenterbarVolunteerComponent } from './resume/centerbar-volunteer/centerbar-volunteer.component';
import { CenterbarPresentationComponent } from './resume/centerbar-presentation/centerbar-presentation.component';
import { RightbarSkillsComponent } from './resume/rightbar-skills/rightbar-skills.component';


import { ShortViewComponent } from './resume/short-view/short-view.component';

import { MapViewComponent } from './map/map-view/map-view.component';
import { ThemeLegendComponent } from './map/theme-legend/theme-legend.component';

import { BackgroundComponent } from './background/map/background.component';
import { FooterComponent } from './background/footer/footer.component';
import { HeaderComponent } from './background/header/header.component';
import { VerticalBarComponent } from './background/vertical-bar/vertical-bar.component';

import { TimeLegendComponent } from './map/time-legend/time-legend.component';


const appRoutes: Routes = [

  // Site routes sharing main-view component layout
  {
    path: '',
    component: MainViewComponent,
    children: [
      { path: 'resume', component: ResumeViewComponent, data: { title: 'Profil', page: 'profil' } },
      { path: 'map', component: MapViewComponent, data: { title: 'Carte des activités', page: 'map' } },
      { path: 'gallery', component: GalleryViewComponent, data: { title: 'Galerie', page: 'gallery' } },
      { path: 'blog', component: NotesViewComponent, data: { title: 'Blog', page: 'blog' } },
      { path: '', redirectTo: '/resume', pathMatch: 'full' }, // in order to redirect to the home page if the main url is called
    ]
  },

  // no layout routes
  // { path: 'map', component: MapViewComponent, pathMatch: 'full'  },
  { path: 'short_resume', component: ShortViewComponent, data: { title: 'Profil', page: 'short_resume' } },
  // { path: 'home', component: HomeViewComponent, data: { title: 'Accueil - Amaury Valorge Portfolio' } },
];

registerLocaleData(localeFr);

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
    ReversePipe,
    ShortViewComponent,
    MainViewComponent,
    BackgroundComponent,
    MapViewComponent,
    FooterComponent,
    HeaderComponent,
    VerticalBarComponent,
    ThemeLegendComponent,
    TimeLegendComponent,
    CenterbarVolunteerComponent,
    CenterbarPresentationComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      scrollOffset: [0, 64], // [x, y]
      useHash: true, // in order to prevent error 40 page on reload
    }),
    NgbModule,
    FormsModule
  ],
  providers: [
    ApiService,
    ResumeService,
    GalleryService,
    MapService,
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
