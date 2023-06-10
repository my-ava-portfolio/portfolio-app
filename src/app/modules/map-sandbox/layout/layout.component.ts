import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import { Subscription } from 'rxjs/internal/Subscription';
import { InteractionsService } from '../shared/service/interactions.service';
import { layerHandler } from '../shared/layer-handler/layer-handler';
import { epsg3857, epsg4326, toolsTypes } from '../shared/data-types';
import { geoIcon, horizontalOrientation, layersIcon, leftSideIcon, pathIcon, rightSideIcon, verticalOrientation } from '../shared/icons';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  currentEpsg!: string;
  currentLayers!: layerHandler[];

  // used by menus
  epsgAvailable = [epsg4326, epsg3857];

  // icons
  geoIcon = geoIcon;
  pathIcon = pathIcon;

  leftSideIcon = leftSideIcon;
  rightSideIcon = rightSideIcon;
  layersIcon = layersIcon;
  horizontalOrientation = horizontalOrientation;
  verticalOrientation = verticalOrientation;

  private _isEditMode!: boolean;
  private _sandBoxMode!: string;
  isLegendRow: boolean = true;

  toolsMode: toolsTypes = 'importTools';

  layerIdSelected: string | null = null;

  mapSubscription!: Subscription;
  allLayersSubscription!: Subscription;
  layerIdSelectedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private interactionsService: InteractionsService,
  ) {

    // Get the map container, view and epsg
    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.currentEpsg = map.getView().getProjection().getCode();
      }
    );

    this.allLayersSubscription = this.interactionsService.allLayers.subscribe(
      (allLayers: layerHandler[]) => {
        this.currentLayers = allLayers
      }
    )

    this.layerIdSelectedSubscription = this.interactionsService.layerIdSelected.subscribe(
      (layerIdSelected: string | null) => {
        this.layerIdSelected = layerIdSelected
      }
    )
   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true);
    this.mapService.getMap();
    this.editMode = true;
  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.allLayersSubscription.unsubscribe();
    this.layerIdSelectedSubscription.unsubscribe();

    this.mapService.changeMapInteractionStatus(false);
    this.mapService.resetMapView();

    this.mapService.changeBackgroundLayer('stamen');
    this.hideBackgroundMapSwitcher();

  }

  set editMode(status: boolean) {
    this._isEditMode = status
    if (this._isEditMode) {
      this._sandBoxMode = 'Mode édition'
      this.displayBackgroundMapSwitcher();
    } else {
      this._sandBoxMode = 'Mode carte'
      this.hideBackgroundMapSwitcher();
    }
  }

  get editMode(): boolean {
    return this._isEditMode
  }

  get mode(): string {
    return this._sandBoxMode
  }

  changeLegendShape(): void {
    this.isLegendRow = !this.isLegendRow
  }

  displayBackgroundMapSwitcher(): void {
    this.mapService.enableBackgroundLayer(true)
  }

  hideBackgroundMapSwitcher(): void {
    this.mapService.enableBackgroundLayer(false)
  }

  private sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
  }

  showHideEditMode(): void {
    this.editMode = !this.editMode;
    // this.unSelectLayer()
  }

  unSelectLayer(): void {
    this.interactionsService.sendSelectedLayerId(null)
  }

}

