import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { MapService } from '../../services/map.service';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MapViewComponent implements OnInit, OnDestroy {

  mapContainer!: any;

  mapContainerSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

    this.mapContainerSubscription = this.mapService.mapContainer.subscribe(
      (element) => {
        this.mapContainer = element;
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.mapContainerSubscription.unsubscribe();
  }

}
