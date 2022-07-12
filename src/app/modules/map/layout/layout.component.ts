import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { tagIcon, centerIcon} from '@core/inputs';

import { MapService } from '@services/map.service';
import { Router } from '@angular/router';
import { ControlerService } from '@services/controler.service';
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

  currentMapTool!: string;

  constructor(
    private mapService: MapService,
    private router: Router,
    private controlerService: ControlerService,
  ) {

    this.mapScaleDivSubscription = this.mapService.setMapScaleDiv.subscribe(
      (_: boolean) => {
        // TODO clean observable
        const divScale: any = window.document.getElementById('legend-scale');
        const divAttribution: any = window.document.getElementById('attribution')
        divScale.appendChild(
          window.document.getElementsByClassName("ol-scale-line ol-unselectable")[0]
        )
        divAttribution.appendChild(
          window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0]
        )
      }
    );

    this.routerSubscription = this.router.events.subscribe(_ => {
      this.currentMapTool = router.url;
    });

  }

  ngOnInit(): void {
    this.mapService.mapInteraction(true);
    this.sendResumeSubMenus()

    this.mapService.setControlToMap("scale")
    this.mapService.setControlToMap("attribution")

    this.mapService.buildMapScaleDiv()
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
    this.mapService.mapInteraction(false);

    this.mapService.unsetControlToMap("scale")
    this.mapService.unsetControlToMap("attribution")

    this.mapScaleDivSubscription.unsubscribe();
    this.routerSubscription.unsubscribe()

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }


  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomOnData(): void {
    this.mapService.sendZoomAction();
  }

}
