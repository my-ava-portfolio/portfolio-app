import { NgModule } from '@angular/core';

import { FluidHeightDirective } from './fluid-height.directive';
import { DivToBodyDirective } from './div-to-body.directive';

@NgModule({
  imports: [],
    declarations: [
      FluidHeightDirective,
    DivToBodyDirective
  ],
  exports: [
    FluidHeightDirective,
    DivToBodyDirective
  ]
})
export class DirectivesModule { }