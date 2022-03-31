import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResumeService } from '@services/resume.service';
import { GalleryService } from '@services/gallery.service';
import { MapService } from '@services/map.service';


import { SwipeDirective } from '@shared/directives/swipe.directive';
import { HoverClassDirective } from '@shared/directives/hover-class.directive';
import { ClickClassDirective } from '@shared/directives/click-class.directive';

import { BackgroundComponent } from '@shared/components/background-map/background.component';
import { NavigationBarComponent } from '@shared/components/navigation-bar/navigation-bar.component';
import { ControlBarComponent } from '@shared/components/control-bar/control-bar.component';

import { LayoutComponent } from '@shared/components/layout/layout.component';


registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BackgroundComponent,
    NavigationBarComponent,
    ControlBarComponent,
    SwipeDirective,
    HoverClassDirective,
    ClickClassDirective,
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
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
