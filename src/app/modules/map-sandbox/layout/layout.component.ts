import { layerHandler } from '@modules/map-sandbox/shared/core';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import { faGlobe, faLayerGroup, faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';

import { Subscription } from 'rxjs/internal/Subscription';
import View from 'ol/View';
import { InteractionsService } from '../shared/service/interactions.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  currentEpsg!: string;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];

  // icons
  geoIcon = faGlobe;
  leftSideIcon = faAnglesLeft;
  rightSideIcon = faAnglesRight;
  layersIcon = faLayerGroup;

  map!: Map;

  defaultMapView!: View;

  isLegendDisplayed = true;
  currentMenuDisplayed = 'createTools'

  editBarEnabled!: boolean
  currentLayerSelected!: layerHandler | null;

  mapSubscription!: Subscription;
  layerObjectSelectedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private interactionsService: InteractionsService,
    private cdRef:ChangeDetectorRef
  ) {

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
        this.currentEpsg = this.map.getView().getProjection().getCode();
        this.defaultMapView = this.map.getView()
      }
    );

    this.layerObjectSelectedSubscription = this.interactionsService.layerObjectSelected.subscribe(
      (layerSelected: layerHandler | null) => {

        if (layerSelected !== this.currentLayerSelected) {
          this.editBarEnabled = false
          this.cdRef.detectChanges(); // in order to delete/reset the edit bar component

          this.editBarEnabled = true
        } else if (layerSelected === null ) {
          this.editBarEnabled = false
        }
        this.currentLayerSelected = layerSelected

      })

   }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();

  }

  ngOnDestroy(): void {
    this.map.setView(this.defaultMapView)

    this.mapSubscription.unsubscribe();
    this.layerObjectSelectedSubscription.unsubscribe();

    this.mapService.changeMapInteractionStatus(false)
    this.mapService.resetMapView()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

}

