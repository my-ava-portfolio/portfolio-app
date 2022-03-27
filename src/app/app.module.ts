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
import { ColorPickerModule } from 'ngx-color-picker';

import { ResumeService } from '@services/resume.service';
import { GalleryService } from '@services/gallery.service';
import { MapService } from '@services/map.service';
import { SafeUrl, JoinPipe, ReversePipe } from '@shared/pipes';

import { Routes } from '@angular/router';

import { SwipeDirective } from '@directives/swipe.directive';
import { HoverClassDirective } from '@directives/hover-class.directive';
import { ClickClassDirective } from '@directives/click-class.directive';

import { BackgroundComponent } from '@components-shared/map/background.component';
import { NavigationBarComponent } from '@components-shared/navigation-bar/navigation-bar.component';
import { ControlBarComponent } from '@components-shared/control-bar/control-bar.component';

import { MainViewComponent } from '@components/main-view/main-view.component';

import { HomeViewComponent } from '@components/home/home-view/home-view.component';
import { ProfilCardComponent } from '@components/home/profil-card/profil-card.component';
import { ToolboxComponent } from '@components/home/toolbox/toolbox.component';

import { EducationViewComponent } from '@components/education/education-view/education-view.component';
import { DegreesBarComponent } from '@components/education/degrees-bar/degrees-bar.component';
import { TrainingsBarComponent } from '@components/education/trainings-bar/trainings-bar.component';

import { RightbarSkillsComponent } from '@components/experiences/rightbar-skills/rightbar-skills.component';
import { GraphBarComponent } from '@components/experiences/graph-bar/graph-bar.component';
import { ProfilBarComponent } from '@components/experiences/profil-bar/profil-bar.component';
import { ActivityBarComponent } from '@components/experiences/activity-bar/activity-bar.component';
import { ExperiencesViewComponent } from '@components/experiences/experiences-view/experiences-view.component';

import { MapViewComponent } from '@components/map/map-view/map-view.component';
import { ThemeLegendComponent } from '@components/map/theme-legend/theme-legend.component';
import { TimeLegendComponent } from '@components/map/time-legend/time-legend.component';

import { GalleryViewComponent } from '@components/gallery/gallery-view/gallery-view.component';
import { NotesViewComponent } from './components/notes/notes-view/notes-view.component';

// import { ShortViewComponent } from './resume/short-view/short-view.component';


const appRoutes: Routes = [

  // Site routes sharing main-view component layout
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'home', component: HomeViewComponent, children: [
          { path: 'about_me', component: ProfilCardComponent, data: { title: 'Bienvenue', page: 'about_me' } },
          { path: 'sandbox', component: ToolboxComponent, data: { title: 'Bac à sable', page: 'sandbox' } }
        ]
      },
      { path: 'experiences', component: ExperiencesViewComponent, data: { title: 'Expériences', page: 'experiences' } },
      { path: 'education', component: EducationViewComponent, data: { title: 'Formation', page: 'education' } },
      { path: 'map', component: MapViewComponent, data: { title: 'Carte des activités', page: 'map' } },
      { path: 'gallery', component: GalleryViewComponent, data: { title: 'Galerie', page: 'gallery' } },
      { path: 'blog', component: NotesViewComponent, data: { title: 'Blog', page: 'blog' } },
      { path: '', redirectTo: '/home/about_me', pathMatch: 'full' }, // in order to redirect to the home page if the main url is called
    ]
  },

  // no layout routes
  // { path: 'map', component: MapViewComponent, pathMatch: 'full'  },
  // { path: 'short_resume', component: ShortViewComponent, data: { title: 'Profil', page: 'short_resume' } },
  // { path: 'home', component: HomeViewComponent, data: { title: 'Amaury Valorge Portfolio' } },
];

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    HomeViewComponent,
    GalleryViewComponent,
    NotesViewComponent,
    RightbarSkillsComponent,
    SafeUrl,
    JoinPipe,
    ReversePipe,
    // ShortViewComponent,
    MainViewComponent,
    BackgroundComponent,
    MapViewComponent,
    ThemeLegendComponent,
    TimeLegendComponent,
    ProfilBarComponent,
    NavigationBarComponent,
    ControlBarComponent,
    SwipeDirective,
    HoverClassDirective,
    ClickClassDirective,
    GraphBarComponent,
    ActivityBarComponent,
    EducationViewComponent,
    DegreesBarComponent,
    TrainingsBarComponent,
    ExperiencesViewComponent,
    ProfilCardComponent,
    ToolboxComponent,
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
    FormsModule,
    ColorPickerModule
  ],
  providers: [
    ResumeService,
    GalleryService,
    MapService,
    {provide: LOCALE_ID, useValue: 'fr'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
