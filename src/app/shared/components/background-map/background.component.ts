import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import Map from 'ol/Map';
import View from 'ol/View';
import {Extent, getCenter} from 'ol/extent';

import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import { MapService } from '@services/map.service';
import { unByKey } from 'ol/Observable';
import Point from 'ol/geom/Point';

import {ScaleLine, defaults as defaultControls, Attribution, OverviewMap} from 'ol/control';
import {
  DragRotateAndZoom,
  defaults as defaultInteractions,
} from 'ol/interaction';

@Component({
  selector: 'app-background-map',
  templateUrl: './background.component.html',
  styleUrls: ['./background.component.scss']
})
export class BackgroundComponent implements OnInit {

  isMapInteractionEnabled: boolean = false;

  private mapEvents: any = {};
  private mapControlers: any = {};
  private mapInteractions: any = {};

  private InitialViewCoords: number[] = [496076.3136,5681717.1865];
  private defaultZoomValue = 7;
  private mainView!: View;

  private basemap = new OSM()

  map!: Map;

  setmapEventSubscription!: Subscription;
  unsetmapEventSubscription!: Subscription;
  setInteractionOnMapSubscription!: Subscription;
  unsetInteractionOnMapSubscription!: Subscription;
  mapCalledSubscription!: Subscription;
  mapViewResetSubscription!: Subscription;
  mapInteractionStatusSubscription!: Subscription;
  layerNameToZoomSubscription!: Subscription;
  interactionsSetterSubscription!: Subscription;
  layerRemovingSubscription!: Subscription;
  extentToZoomSubscription!: Subscription;

  setControlOnMapSubscription!: Subscription;
  unsetControlOnMapSubscription!: Subscription;

  constructor(
    private mapService: MapService,
  ) {

    this.setmapEventSubscription = this.mapService.setmapEvent.subscribe(
      (event: string) => {
        if (event === "mapCoords") {
          this.mapCoordinatesEvent()
        }
      }
    )
    this.unsetmapEventSubscription = this.mapService.unsetmapEvent.subscribe(
      (event: string) => {
        this.disableMapEvent(event)
      }
    )

    this.setControlOnMapSubscription = this.mapService.setMapControl.subscribe(
      (controlName: string) => {
        this.map.addControl(this.mapControlers[controlName]);
      }
    )
    this.unsetControlOnMapSubscription = this.mapService.unsetMapControl.subscribe(
      (controlName: string) => {
        this.map.removeControl(this.mapControlers[controlName]);
      }
    )

    this.setInteractionOnMapSubscription = this.mapService.setMapInteraction.subscribe(
      (interactionName: string) => {
        this.map.addInteraction(this.mapInteractions[interactionName]);
      }
    )
    this.unsetInteractionOnMapSubscription = this.mapService.unsetMapInteraction.subscribe(
      (interactionName: string) => {
        this.map.removeInteraction(this.mapInteractions[interactionName]);
      }
    )

    this.mapCalledSubscription = this.mapService.mapCalled.subscribe(
      (_) => {
        this.mapService.sendMap(this.map);
      }
    );

    this.mapViewResetSubscription = this.mapService.isMapViewReset.subscribe(
      (_) => {
        this.resetView();
      }
    );

    this.mapInteractionStatusSubscription = this.mapService.mapInteractionStatus.subscribe(
      (status: boolean) => {
        this.isMapInteractionEnabled = status;
      }
    );

    this.layerNameToZoomSubscription = this.mapService.layerNameToZoom.subscribe(
      (layerName: any[]) => {
        this.zoomToLayerName(layerName[0], layerName[1])
      }
    )

    this.extentToZoomSubscription = this.mapService.extentToZoom.subscribe(
      (layerName: any[]) => {
        this.zoomToExtent(layerName[0], layerName[1])

      }
    )

    this.interactionsSetterSubscription = this.mapService.interactionsEnabled.subscribe(
      (enabled: boolean) => {
          this.interationsSetter(enabled)
        }
    )

    this.layerRemovingSubscription = this.mapService.layerNameToRemove.subscribe(
      (layerName: string) => {
          this.removeLayerByName(layerName)
        }
      )

  }

