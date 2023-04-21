import { NgModule } from '@angular/core';

import { FluidHeightDirective } from './fluid-height.directive';
import { DivToBodyDirective } from './div-to-body.directive';
import { MoveDivDirective } from './move-div.directive';

@NgModule({
  imports: [],
    declarations: [
      FluidHeightDirective,
      DivToBodyDirective,
      MoveDivDirective
    ],
  exports: [
    FluidHeightDirective,
    DivToBodyDirective,
    MoveDivDirective
  ]
})
export class DirectivesModule { }