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

import { DrawInteraction, highLigthStyle } from '@modules/map-sandbox/shared/core';
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
  featureSelectedIdObservable = new Subject<string | null>(); // to indicate that a feature is selected
  featureCreatedObservable = new Subject<Feature>()
  featuresModifiedObservable = new Subject<Feature[]>()

  featureProperties: any = {};
  featuresCount: number = 0;
  toastsFeatureProperties: any[] = [];

  drawSession!: any;

  modifier!: Modify;
  draw!: Draw;
  snap!: Snap;

  disabledIcon = faXmark;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  geomTypesSupported = [
    {
      "geomType": 'editDisabled',
      "label": "Annuler/Désactiver",
      "icon": this.disabledIcon
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
  featureSelectedIdSubscription!: Subscription;

  constructor(
    private mapService: MapService,
    private controlerService: ControlerService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {

    this.featureCreatedSubscription = this.featureCreatedObservable.subscribe(
      (feature: Feature) => {
        // TODO deprecated?
        this.toastsFeatureProperties = []

        this.toastsFeatureProperties.push(
          this.setToastFeature(feature, true)
        )

      }
    )



    this.featuresModifiedSubscription = this.featuresModifiedObservable.subscribe(
      (features: Feature[]) => {
        this.toastsFeatureProperties = []
        features.forEach((feature: Feature) => {
          let featureProperties: any = {}
          featureProperties = this.setToastFeature(feature, true)
          this.toastsFeatureProperties.push(featureProperties)
          this.featureSelectedIdObservable.next(featureProperties.id)
        })
      }
    )

    this.featureSelectedIdSubscription = this.featureSelectedIdObservable.subscribe(
      (featureId: string | null) => {
        console.log("obs", featureId)
        if (this.featureSelectedId !== null) {
          // this.resetSelectedFeatureStyle(this.featureSelectedId)
        }
        this.featureSelectedId = featureId;
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
    this.featuresModifiedSubscription.unsubscribe();
    this.featureSelectedIdSubscription.unsubscribe();

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
    });
    this.layerFeatures.set("name", this.layerName)

    this.drawSession = new DrawInteraction(this.map, this.layerFeatures)

    this.drawSession.sourceFeatures.on('addfeature', (event: any) => {
      // this.selectAndDisplayFeature(event.feature.getId())
      // this.pushChangedFeatures(event)
      this.returnFeatures()
    });

    this.drawSession.sourceFeatures.on('changefeature', (event: any) => {
      this.pushChangedFeatures(event)
      // this.selectAndDisplayFeature(event.feature.getId())

    });

    this.drawSession.sourceFeatures.on('removefeature', (event: any) => {
      this.returnFeatures()
    });

    // this.map.on('pointermove', (event: any) => {
    //   // this.featureSelectedIdObservable.next(null)

    //   this.map.forEachFeatureAtPixel(event.pixel, (feature: any) => {
    //     if (feature.getId() !== undefined) {
    //       // for mouseover (select it)
    //       // this.selectAndDisplayFeature(feature.getId())
    //       return true;

    //     } else {
    //       // for mouseout (unselect it)
    //       // this.selectAndDisplayFeature(null)
    //     }
    //     // this.selectAndDisplayFeature(null)

    //     return false
    //   });
    // });



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
    this.featuresCount = this.allFeatures.length

  }

  returnFeatureCreated(): void {
    // TODO DEPRECATED
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
    this.resetToast()
    this.featureSelectedIdObservable.next(null);

  }

  setToastFeature(feature: Feature, isNotify: boolean): any {
    let featureProperties: any = feature.getProperties()

    // get geomType
    const geomTypeSupportedFound = this.geomTypesSupported.filter(element => {
      return featureProperties.geometry.getType() === element.geomType
    });
    featureProperties["icon"] = geomTypeSupportedFound[0].icon

    // get id
    featureProperties["id"] = feature.getId()

    if (this.featureSelectedId === null) { // TODO AAA
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

    return featureProperties;
  }

  selectAndDisplayFeature(featureId: string | null): any {
    // reset toast
    this.resetToast()
    // reset step with the last feature selected!
    this.resetSelectedFeatureStyle()

    if (featureId !== null) {

      const featureFound = this.sourceFeatures.getFeatureById(featureId)
      if (featureFound !== undefined) {
        this.featureSelectedIdObservable.next(featureFound.get('id'))

        // hightlighting on map
        this.drawSession.selectClick.getFeatures().clear()
        this.drawSession.selectClick.getFeatures().push(featureFound)
        // this.drawSession.selectClick.dispatchEvent({
        //   type: 'select',
        //   selected: [featureFound],
        //   deselected: []
        // });
        featureFound.setStyle(highLigthStyle(featureFound))
        // it will push a changefeature event on sourceFeatures object
      }

    } else {
      // this.featureSelectedIdObservable.next(featureId)
    }

  }


  resetSelectedFeatureStyle(): void {
    // next node style
    if (this.featureSelectedId !== null) {

      const featureFound = this.sourceFeatures.getFeatureById(this.featureSelectedId)

      if (featureFound !== undefined ) {
        featureFound.setStyle(featureFound.get('_defaultStyle'))
      }
      this.featureSelectedIdObservable.next(null)

    }

  }


  resetToast(): void {
    this.toastsFeatureProperties = []
  }

  pushChangedFeatures(event: any): void {
    let featureModified: Feature[] = []
    if (event.feature !== undefined) {
      featureModified.push(event.feature)
    } else {
      featureModified = event.features
    }
    this.returnFeaturesModified(featureModified)
  }

}