  ngOnInit(): void {

    this.mainView = new View({
      center: this.InitialViewCoords,
      zoom: this.defaultZoomValue,
    });

    this.mapControlers['scale'] = this.controlerScale()
    this.mapControlers['attribution'] = this.controlerAttribution()
    this.mapControlers['miniMap'] = this.controlerMiniMap()

    this.mapInteractions['rotation'] = this.interactionsRotation()

    this.initMap();
  }

  ngOnDestroy(): void {
    this.setmapEventSubscription.unsubscribe();
    this.unsetmapEventSubscription.unsubscribe();
    this.setInteractionOnMapSubscription.unsubscribe();
    this.unsetInteractionOnMapSubscription.unsubscribe();
    this.mapCalledSubscription.unsubscribe();
    this.mapViewResetSubscription.unsubscribe();
    this.mapInteractionStatusSubscription.unsubscribe();
    this.layerNameToZoomSubscription.unsubscribe();
    this.interactionsSetterSubscription.unsubscribe();
    this.layerRemovingSubscription.unsubscribe();
    this.extentToZoomSubscription.unsubscribe();
    this.setControlOnMapSubscription.unsubscribe();
    this.unsetControlOnMapSubscription.unsubscribe();

  }


  initMap(): void {

    this.map = new Map({
      layers: [
        new TileLayer({
          source: this.basemap,
        }),
      ],
      target: 'map',
      view: this.mainView,
      controls: defaultControls({
        zoom : false,
      })
    });
    this.interationsSetter(false)

  }

  controlerScale(): ScaleLine {
    return new ScaleLine({
      units: "metric",
    });
  }
  controlerAttribution(): Attribution {
    return new Attribution({
      collapsible: false,
    })
  }
  controlerMiniMap(): OverviewMap {
    return new OverviewMap({
      // see in overviewmap-custom.html to see the custom CSS used
      className: 'ol-overviewmap ol-custom-overviewmap',
      layers: [
        new TileLayer({
          source: this.basemap
        }),
      ],
      collapsible: false,
    });
  }

  interactionsRotation(): DragRotateAndZoom {
    // Warning: take care about "ol-rotate ol-unselectable ol-control" to reset the north
    return new DragRotateAndZoom()
  }

  mapCoordinatesEvent(): void {
    const mapCoords = this.map.on('pointermove', (evt: any) => {
      this.mapService.pullMapCoords([evt.coordinate, evt.pixel])
    })
    this.mapEvents["mapCoords"] = mapCoords

  }

  disableMapEvent(event: string): void {
    unByKey(this.mapEvents[event])
  }

  interationsSetter(enabled: boolean): void {
    if ( !enabled ) {
      this.map.getInteractions().forEach((interaction: any) => {
        interaction.setActive(false);
      });
    } else {
      this.map.getInteractions().forEach((interaction: any) => {
        interaction.setActive(true);
      });
    }
  }

  resetView(): void {
    const startLocation = new Point(this.InitialViewCoords)

    this.zoomToExtent(startLocation.getExtent(), this.defaultZoomValue)


    // TODO remove legend ?

  }

  getMapScreenBounds(): void {
    let extent = this.map.getView().calculateExtent(this.map.getSize());
    this.mapService.sendScreenMapBounds([
      extent[0], // west
      extent[1], // south
      extent[2], // east
      extent[3], // North
    ]);
  }

  zoomToLayerName(layerName: string, zoom: number): void {
    this.map.getLayers().getArray()
      .filter((layer: any) => layer.get('name') === layerName)
      .forEach((layer: any) => {
        const extent = layer.getSource().getExtent();
        this.map.getView().fit(extent, { duration: 1000, maxZoom: zoom })
      });

  }

  zoomToExtent(extentValue: Extent, zoom: number): void {
    const duration = 2000

    const mapExtent = this.map.getView().calculateExtent()
    const resolution = this.mainView.getResolutionForExtent(mapExtent);
    const currentZoom = this.mainView.getZoomForResolution(resolution);
    const center = getCenter(extentValue);
    if (currentZoom !== undefined) {
      this.mainView.animate({
        zoom: currentZoom - 1,
        duration: duration / 3
      }, {
        center: center,
        zoom: zoom,
        duration: duration / 1.5
      });
    }

  }

  removeLayerByName(layerName: string): void {
    this.map.getLayers().getArray()
      .filter((layer: any) => layer.get('name') === layerName)
      .forEach((layer: any) => this.map.removeLayer(layer));
  }
}

