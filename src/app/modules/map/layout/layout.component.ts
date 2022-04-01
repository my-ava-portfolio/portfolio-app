import { Component, OnInit, OnDestroy, HostListener, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

// TODO use it
import { checkIfScreenPortraitOrientation } from '@core/inputs';
import { tagIcon, centerIcon} from '@core/inputs';

import { MapService } from '@services/map.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  tagIcon = tagIcon;
  centerIcon = centerIcon;
  isLegendDisplayed: boolean = true;

  ScaleFeaturesSubscription!: Subscription;
  routerSubscription!: Subscription;

  currentMapTool!: string;

  constructor(
    private mapService: MapService,
    private router: Router,

  ) {

    this.ScaleFeaturesSubscription = this.mapService.mapContainerScale.subscribe(
      (scaleFeatures: any) => {

        const divScale: any = window.document.getElementById('legend-scale');
        const divAttribution: any = window.document.getElementById('attribution')
        divScale.appendChild(scaleFeatures.scale.getContainer())
        divAttribution.appendChild(scaleFeatures.attribution.getContainer())
      }
    );

    this.routerSubscription = this.router.events.subscribe(_ => {
      this.currentMapTool = router.url;
    });

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mapService.getMapContainerForLegend()

  }

  ngOnDestroy(): void {
    this.ScaleFeaturesSubscription.unsubscribe();
    this.routerSubscription.unsubscribe()
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomOnData(): void {

  }

}
