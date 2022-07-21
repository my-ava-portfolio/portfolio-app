import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';

import { faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { layerHandler, getWkt, PointStyle } from '@modules/map-sandbox/shared/core_copy';
import Feature from 'ol/Feature';
import * as d3 from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';
import { v4 as uuidv4 } from 'uuid';
import Group from 'ol/layer/Group';
import BaseLayer from 'ol/layer/Base';
import BaseTileLayer from 'ol/layer/BaseTile';
import BaseVectorLayer from 'ol/layer/BaseVector';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  // icons
  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  featuresDisplayedObservable = new Subject<Feature[]>()

  map!: Map;

  layersAdded: layerHandler[] = [];
  layerIdSelected: string | null = null;
  layerIdEdited: string | null = null;
  layerIdDrawn: string | null = null;
  layerNamedIncrement: number = 0;
  createModesSupported = [
    {
      "mode": 'Point',
      "label": 'Couche de Points',
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString',
      "label": 'Couche de LineString',
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon',
      "label": 'Couche de Polygones',
      "icon": this.polygonIcon
    }
  ]



  selectedFeaturesProperties: any[] = [];



  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];
  // create a service to get the map epsg!
  currentEpsg!: string;
  selectedEpsg!: string;



  layerFeatures: any[] = [];
  featureSelectedId: string | null = null;

  isLegendDisplayed = true;

  mapSubscription!: Subscription;
  featuresDisplayedSubscription!: Subscription;
  featuresCreatedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    // this.featuresCreatedSubscription = this.featuresCreatedObservable.subscribe(
      // (features: Feature[]) => {
        // this.resetToasts();
        // features.forEach((feature: Feature) => {
          // this.setFeatureToasts(feature, true)
          // this.featureSelectedId = feature.get('id');

          // if (this.modifyModeSelected !== "Hole") {
          //   // Hole needs to work on a selected feature, so reset the mode is not relevant
          //   this.featureSelectedId = null;  // we don't want to select the feature on the div when creating a new feature
          // }
        // })
    //   }
    // )

    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (features: Feature[]) => {
        this.resetToasts()
        features.forEach((feature: Feature) => {
          this.setFeatureToasts(feature, false)
          this.featureSelectedId = feature.get('id');
          console.log(feature.get('name'))
        })
      }
    )

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
        this.currentEpsg = this.map.getView().getProjection().getCode();

        this.selectedEpsg = this.currentEpsg
      }
    );

   }

  ngOnInit(): void {

    this.sendResumeSubMenus();
    this.mapService.changeMapInteractionStatus(true)
    this.mapService.getMap();

    this.initMousePosition()

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.featuresDisplayedSubscription.unsubscribe();
    this.featuresCreatedSubscription.unsubscribe();


    this.mapService.resetMapView()
    this.mapService.changeMapInteractionStatus(false)
    this.setProjection("EPSG:3857")
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  addLayer(geomType: any): void {

    let newLayer = new layerHandler(
      this.map,
      'layer ' + ++this.layerNamedIncrement,
      geomType
    )

    this.layersAdded.push(newLayer)

  }

  selectLayer(layerId: string | null): void {

    if (layerId !== null) {
      this.layersAdded.forEach((layer: layerHandler) => {
        if (layer.id === layerId) {

          this.layerIdSelected = layerId
          this.addFeature(null)
          this.editFeature(null)

          layer.enableSelecting()

          this.layerFeatures = layer.features()


          layer.sourceFeatures.on('addfeature', (event: any) => {
            this.refreshAllFeatures(layer)

          });

          // this.mapInteraction.sourceFeatures.on('changefeature', (event: any) => {
          //   this.featuresDisplayedObservable.next([event.feature]);
          // });

          layer.sourceFeatures.on('removefeature', (event: any) => {
            this.refreshAllFeatures(layer)

          });

        }
      });

    } else {
      // to disable the draw and edit tools
      this.layerIdSelected = layerId
      this.addFeature(null)
      this.editFeature(null)

    }
    this.refreshAllLayers()

  }

  addFeature(layerId: string | null): void {
    console.log("add", this.layerIdDrawn, this.layerIdEdited)

    if (layerId === this.layerIdDrawn || layerId === null) {
      this.layersAdded.forEach((layer: layerHandler) => {

        if (layer.id === this.layerIdDrawn) {
          layer.disableDrawing()
          this.layerIdDrawn = null
          return;
        }
      });

    } else {

      this.layersAdded.forEach((layer: layerHandler) => {

        if (layer.id === layerId) {
            this.selectLayer(layerId) // draw and edit tool are reset here
            this.layerIdDrawn = layerId
            layer.enableDrawing()
          }
      });
    }
  }

  editFeature(layerId: string | null): void {
    console.log("edit", this.layerIdDrawn, this.layerIdEdited)

    if (layerId === this.layerIdEdited || layerId === null) {
      this.layersAdded.forEach((layer: layerHandler) => {

        if (layer.id === this.layerIdEdited) {
          layer.disableEditing()
          this.layerIdEdited = null
          return;
        }
      });

    } else {

      this.layersAdded.forEach((layer: layerHandler) => {

        if (layer.id === layerId) {
            this.selectLayer(layerId) // draw and edit tool are reset here
            this.layerIdEdited = layerId
            layer.enableEditing()
          }
      });
    }
  }

  removeLayer(layerId: string): void {
    this.layersAdded.forEach((layer: layerHandler) => {

      if (layer.id === layerId) {
        this.addFeature(null)

        layer.removeLayer()
        this.layerIdSelected = null // deselect by defaultt when removing
        this.resetToasts()
        this.layerFeatures = layer.features()
        this.refreshAllLayers()
      }
    });
  }

  refreshAllLayers(): void {

    this.layersAdded = this.layersAdded.filter((layer: layerHandler) => {
      return !layer.deleted
    })
  }


  refreshAllFeatures(layer: any): void {
    this.layerFeatures = layer.features()
  }

  selectFeature(feature: Feature | null): void {
    // reset toast
    this.resetToasts()

    if (feature !== null) {
      let layersFound: layerHandler[] = this.layersAdded.filter((layer: layerHandler) => {
        return layer.id === this.layerIdSelected
      })
      // reset the selection and set it (then the style will be updated) + it call the changefeature event !
      layersFound[0].select.getFeatures().clear()
      layersFound[0].select.getFeatures().push(feature)
      this.featuresDisplayedObservable.next([feature]);

    } else {
      this.resetFeatureSelection()
    }

  }

  resetFeatureSelection(): void {
    if (this.featureSelectedId !== null) {
      let layersFound: layerHandler[] = this.layersAdded.filter((layer: layerHandler) => {
        return layer.id === this.layerIdSelected
      })
      // reset the selection and set it (then the style will be updated) + it call the changefeature event !
      layersFound[0].select.getFeatures().clear()
      this.featureSelectedId = null;
    }

  }

  resetToasts(): void {
    this.selectedFeaturesProperties = []
  }
  setFeatureToasts(feature: Feature, isNotify: boolean): any {

    // get the geom Icon // TODO could be improved...
    const modeSupportedFound = this.createModesSupported.filter(mode => {
      return mode.mode === feature.get('geom_type')
    });
    const geomIcon = modeSupportedFound[0].icon

    // get wkt regarding selected projection
    const geomFeature = feature.getGeometry();
    if (geomFeature !== undefined) {

      this.selectedFeaturesProperties.push({
        'id': feature.getId(),
        'name': feature.get('name'),
        'geom_type': feature.get('geom_type'),
        'created_at': feature.get('created_at'),
        'updated_at': feature.get('updated_at'),
        'icon': geomIcon,
        'wkt': getWkt(geomFeature)
      })

      if (isNotify) {
        // display it with fading
        d3.select("html")
        .transition()
        .delay(2000) // need this delayto wait the toats html building
        .duration(5000)
        .on("end", () => {
          d3.selectAll(".toastFeature")
          .attr("class", "toast toastFeature");
        })
      } else {
        // happened only if a feature is selected
        // d3.selectAll(".toastFeature").remove()
        d3.selectAll(".toastFeature")
        .attr("class", "toast toastFeature faded");
      }
    }
  }



  copyToClipboard(value: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = value;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  initMousePosition(): void {
    let mouseCoordinatesDiv!: any;
    mouseCoordinatesDiv = document.getElementById('mouseCoordinates')

    this.mousePositionControl = new MousePosition({
      coordinateFormat: this.setPrecisionFunc(4),
      placeholder: false,
      className: 'mouse-position',
      target: mouseCoordinatesDiv,
    });
    this.mousePositionControl.on("propertychange", (event: any) => {
      this.cursorCoordinates = event
    })
    this.map.addControl(this.mousePositionControl)
  }

  setProjection(epsg: string): void {
    this.selectedEpsg = epsg;

    this.mapService.setProjectionOnMap(epsg)

    // this.layerFeatures.getSource().getFeatures().forEach( (feature: any) => {
    //   feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, this.selectedEpsg))
    // });
    this.setMapEpsg();

  }

  updatePrecision(event: any): any {
    return this.mousePositionControl.setCoordinateFormat(this.setPrecisionFunc(event.target.value))
  }
  private setPrecisionFunc(precision: any): any {
    var template = '{x}, {y}';
    return (
      function(coordinate: any) {
          return format(coordinate, template, precision);
      });
  }

  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }


}


