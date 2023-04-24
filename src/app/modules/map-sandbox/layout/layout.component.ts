import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import { faGlobe, faLayerGroup, faAnglesLeft, faAnglesRight, faRoad } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs/internal/Subscription';
import View from 'ol/View';
import { InteractionsService } from '../shared/service/interactions.service';
import { layerHandler } from '../shared/layer-handler/layer-handler';
import { toolsTypes } from '../shared/data-types';

@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  currentEpsg!: string;
  currentLayers!: layerHandler[];
  
  // used by menus
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];

  // icons
  geoIcon = faGlobe;
  pathIcon = faRoad;

  leftSideIcon = faAnglesLeft;
  rightSideIcon = faAnglesRight;
  layersIcon = faLayerGroup;

  map!: Map;

  defaultMapView!: View;

  isPanelsDisplayed = true;

  toolsMode: toolsTypes = 'createTools';

  currentLayerIdSelected: string | null = null;

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
        this.map = map;
        this.currentEpsg = this.map.getView().getProjection().getCode();
        this.defaultMapView = this.map.getView()
      }
    );
    
    this.allLayersSubscription = this.interactionsService.allLayers.subscribe(
      (allLayers: layerHandler[]) => {
        this.currentLayers = allLayers
      }
    )

    this.layerIdSelectedSubscription = this.interactionsService.layerIdSelected.subscribe(
      (currentLayerIdSelected: string | null) => {
        this.currentLayerIdSelected = currentLayerIdSelected
      }
    )
   }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();

  }

  ngOnDestroy(): void {
    this.map.setView(this.defaultMapView)

    this.mapSubscription.unsubscribe();
    this.allLayersSubscription.unsubscribe();
    this.layerIdSelectedSubscription.unsubscribe();
    
    this.mapService.changeMapInteractionStatus(false)
    this.mapService.resetMapView()
  }

  private sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
  }

  showHideLegend(): void {
    this.isPanelsDisplayed = !this.isPanelsDisplayed;
    this.unSelectLayer()
  }

  unSelectLayer(): void {
    this.interactionsService.sendSelectedLayerId(null)
  }

}

