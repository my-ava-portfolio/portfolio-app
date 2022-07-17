import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ControlerService } from '@services/controler.service';
import { MapService } from '@services/map.service';
import { Draw, Modify, Snap } from 'ol/interaction';
import VectorLayer from 'ol/layer/Vector';

import Map from 'ol/Map';
import VectorSource from 'ol/source/Vector';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';


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
  featureSelected!: string;
  featureCreatedObservable = new Subject<Feature>()
  featuresModifiedObservable = new Subject<Feature[]>()

  featureProperties: any = {}
  toastsFeatureProperties: any[] = []

  drawSession!: any;

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  editDisabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  geomTypesSupported = [
    {
      "geomType": 'editDisabled',
      "label": "Annuler/Désactiver l'édition",
      "icon": this.editDisabledIcon
    },
    {
      "geomType": 'Point',
      "label": 'Point',
      "icon": this.pointIcon
    },
    {
      "geomType": 'LineString',
      "label": 'LineString',
      "icon": this.lineStringIcon
    },
    {
      "geomType": 'Polygon',
      "label": 'Polygon',
      "icon": this.polygonIcon
    },
    {
      "geomType": 'Hole',  // works like a polygon
      "label": 'Trou',
      "icon": this.polygonIcon
    }
  ]

  geomTypeSelected = "editDisabled";
  isLegendDisplayed = true;

  mapSubscription!: Subscription;
  featureCreatedSubscription!: Subscription;
  featuresModifiedSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.featureCreatedSubscription = this.featureCreatedObservable.subscribe(
      (feature: Feature) => {
        this.toastsFeatureProperties = []

        this.toastsFeatureProperties.push(
          this.setToastFeature(feature)
        )

      }
    )



    this.featuresModifiedSubscription = this.featuresModifiedObservable.subscribe(
      (features: Feature[]) => {
        this.toastsFeatureProperties = []
        features.forEach((feature: Feature) => {
          let featureProperties: any = {}
          featureProperties = this.setToastFeature(feature)
          this.toastsFeatureProperties.push(featureProperties)

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
    this.addInteractions(this.geomTypesSupported[0].geomType)

  }

  ngOnDestroy(): void {

    this.mapSubscription.unsubscribe();
    this.featureCreatedSubscription.unsubscribe();

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

  initSourceFeatures(): void {
    this.sourceFeatures = new VectorSource();

  }

  initVectorLayer(): any {
    this.layerFeatures = new VectorLayer({
      source: this.sourceFeatures,
      style: new Style({
        fill: new Fill({
          color: '#ffcc33',
        }),
        stroke: new Stroke({
          color: 'black',
          width: 2,
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33',
          }),
          stroke: new Stroke({
            color: "black",
            width: 2,
          }),
        }),
      }),
    });
    this.layerFeatures.set("name", this.layerName)

    this.drawSession = new DrawInteraction(this.map, this.layerFeatures)

    this.drawSession.sourceFeatures.on('addfeature', (event: any) => {
      let featureModified: Feature[] = []
      if (event.feature !== undefined) {
        featureModified.push(event.feature)
      } else {
        featureModified = event.features
      }
      this.returnFeaturesModified(featureModified)

      // this.returnFeatureCreated()
      this.returnFeatures()

    });
    this.drawSession.sourceFeatures.on('changefeature', (event: any) => {
      let featureModified: Feature[] = []
      if (event.feature !== undefined) {
        featureModified.push(event.feature)
      } else {
        featureModified = event.features
      }
      this.returnFeaturesModified(featureModified)

    });

    this.drawSession.sourceFeatures.on('removefeature', (event: any) => {
      this.returnFeatures()
    });

    this.map.addLayer(this.layerFeatures)


  }

  addInteractions(geomType: string): void {

    if (geomType !== "editDisabled") {
      this.geomTypeSelected = geomType;

      if (geomType === "Hole") {
        this.holeEnabled = true;
        this.drawSession.enabledDrawing("Polygon", this.holeEnabled)

      } else {
        this.holeEnabled = false;
        this.drawSession.enabledDrawing(this.geomTypeSelected, this.holeEnabled)

      }

    } else {
      this.drawSession.disableDrawing()
      this.geomTypeSelected = geomType;

    }

  }

  returnFeatures(): void {
    this.allFeatures = this.drawSession.returnFeatures("Properties")
  }

  returnFeatureCreated(): void {
    this.featureCreatedObservable.next(this.drawSession.lastCreatedFeature);
  }

  returnFeaturesModified(features: Feature[]): void {
    this.featuresModifiedObservable.next(features);
  }

  removeFeature(id: string): void {
    // remove from the object panel
    this.allFeatures = this.allFeatures.filter((feature: any) => {
      return feature.id !== id;
    })
    this.drawSession.removeFeature(id)

  }

  setToastFeature(feature: Feature, isNotify: boolean = true): any {
    let featureProperties: any = feature.getProperties()

    // get geomType
    const geomTypeSupportedFound = this.geomTypesSupported.filter(element => {
      return featureProperties.geometry.getType() === element.geomType
    });
    featureProperties["icon"] = geomTypeSupportedFound[0].icon

    // get id
    featureProperties["id"] = feature.getId()

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
      d3.selectAll(".toastFeature")
      .attr("class", "toast toastFeature faded");
    }

    return featureProperties;
  }

  displayToast(featureId: string): any {

    this.toastsFeatureProperties = []

    let featureFound!: Feature[];
    featureFound = this.drawSession.returnFeatures("Features").filter((feature: any) => {
      return feature.getId() === featureId;
    })
    if (featureFound.length > 0) {
      // TODO could be more than 1...
      this.featureSelected = featureFound[0].get('name')

      this.toastsFeatureProperties.push(
        this.setToastFeature(featureFound[0], false)
      )
    }
  }


}


