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

  private InitialViewCoords: any = [44.896741, 4.932861];
  private zoomValue = 8;
  private osmLayer: any = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    maxZoom: 20,
    minZoom: 1
  });

  map: any;

  mapContainerCalledSubscription!: Subscription;
  mapContainerLegendCalledSubscription!: Subscription;
  mapViewResetSubscription!: Subscription;
  mapInteractionSubscription!: Subscription;

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
  }

  ngOnInit(): void {
    this.initMap();
  }

  ngOnDestroy(): void {
    this.mapContainerLegendCalledSubscription.unsubscribe();
    this.mapContainerCalledSubscription.unsubscribe();
    this.mapViewResetSubscription.unsubscribe();
    this.mapInteractionSubscription.unsubscribe();
  }


  initMap(): void {
    this.map = L.map('map', {
      center: this.InitialViewCoords,
      zoom: this.zoomValue,
      zoomControl: false,
    }).addLayer(this.osmLayer);

    // to add scale
    // L.control.scale(
    //   {
    //     imperial: false,
    //     position: 'bottomright'
    //   }
    // ).addTo(this.map);
  }

  resetView(): void {
    this.map.setView(
      this.InitialViewCoords,
      this.zoomValue
    )
  }

}

