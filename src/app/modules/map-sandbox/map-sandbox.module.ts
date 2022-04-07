import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { ToolboxComponent } from '@modules/map-sandbox/toolbox/toolbox.component';



@NgModule({
  declarations: [
    ToolboxComponent
  ],
  imports: [
    CommonModule,
    MapSandboxRoutingModule,
    FontAwesomeModule,
    ColorPickerModule
  ]
})
export class MapSandboxModule { }
