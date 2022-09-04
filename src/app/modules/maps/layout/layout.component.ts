import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';

import { Subscription } from 'rxjs';

import { tagIcon, centerIcon} from '@core/inputs';

import { MapService } from '@services/map.service';
import { Router } from '@angular/router';
import { fadeInOutAnimation } from '@core/animation_routes';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  tagIcon = tagIcon;
  centerIcon = centerIcon;
  isLegendDisplayed: boolean = true;

  mapScaleDivSubscription!: Subscription;
  routerSubscription!: Subscription;
  mapProjectionSubscription!: Subscription;

  currentMapTool!: string;
  appsWithLegend = [
    'gtfs-viewer',
    'activities'
  ]
  appsWithoutLegend = [
    'sandbox',
  ]

  constructor(
    private mapService: MapService,
    private router: Router,
    private location: Location,
  ) {

    this.mapScaleDivSubscription = this.mapService.setMapControler.subscribe(
      (status: boolean) => {
        if (status) {
          this.setMapElements()

        }

      }
    );

    this.mapProjectionSubscription = this.mapService.setMapProjectionFromEpsg.subscribe(
      (_: string) => {
        this.setMapElements()
      }
    );

    this.routerSubscription = this.router.events.subscribe((_: any) => {
      const urlSplit: string[] =  this.location.path().split('/')
      this.currentMapTool = urlSplit[urlSplit.length - 1].split('#')[0];
    });

  }

  ngOnInit(): void {
    this.mapService.mapInteraction(true);

    this.mapService.buildMapMapControlers()
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.mapService.mapInteraction(false);

    this.mapService.unsetControlToMap("scale")
    this.mapService.unsetControlToMap("attribution")
    this.mapService.unsetControlToMap("miniMap")

    this.mapScaleDivSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
    this.mapProjectionSubscription.unsubscribe();

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomOnData(): void {
    this.mapService.sendZoomAction();
  }

  setMapElements(): void {
    this.mapService.unsetControlToMap("miniMap")
    this.mapService.unsetControlToMap("scale")
    this.mapService.unsetControlToMap("attribution")

    this.mapService.setControlToMap("miniMap")
    const divOverview: any = window.document.getElementById('overviewMap');
    divOverview.appendChild(
      window.document.getElementsByClassName("ol-overviewmap ol-custom-overviewmap")[0]
    )

    this.mapService.setControlToMap("scale")
    const divScale: any = window.document.getElementById('legendScale');
    divScale.appendChild(
      window.document.getElementsByClassName("ol-scale-line ol-unselectable")[0]
    )

    this.mapService.setControlToMap("attribution")
    const divAttribution: any = window.document.getElementById('attribution')
    divAttribution.appendChild(
      window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0]
    )
  }

}
