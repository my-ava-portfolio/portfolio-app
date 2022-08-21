import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { LayoutComponent } from '@modules/home/layout/layout.component';

import { ProfilCardComponent } from '@modules/home/profil-card/profil-card.component';

import { GalleryService } from '@services/gallery.service';

import { PipesModule } from '@shared/pipes/pipes.module';

@NgModule({
  declarations: [
    LayoutComponent,
    ProfilCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    FontAwesomeModule,
    PipesModule,
    NgbModule
  ],
  providers: [
    GalleryService
  ]
})
export class HomeModule { }
