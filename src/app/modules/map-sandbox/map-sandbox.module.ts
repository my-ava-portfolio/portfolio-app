import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolboxComponent } from './toolbox/toolbox.component';

import { GeoinfoComponent } from '@modules/map-sandbox/geoinfo/geoinfo.component';

import { CreatorComponent } from '@modules/map-sandbox/creator/creator.component';
import { LayerComponent } from '@modules/map-sandbox/creator_components/layer/layer.component';
import { FeatureComponent } from '@modules/map-sandbox/creator_components/feature/feature.component';


@NgModule({
  declarations: [
    ToolboxComponent,
    LayerComponent,
    FeatureComponent,
    GeoinfoComponent,
    CreatorComponent
  ],
  imports: [
    CommonModule,
    MapSandboxRoutingModule,
    FontAwesomeModule,
    ColorPickerModule,
    NgbModule
  ],
})
export class MapSandboxModule { }
