import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { MapViewComponent } from '@modules/map-sandbox/map-view/map-view.component';
import { LayerComponent } from './layer/layer.component';
import { FeatureComponent } from './feature/feature.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GeoinfoComponent } from './geoinfo/geoinfo.component';



@NgModule({
  declarations: [
    MapViewComponent,
    LayerComponent,
    FeatureComponent,
    GeoinfoComponent
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
