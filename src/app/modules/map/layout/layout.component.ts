import { Component, OnInit, OnDestroy, ViewEncapsulation, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

// TODO use it
import { checkIfScreenPortraitOrientation } from '@core/inputs';
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

  ScaleFeaturesSubscription!: Subscription;
  routerSubscription!: Subscription;
  interactivityMapSubscription!: Subscription;

  currentMapTool!: string;

  constructor(
    private mapService: MapService,
    private router: Router,
    private controlerService: ControlerService,
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
    this.mapService.MapInteraction(true);
    this.sendResumeSubMenus()
  }

  ngAfterViewInit(): void {
    this.mapService.getMapContainerForLegend()

  }

  ngOnDestroy(): void {
    this.ScaleFeaturesSubscription.unsubscribe();
    this.routerSubscription.unsubscribe()

    this.mapService.MapInteraction(false);
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
