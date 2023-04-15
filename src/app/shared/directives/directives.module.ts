import { NgModule } from '@angular/core';

import { FluidHeightDirective } from './fluid-height.directive';

@NgModule({
  imports: [],
    declarations: [
        FluidHeightDirective
    ],
  exports: [FluidHeightDirective]
})
export class DirectivesModule { }