import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './layout/layout.component';

import { GeoinfoComponent } from '@modules/map-sandbox/geoinfo/geoinfo.component';

import { LayerManagerComponent } from '@modules/map-sandbox/layer-manager/layer-manager.component';
import { LayerComponent } from '@modules/map-sandbox/layer-components/layer/layer.component';
import { FeatureComponent } from '@modules/map-sandbox/layer-components/feature/feature.component';
import { EditBarComponent } from '@modules/map-sandbox/edit-bar/edit-bar.component';

import { DirectivesModule } from '@shared/directives/directives.module';


@NgModule({
  declarations: [
    LayoutComponent,
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
    NgbModule,
    FormsModule,
    DirectivesModule
  ],
})
export class MapSandboxModule { }
