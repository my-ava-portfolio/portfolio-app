import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import * as d3 from 'd3';

import { MapService } from '../../services/map.service';

import { PointsSvgLayerOnLeaflet } from '../../core/points_svg_layer';

@Component({
  selector: 'app-background-map',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {
  @Input() isBlurred!: boolean;
  @Input() isMapInteractionEnabled!: boolean;

  private InitialViewCoords: any = [44.896741, 4.932861];
  private zoomValue = 8;
  private osmLayer: any = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    maxZoom: 13,
    minZoom: 8
  });

  map: any;
  currentCoordsSelected!: any;

  homePointsMapLayer: PointsSvgLayerOnLeaflet | null = null;

  // will contain all my layers and their nodes
  mapLayers: any = {};

  mapContainerCalledSubscription!: Subscription;
  mapServiceSubscription!: Subscription;
  newSvgMapSubscription!: Subscription;
  removeSvgMapSubscription!: Subscription;

  getCoordsMapSubscription!: Subscription;

  // in order to activate map interactions
  mapInteractionEnabled: boolean = false;

  constructor(
    private mapService: MapService,
  ) {


    this.mapContainerCalledSubscription = this.mapService.mapContainerCalled.subscribe(
      (_) => {
        this.sendMapContainer()
      },
      (error) => {
        console.log('error');
      }
    );


    this.mapServiceSubscription = this.mapService.isMapViewReset.subscribe(
      (_) => {
        this.resetView();
      },
      (error) => {
        console.log('error');
      }
    );

    this.newSvgMapSubscription = this.mapService.newSvgLayerName.subscribe(
      (layerName: string) => {
        this.homePointsMapLayer = new PointsSvgLayerOnLeaflet(this.map, layerName);
        this.homePointsMapLayer.buildPointsLayer();
      },
      (error) => {
        console.log('error');
      }
    );

    this.removeSvgMapSubscription = this.mapService.removeSvgLayerName.subscribe(
      (layerName: string) => {
        console.log("hahaha")
        if (this.homePointsMapLayer !== null) {
          this.homePointsMapLayer.removeSvgLayer(true)
          this.homePointsMapLayer = null;
        }

      },
      (error) => {
        console.log('error');
      }
    );

    this.getCoordsMapSubscription = this.mapService.newCoords.subscribe(
      (coords: any) => {
        this.currentCoordsSelected = coords;
        console.log("map clicked", this.currentCoordsSelected)

        if (this.homePointsMapLayer !== null) {
          console.log("map added", this.currentCoordsSelected)

          this.homePointsMapLayer.addPoints(coords);
        }


      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.mapContainerCalledSubscription.unsubscribe();
    this.mapServiceSubscription.unsubscribe();
    this.newSvgMapSubscription.unsubscribe();
    this.getCoordsMapSubscription.unsubscribe()
  }

  sendMapContainer(): void {
    this.mapService.sendMapContainer(this.map);
  }

  initMap(): void {
    this.map = L.map('map', {
      center: this.InitialViewCoords,
      zoom: this.zoomValue,
      zoomControl: false,
    }).addLayer(this.osmLayer);

    this.map.on('click', this.setCoordsOnMap.bind(this));

    // to add scale
    L.control.scale(
      {
        imperial: false,
        position: 'bottomright'
      }
    ).addTo(this.map);
  }

  resetView(): void {
    this.map.setView(
      this.InitialViewCoords,
      this.zoomValue
    )
  }


  setCoordsOnMap(event: any): void {
    // get coordinates from map click
    const coordinates: any = {
      x: event.latlng.lat,
      y: event.latlng.lng
    };
    this.mapService.pullMapCoords(coordinates);
  }
}

