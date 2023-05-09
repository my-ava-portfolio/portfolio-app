import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { ItemsModule } from '@shared/modules/items/items.module';
import { StackRoutingModule } from './stack-routing.module';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    StackRoutingModule,
    ItemsModule,
  ]
})
export class StackModule { }
