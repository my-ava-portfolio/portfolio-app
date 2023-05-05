import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { Subscription } from 'rxjs';

import { MapService } from '@services/map.service';
import { fadeInOutAnimation } from '@core/animation_routes';
import { ControlerService } from '@services/controler.service';


@Component({
  selector: 'map-app-layout',
  templateUrl: './map-app-layout.component.html',
  styleUrls: ['./map-app-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInOutAnimation]
})
export class MapAppLayoutComponent implements OnInit, OnDestroy {

  isLegendDisplayed: boolean = true;

  mapScaleDivSubscription!: Subscription;
  mapProjectionSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
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

  }

  ngOnInit(): void {
    this.sendResumeSubMenus()
    this.mapService.mapInteraction(true);

    this.mapService.buildMapMapControlers()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

  ngOnDestroy(): void {
    this.mapService.mapInteraction(false);

    this.mapService.unsetControlToMap("scale")
    this.mapService.unsetControlToMap("attribution")
    this.mapService.unsetControlToMap("miniMap")

    this.mapScaleDivSubscription.unsubscribe();
    this.mapProjectionSubscription.unsubscribe();

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  // zoomOnData(): void {
  //   this.mapService.sendZoomAction();
  // }

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

    const divmapLegend: any = window.document.getElementById('mapLegendTools')
    divAttribution.appendChild(
      window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0]
    )
  }

}
