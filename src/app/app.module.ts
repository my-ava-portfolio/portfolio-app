import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { AppRoutingModule, CustomPreloadingStrategy } from './app-routing.module';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ResumeService } from '@services/resume.service';
import { MapService } from '@services/map.service';
import { MainService } from '@services/main.service';


import { SwipeDirective } from '@shared/directives/swipe.directive';
import { HoverClassDirective } from '@shared/directives/hover-class.directive';

import { ItemsModule } from '@shared/modules/items/items.module';
import { DirectivesModule } from '@shared/directives/directives.module';

import { LayoutComponent } from '@bases/layout/layout.component';
import { BackgroundComponent } from '@bases/background-map/background.component';
import { ControlBarComponent } from '@bases/control-bar/control-bar.component';
import { NavigationBarComponent } from '@bases/navigation-bar/navigation-bar.component';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    BackgroundComponent,
    NavigationBarComponent,
    ControlBarComponent,
    SwipeDirective,
    HoverClassDirective
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    ItemsModule,
    DirectivesModule
  ],
  providers: [
    MainService,
    ResumeService,
    MapService,
    CustomPreloadingStrategy,
    {provide: LOCALE_ID, useValue: 'fr-FR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
