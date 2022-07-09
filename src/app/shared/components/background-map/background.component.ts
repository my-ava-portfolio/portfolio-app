import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import * as d3 from 'd3';
import {transformExtent} from 'ol/proj';

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
  // @Input() isBlurred!: boolean;
  // @Input() isMapInteractionEnabled!: boolean;

  isMapInteractionEnabled: boolean = false;

  private maxZoomValue = 20;


  private InitialViewCoords: any = [496076.3136,5681717.1865];
  private zoomValue = 7;
  // private osmLayer: any = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
  //   maxZoom: this.maxZoomValue,
  //   minZoom: 1
  // });

  map: any;

  mapContainerCalledSubscription!: Subscription;
  mapContainerLegendCalledSubscription!: Subscription;
  mapViewResetSubscription!: Subscription;
  mapInteractionSubscription!: Subscription;
  zoomMapFromBoundsSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {


    this.mapContainerLegendCalledSubscription = this.mapService.mapContainerLegendCalled.subscribe(
      (_) => {

        // // to add scale
        // const scaleLeaflet: any = L.control.scale(
        //   {
        //     imperial: false,
        //     position: 'bottomright'
        //   }
        // );
        // const AttributionLeaflet: any = L.control.attribution(
        //   {
        //     position: 'bottomright'
        //   }
        // );

        // scaleLeaflet.addTo(this.map);
        // AttributionLeaflet.addTo(this.map);

        // this.mapService.sendMapScale({
        //   scale: scaleLeaflet,
        //   attribution: AttributionLeaflet
        // });

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

    this.zoomMapFromBoundsSubscription = this.mapService.zoomMapFromBounds.subscribe(
      (bounds: any) => {
        this.zoomFromDataBounds(bounds)
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
    this.zoomMapFromBoundsSubscription.unsubscribe();
  }


  initMap(): void {

    this.map = new Map({
      view: new View({
        center: this.InitialViewCoords,
        zoom: this.zoomValue,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map'
    });


    // this.map = L.map('map', {
    //   center: this.InitialViewCoords,
    //   zoom: this.zoomValue,
    //   zoomControl: false,
    // }).addLayer(this.osmLayer);

    this.map.on(
      'moveend',
      this.getMapScreenBounds.bind(this)
    );

  }

  resetView(): void {
    this.map.setView(
      this.InitialViewCoords,
      this.zoomValue
    )
    // TODO remove legend
    // d3.select(".leaflet-control-scale").remove();
    // d3.select(".leaflet-control-attribution").remove();
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

  zoomFromDataBounds(bounds: number[]): void {

    this.map.getView().fit(
      transformExtent(bounds, 'EPSG:4326', 'EPSG:3859'),
      this.map.getSize()
    );

    // const ne = { lng: bounds[2], lat: bounds[3] };
    // const sw = { lng: bounds[0], lat: bounds[1] };

    // this.map.fitBounds(
    //   L.latLngBounds(L.latLng(sw), L.latLng(ne)),
    //   {
    //     maxZoom: this.maxZoomValue
    //   }
    // );
  }

}

