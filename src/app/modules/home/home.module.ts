import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';
import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { HomeViewComponent } from '@modules/home/home-view/home-view.component';
import { ProfilCardComponent } from '@modules/home/profil-card/profil-card.component';


@NgModule({
  declarations: [
    HomeViewComponent,
    ProfilCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    FontAwesomeModule,
    ColorPickerModule
  ]
})
export class HomeModule { }
