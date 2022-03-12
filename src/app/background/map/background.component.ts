import { Component, OnInit, Input } from '@angular/core';

import { Subscription } from 'rxjs';

import * as L from 'leaflet';
import { MapService } from '../../services/map.service';


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

  mapContainerCalledSubscription!: Subscription;
  mapServiceSubscription!: Subscription;

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

  }

  ngOnInit(): void {
    this.initMap();

  }

  ngOnDestroy(): void {
    this.mapContainerCalledSubscription.unsubscribe();
    this.mapServiceSubscription.unsubscribe();
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
