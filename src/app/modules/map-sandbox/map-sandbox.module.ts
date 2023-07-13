import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MapSandboxRoutingModule } from '@modules/map-sandbox/map-sandbox-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './layout/layout.component';

import { GeoToolsComponent } from './geo-tools/geo-tools.component';

import { ToolbarComponent } from './toolbar/toolbar.component';
import { LayerComponent } from '@modules/map-sandbox/layer-components/layer/layer.component';
import { FeatureComponent } from '@modules/map-sandbox/layer-components/feature/feature.component';
import { EditBarComponent } from '@modules/map-sandbox/edit-bar/edit-bar.component';

import { DirectivesModule } from '@shared/directives/directives.module';
import { CreateToolsComponent } from './create-tools/create-tools.component';
import { ImportToolsComponent } from './import-tools/import-tools.component';
import { FormsModule } from '@angular/forms';
import { LayerLegendComponent } from './layer-legend/layer-legend.component';
import { PathToolsComponent } from './path-tools/path-tools.component';
import { ItemsModule } from '@shared/modules/items/items.module';
import { LayerSettingsComponent } from './layer-components/layer/layer-settings/layer-settings.component';
import { LayerTableComponent } from './layer-components/layer/layer-table/layer-table.component';
import { WidgetColorComponent } from './shared/components/widget-color/widget-color.component';
import { WidgetTableComponent } from './shared/components/widget-table/widget-table.component';
import { GeomIconsComponent } from './shared/components/geom-icons/geom-icons.component';


@NgModule({
  declarations: [
    LayoutComponent,
    LayerComponent,
    FeatureComponent,
    GeoToolsComponent,
    ToolbarComponent,
    EditBarComponent,
    CreateToolsComponent,
    ImportToolsComponent,
    LayerLegendComponent,
    PathToolsComponent,
    LayerSettingsComponent,
    LayerTableComponent,
  ],
  imports: [
    CommonModule,
    MapSandboxRoutingModule,
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    DirectivesModule,
    ItemsModule,
    GeomIconsComponent,
    WidgetColorComponent,
    WidgetTableComponent,
  ],
})
export class MapSandboxModule { }
