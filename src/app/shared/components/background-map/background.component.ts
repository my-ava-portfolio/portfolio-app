import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';

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


  private InitialViewCoords: any = [44.896741, 4.932861];
  private zoomValue = 8;
  private osmLayer: any = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    maxZoom: this.maxZoomValue,
    minZoom: 1
  });

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

        // to add scale
        const scaleLeaflet: any = L.control.scale(
          {
            imperial: false,
            position: 'bottomright'
          }
        );
        const AttributionLeaflet: any = L.control.attribution(
          {
            position: 'bottomright'
          }
        );

        scaleLeaflet.addTo(this.map);
        AttributionLeaflet.addTo(this.map);

        this.mapService.sendMapScale({
          scale: scaleLeaflet,
          attribution: AttributionLeaflet
        });

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
    this.map = L.map('map', {
      center: this.InitialViewCoords,
      zoom: this.zoomValue,
      zoomControl: false,
    }).addLayer(this.osmLayer);

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
  }

  getMapScreenBounds(): void {
    this.mapService.sendScreenMapBounds([
      this.map.getBounds().getWest(),
      this.map.getBounds().getSouth(),
      this.map.getBounds().getEast(),
      this.map.getBounds().getNorth()
    ]);
  }

  zoomFromDataBounds(bounds: number[]): void {
    const ne = { lng: bounds[2], lat: bounds[3] };
    const sw = { lng: bounds[0], lat: bounds[1] };

    this.map.fitBounds(
      L.latLngBounds(L.latLng(sw), L.latLng(ne)),
      {
        maxZoom: this.maxZoomValue
      }
    );
  }

}

