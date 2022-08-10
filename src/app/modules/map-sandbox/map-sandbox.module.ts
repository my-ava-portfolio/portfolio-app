import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ColorPickerModule } from 'ngx-color-picker';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToolboxComponent } from './toolbox/toolbox.component';

import { GeoinfoComponent } from '@modules/map-sandbox/geoinfo/geoinfo.component';

import { LayerManagerComponent } from './layer-manager/layer-manager.component';
import { LayerComponent } from '@modules/map-sandbox/layers_components/layer/layer.component';
import { FeatureComponent } from '@modules/map-sandbox/layers_components/feature/feature.component';
import { EditBarComponent } from './edit-bar/edit-bar.component';


@NgModule({
  declarations: [
    ToolboxComponent,
    LayerComponent,
    FeatureComponent,
    GeoinfoComponent,
    LayerManagerComponent,
    EditBarComponent
  ],
  imports: [
    CommonModule,
    MapSandboxRoutingModule,
    FontAwesomeModule,
    ColorPickerModule,
    NgbModule,
    FormsModule
  ],
})
export class MapSandboxModule { }
