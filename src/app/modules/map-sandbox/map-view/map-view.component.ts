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

import { DrawInteraction } from '@modules/map-sandbox/shared/core';
import Feature from 'ol/Feature';
import * as d3 from 'd3';
import { Subscription } from 'rxjs/internal/Subscription';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnDestroy {

  map!: Map;

  sourceFeatures!: any;
  layerFeatures!: any;
  layerName = "edited_layer";
  holeEnabled = false;

  allFeatures: any[] = [];
  featureSelectedId: string | null = null;
  featuresDisplayedObservable = new Subject<Feature[]>()
  featuresCreatedObservable = new Subject<Feature[]>()

  featureProperties: any = {};
  featuresCount: number = 0;
  toastsFeatureProperties: any[] = [];

  drawSession!: any;

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  createModesSupported = [
    {
      "mode": 'disabled',
      "label": "Annuler/Désactiver",
      "type": "controler",
      "icon": this.disabledIcon
    },
    {
      "mode": 'Point',
      "label": 'Point',
      "type": "geometry",  // new feature creating
      "icon": this.pointIcon
    },
    {
      "mode": 'LineString',
      "label": 'LineString',
      "type": "geometry",  // new feature creating
      "icon": this.lineStringIcon
    },
    {
      "mode": 'Polygon',
      "label": 'Polygon',
      "type": "geometry",  // new feature creating
      "icon": this.polygonIcon
    },
    // {
    //   "mode": 'Hole',  // works like a polygon
    //   "label": 'Trou',
    //   "type": "enhancement",  // particular case where we have to select And edit the feature
    //   "icon": this.polygonIcon
    // }
  ]

  modifyModesSupported = [
    {
      "mode": 'disabled',
      "label": "Annuler/Désactiver",
      "type": "controler",
      "icon": this.disabledIcon
    },
    {
      "mode": 'edited',
      "label": 'Editer',
      "type": "controler",
      "icon": this.pointIcon
    },
    {
      "mode": 'Hole',  // works like a polygon
      "label": 'Trou',
      "type": "enhancement",  // particular case where we have to select And edit the feature
      "icon": this.polygonIcon
    }
  ]


  drawModeSelected = "disabled";
  modifyModeSelected  = "disabled";
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

    this.featuresCreatedSubscription = this.featuresCreatedObservable.subscribe(
      (features: Feature[]) => {
        this.toastsFeatureProperties = []
        features.forEach((feature: Feature) => {
          // this.setToastFeature(feature, true)
          this.featureSelectedId = feature.get('id');

          if (this.modifyModeSelected !== "Hole") {
            // Hole needs to work on a selected feature, so reset the mode is not relevant
            this.featureSelectedId = null;  // we don't want to select the feature on the div when creating a new feature
          }
        })
      }
    )

    this.featuresDisplayedSubscription = this.featuresDisplayedObservable.subscribe(
      (features: Feature[]) => {
        this.toastsFeatureProperties = []
        features.forEach((feature: Feature) => {
          this.setToastFeature(feature, false)
          this.featureSelectedId = feature.get('id');

        })
      }
    )

    this.mapSubscription = this.mapService.map.subscribe(
      (map: Map) => {
        this.map = map;
      }
    );

   }

  ngOnInit(): void {
    this.sendResumeSubMenus();
    this.mapService.getMap();

    this.initSourceFeatures();
    this.initVectorLayer();

    this.mapService.changeMapInteractionStatus(true)

    // let's go to get map container and init layer(s)
    this.disableCreationMode()

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.featuresDisplayedSubscription.unsubscribe();
    this.featuresCreatedSubscription.unsubscribe();

    this.map.removeInteraction(this.modifier)

    this.mapService.resetMapView()
    this.mapService.changeMapInteractionStatus(false)

  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([]);
    this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title);
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  disableCreationMode(): void {
    this.activateDrawing(this.createModesSupported[0].mode)
  }

  initSourceFeatures(): void {
    this.sourceFeatures = new VectorSource();
  }

  initVectorLayer(): any {
    this.layerFeatures = new VectorLayer({
      source: this.sourceFeatures,
    });
    this.layerFeatures.set("name", this.layerName)

    this.drawSession = new DrawInteraction(this.map, this.layerFeatures)

    this.drawSession.sourceFeatures.on('addfeature', (event: any) => {
      this.returnExistingFeaturesAndProperties()
      this.pushFeaturesCreated([event.feature])
    });

    this.drawSession.sourceFeatures.on('changefeature', (event: any) => {
      this.displayFeature([event.feature])
    });

    this.drawSession.sourceFeatures.on('removefeature', (event: any) => {
      this.returnExistingFeaturesAndProperties()
      // TODO add a remove toast?
    });

    this.map.addLayer(this.layerFeatures)
  }

  activateDrawing(mode: string): void {


    switch (mode) {
      case "disabled": {
        this.drawSession.disableDrawing()
         break;
      }

      case "editEnabled": {
        this.drawSession.enableEditingMode()
         break;
      }


      case "Point":
      case "LineString":
      case "Polygon": {
        this.activateModifiying('disabled')
        this.selectAndDisplayFeature(null)  // unselect selected feature on div (objet)
        this.holeEnabled = false;
        this.drawSession.enabledDrawing(mode, this.holeEnabled)
         break;
      }

      default: {
         break;
      }
    }
    this.drawModeSelected = mode;

  }


  activateModifiying(mode: string): void {

    switch (mode) {
      case "disabled": {
        this.drawSession.disableDrawing()
        this.activateDrawing(mode)
         break;
      }

      case "edited": {
        this.activateDrawing('disabled')
        this.drawSession.enableEditingMode()
         break;
      }

      case "Hole": {
        this.holeEnabled = true;
        this.drawSession.enabledDrawing("Polygon", this.holeEnabled)
        this.drawModeSelected = 'Polygon';
        // this.activateDrawing('Hole')
         break;
      }

      default: {
         break;
      }
    }
    this.modifyModeSelected = mode;

  }

  returnExistingFeaturesAndProperties(): void {
    this.allFeatures = this.drawSession.returnFeatures("Properties")
    this.featuresCount = this.allFeatures.length
  }

  pushFeaturesCreated(features: Feature[]): void {
    this.featuresCreatedObservable.next(features);
  }

  displayFeature(features: Feature[]): void {
    this.featuresDisplayedObservable.next(features);
  }

  removeFeature(id: string): void {

    this.drawSession.removeFeature(id)
    this.returnExistingFeaturesAndProperties() // remove from the object panel
    this.resetToast()
    this.featureSelectedId = null

  }

  setToastFeature(feature: Feature, isNotify: boolean): any {

    let featureProperties: any = feature.getProperties()

    // get mode
    const modeSupportedFound = this.createModesSupported.filter(element => {
      return featureProperties.geometry.getType() === element.mode
    });
    featureProperties["icon"] = modeSupportedFound[0].icon

    // get id
    featureProperties["id"] = feature.getId()

    this.toastsFeatureProperties.push(featureProperties)
    console.log(isNotify)
    if (isNotify) { // TODO AAA
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
      d3.selectAll(".toastFeature").remove()
      d3.selectAll(".toastFeature")
      .attr("class", "toast toastFeature faded");
    }

  }

  selectAndDisplayFeature(featureId: string | null): any {
    // reset toast
    this.resetToast()

    if (featureId !== null) {
      this.disableCreationMode()
      const featureFound = this.sourceFeatures.getFeatureById(featureId)
      if (featureFound !== undefined) {
        this.featureSelectedId = featureFound.get('id')

        // reset the selection and set it (then the style will be updated) + it call the changefeature event !
        this.drawSession.selectClick.getFeatures().clear()
        this.drawSession.selectClick.getFeatures().push(featureFound)

        // this.displayFeature([featureFound])

        // featureFound.setStyle(highLigthStyle(featureFound))  // NO NEED ?
        // it will push a changefeature event on sourceFeatures object
      }

    } else {
      this.drawSession.selectClick.getFeatures().clear()
      this.featureSelectedId = featureId;
    }

  }

  resetToast(): void {
    this.toastsFeatureProperties = []
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

}


