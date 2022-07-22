import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';

import Map from 'ol/Map';

import {faPencil, faCircleQuestion, faGear, faCirclePlus, faCircle, faWaveSquare, faDrawPolygon, faXmark } from '@fortawesome/free-solid-svg-icons';

import { GroupHandler, layerHandler, getWkt, findBy, findElementBy } from '@modules/map-sandbox/shared/core';
import Feature from 'ol/Feature';
import * as d3 from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';
import MousePosition from 'ol/control/MousePosition';
import { format } from 'ol/coordinate';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  // icons
  helpIcon = faCircleQuestion;
  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  featuresDisplayedObservable = new Subject<Feature[]>()

  map!: Map;

  allExistingLayers: layerHandler[] = [];
  layersFromCurrentGroup: layerHandler[] = [];
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

  groupsList: GroupHandler[] = []
  groupNameIncrement: number = 0;
  groupSelectedId!: string;
  groupSelectedName!: string;

  selectedFeaturesProperties: any[] = [];
  color!: string  // TODO check if needed

  mousePositionControl!: MousePosition;
  cursorCoordinates!: any;
  epsgAvailable = ["EPSG:4326", "EPSG:3857"];
  // create a service to get the map epsg!
  currentEpsg!: string;
  selectedEpsg!: string;

  layerFeatures: any[] = [];
  featureSelectedId: string | null = null;
  layerObjectSelected: any | null = null;

  isLegendDisplayed = true;

  mapSubscription!: Subscription;
  featuresDisplayedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (features: Feature[]) => {
        this.resetToasts()
        features.forEach((feature: Feature) => {
          this.setFeatureToasts(feature, false)
          this.featureSelectedId = feature.get('id');
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


    this.allExistingLayers.forEach((layer: layerHandler) => {
      this.map.removeLayer(layer.vectorLayer)
      layer.cleanEvents()
    })
    this.groupsList.forEach((group: GroupHandler) => {
      this.map.removeLayer(group._group)
    })

    this.mapService.changeMapInteractionStatus(false)

    // this.setProjection("EPSG:3857") // create zoom issue....
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



  addGroup(): void {
    let newGroup = new GroupHandler(
      this.map,
      'Groupe ' + ++this.groupNameIncrement
    )
    this.groupsList.push(newGroup)
    this.resetLayersAndFeaturesFromGroupId(this.groupSelectedId)

  }

  selectGroup(groupId: string): void {
    const groupFound = findBy(this.map.getLayerGroup(), "id", groupId)
    if (groupFound !== null) {
      this.groupSelectedId = groupFound.get('id');
      this.groupSelectedName = groupFound.get('name');
      this.resetLayersAndFeaturesFromGroupId(this.groupSelectedId)
    }
  }

  refreshLayersFromGroupId(groupId: string): void {
    this.layersFromCurrentGroup = this.allExistingLayers.filter((layer: layerHandler) => {
      return layer.groupId === groupId && !layer.deleted;
    })
  }

  resetLayersAndFeaturesFromGroupId(groupId: string): void {
    this.refreshLayersFromGroupId(groupId)
    this.selectLayer(null) // unselect selected layer
    this.refreshAllFeatures(null)
  }

  addLayer(geomType: any): void {
    const groupsFound = this.groupsList.filter((group: GroupHandler) => {
      return group.id == this.groupSelectedId  // TODO use the id but need gui iplementing
    })

    if (groupsFound.length === 1) {
      let newLayer = new layerHandler(
        this.map,
        'layer ' + ++this.layerNamedIncrement,
        geomType,
        groupsFound[0].id
      )


      groupsFound[0].addLayer(newLayer.vectorLayer)
      this.allExistingLayers.push(newLayer)
      this.refreshLayersFromGroupId(this.groupSelectedId)
      console.log("aa")
    } else {
      alert("Create & select a group to add a layer!")
    }


  }

  selectLayer(layerId: string | null): void {
    this.resetToasts()
    this.addFeature(null)
    this.editFeature(null)

    this.layerIdSelected = layerId

    let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', layerId)
    if (layerFound !== null) {


      layerFound.enableSelecting()

      this.layerFeatures = layerFound.features()


      layerFound.sourceFeatures.on('addfeature', (event: any) => {
        this.refreshAllFeatures(layerFound)
      });

      layerFound.sourceFeatures.on('changefeature', (event: any) => {
        this.featuresDisplayedObservable.next([event.feature]);  // useful to synchro the map selection and the div... maybe we can use the select event here
      });

      layerFound.sourceFeatures.on('removefeature', (event: any) => {
        this.refreshAllFeatures(layerFound)
      });

    }
    this.getCurrentLayer(layerId)
    this.refreshAllLayers()

  }

  getCurrentLayer(layerId: string | null): void {
    this.layerObjectSelected = findElementBy(this.layersFromCurrentGroup, 'id', layerId)
  }

  addPolygonHole(layerId: string): void {
    this.addFeature(null)
    let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', layerId)
    if (layerFound !== null) {
      this.layerIdDrawn = layerFound.id
      // this.selectLayer(this.layerIdDrawn) // draw and edit tool are reset here
      layerFound.enableDrawing(true)
    }

  }

  addFeature(layerId: string | null): void {
    if (layerId === this.layerIdDrawn || layerId === null) {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', this.layerIdDrawn)
      if (layerFound !== null) {
          layerFound.disableDrawing()
          this.layerIdDrawn = null
      }

    } else {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', layerId)
      if (layerFound !== null) {
        this.selectLayer(layerId) // draw and edit tool are reset here
        this.layerIdDrawn = layerId
        layerFound.enableDrawing(false)
      }

    }  
  }

  editFeature(layerId: string | null): void {
    console.log("edit", this.layerIdDrawn, this.layerIdEdited)

    if (layerId === this.layerIdEdited || layerId === null) {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', this.layerIdEdited)
      if (layerFound !== null) {
          layerFound.disableEditing()
          this.layerIdEdited = null
      }

    } else {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', layerId)
      if (layerFound !== null) { 
        this.selectLayer(layerId) // draw and edit tool are reset here
        this.layerIdEdited = layerId
        layerFound.enableEditing()
      }

    }
  }

  removeLayer(layerId: string): void {
    this.layersFromCurrentGroup.forEach((layer: layerHandler) => {

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

    this.layersFromCurrentGroup = this.layersFromCurrentGroup.filter((layer: layerHandler) => {
      return !layer.deleted
    })
  }


  refreshAllFeatures(layer: any): void {
    if (layer === null) {
      this.layerFeatures = []
    } else {
      this.layerFeatures = layer.features()
    }
  }

  selectFeature(featureId: string | null): void {
    // reset toast
    this.resetToasts()

    if (featureId !== null) {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', this.layerIdSelected)
      if (layerFound !== null) {
        // reset the selection and set it (then the style will be updated) + it call the changefeature event !
        let feature = this.getFeature(featureId)

        layerFound.select.getFeatures().clear()
        layerFound.select.getFeatures().push(feature)
      }

    } else {
      this.resetFeatureSelection()

    }

  }

  resetFeatureSelection(): void {
    if (this.featureSelectedId !== null) {
      let layerFound = findElementBy(this.layersFromCurrentGroup, 'id', this.layerIdEdited)
      if (layerFound !== null) {
        // reset the selection and set it (then the style will be updated) + it call the changefeature event !
        layerFound.select.getFeatures().clear()
        this.featureSelectedId = null;
      }
    
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
        'group': "feature.groupId",
        'layer_id': this.layerIdSelected,
        'geom_type': feature.get('geom_type'),
        'created_at': feature.get('created_at'),
        'updated_at': feature.get('updated_at'),
        'fill_color': feature.get('fill_color'),
        'stroke_color': feature.get('stroke_color'),
        'stroke_width': feature.get('stroke_width'),
        'icon': geomIcon,
        'wkt': getWkt(geomFeature)
      })

      if (isNotify) {  // TODO deprecated
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

    //  reproject each layer
    this.layerFeatures.forEach((layer: any) => {
      layer.VectorSource().getFeatures().forEach( (feature: any) => {
        feature.setGeometry(feature.getGeometry().transform(this.currentEpsg, this.selectedEpsg))
      });
    })

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

  getFeature(featureId: string): any {
    let features = this.layerFeatures.filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }

  setMapEpsg(): void {
    this.currentEpsg = this.map.getView().getProjection().getCode();
  }

  updateFillColor(featureId: string, color: string): void {
    let feature = this.getFeature(featureId)
    feature.set("fill_color", color, false)
  }
  updateStrokeWidth(featureId: string, event: any): void {
    let feature = this.getFeature(featureId)
    feature.set("stroke_width", event.target.value, true)
  }
  updateStrokeColor(featureId: string, color: string): void {
    let feature = this.getFeature(featureId)
    feature.set("stroke_color", color, true)
  }

}


