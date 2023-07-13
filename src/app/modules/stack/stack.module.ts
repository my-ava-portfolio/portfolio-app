import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutComponent } from './layout/layout.component';
import { StackRoutingModule } from './stack-routing.module';
import { CardContainerComponent } from '@shared/modules/card-container/card-container.component';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    StackRoutingModule,
    CardContainerComponent
  ]
})
export class StackModule { }
