import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeRoutingModule } from '@modules/home/home-routing.module';

import { LayoutComponent } from '@modules/home/layout/layout.component';
import { SummaryComponent } from './summary/summary.component';
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
    HomeRoutingModule,
    NgbModule,
    ItemsModule
  ],
  providers: []
})
export class HomeModule { }
