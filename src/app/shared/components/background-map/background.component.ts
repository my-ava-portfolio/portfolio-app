import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import * as d3 from 'd3';
import {transformExtent} from 'ol/proj';
import Collection from 'ol/Collection'

import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { MapService } from '@services/map.service';


@Component({
  selector: 'app-background-map',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  isMapInteractionEnabled: boolean = false;

  private maxZoomValue = 20;


  private InitialViewCoords: any = [496076.3136,5681717.1865];
  private zoomValue = 7;

  map: any;

  mapContainerCalledSubscription!: Subscription;
  mapContainerLegendCalledSubscription!: Subscription;
  mapViewResetSubscription!: Subscription;
  mapInteractionSubscription!: Subscription;
  layerNameToZoomSubscription!: Subscription;
  interactionsSetterSubscription!: Subscription;
  layerRemovingSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {


    this.mapContainerLegendCalledSubscription = this.mapService.mapContainerLegendCalled.subscribe(
      (_) => {

       // TODO used for attributions

      }
    );

    this.mapContainerCalledSubscription = this.mapService.mapContainerCalled.subscribe(
      (_) => {
        this.mapService.sendMapContainer(this.map);
      }
    );

    this.mapViewResetSubscription = this.mapService.isMapViewReset.subscribe(
      (_) => {
        this.resetView();
      }
    );

    this.mapInteractionSubscription = this.mapService.mapInteraction.subscribe(
      (status: boolean) => {
        this.isMapInteractionEnabled = status;
      }
    );

    this.layerNameToZoomSubscription = this.mapService.layerNameToZoom.subscribe(
      (layerName: any[]) => {
        this.zoomToLayerName(layerName[0], layerName[1])
      }
    )

    this.interactionsSetterSubscription = this.mapService.interactionsEnabled.subscribe(
      (enabled: boolean) => {
          this.interationsSetter(enabled)
        }
    )

    this.layerRemovingSubscription = this.mapService.layerNameToRemove.subscribe(
      (layerName: string) => {
          this.removeLayerByName(layerName)
        }
      )

  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.mapContainerLegendCalledSubscription.unsubscribe();
    this.mapContainerCalledSubscription.unsubscribe();
    this.mapViewResetSubscription.unsubscribe();
    this.mapInteractionSubscription.unsubscribe();
    this.layerNameToZoomSubscription.unsubscribe();
    this.interactionsSetterSubscription.unsubscribe();
  }


  initMap(): void {

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
    });
    this.resetView()
    this.interationsSetter(false)
    // this.map.on(
    //   'moveend',
    //   this.getMapScreenBounds.bind(this)
    // );

  }

  interationsSetter(enabled: boolean): void {
    if ( !enabled ) {
      this.map.getInteractions().forEach((interaction: any) => {
        interaction.setActive(false);
      });
    } else {
      this.map.getInteractions().forEach((interaction: any) => {
        interaction.setActive(true);
      });
    }
  }

  resetView(): void {
    // TODO animate ? use extend, not 1 coordinates
    const view = new View({
      center: this.InitialViewCoords,
      zoom: this.zoomValue,
    })
    this.map.setView(view)

    // TODO remove legend ?

  }

  getMapScreenBounds(): void {
    let extent = this.map.getView().calculateExtent(this.map.getSize());
    this.mapService.sendScreenMapBounds([
      extent[0], // west
      extent[1], // south
      extent[2], // east
      extent[3], // North
    ]);
  }

  zoomToLayerName(layerName: string, zoom: number): void {
    this.map.getLayers().getArray()
      .filter((layer: any) => layer.get('name') === layerName)
      .forEach((layer: any) => {
        const extent = layer.getSource().getExtent();
        this.map.getView().fit(extent, { duration: 1000, maxZoom: zoom })
      });

  }

  removeLayerByName(layerName: string): void {
    this.map.getLayers().getArray()
      .filter((layer: any) => layer.get('name') === layerName)
      .forEach((layer: any) => this.map.removeLayer(layer));
  }
}

