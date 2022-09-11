import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { LayoutComponent } from '@modules/home/layout/layout.component';

import { SummaryComponent } from './summary/summary.component';

import { PipesModule } from '@shared/pipes/pipes.module';

import { GeneralInfoComponent } from './general-info/general-info.component';

import { ItemsModule } from '@shared/modules/items/items.module';

@NgModule({
  declarations: [
    LayoutComponent,
    GeneralInfoComponent,
    SummaryComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    PipesModule,
    NgbModule,
    ItemsModule
  ],
  providers: [
  ]
})
export class HomeModule { }
