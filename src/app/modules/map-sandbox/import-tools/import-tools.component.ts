import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { layerHandler } from '@modules/map-sandbox/shared/core';
import WKT from 'ol/format/WKT';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';

@Component({
  selector: 'app-import-tools',
  templateUrl: './import-tools.component.html',
  styleUrls: ['./import-tools.component.scss']
})
export class ImportToolsComponent implements OnInit, OnDestroy {
  @Input() epsgAvailable!: string[];
  @Input() currentEpsg!: string;
  @Input() existingLayers!: layerHandler[];

  @Output() featuresToNewLayerEvent = new EventEmitter<any>();
  @Output() featuresToAppendEvent = new EventEmitter<{layerId: any, features: any}>();

  loadIcon = faUpload;

  importModes = [
    {
      "mode": 'GeoJSON',
      "label": 'Importer un GeoJSON',
      "label_text": "GeoJSON",
      "icon": this.loadIcon
    },
    {
      "mode": 'WKT',
      "label": 'Importer un/des WKT(s)',
      "label_text": "WKT(s)",
      "icon": this.loadIcon
    },
  ]
  componentRemoved: boolean = false;
  importDataType!: string;
  strInputDataValues: string | null = null;
  strInputEpsgInput: string | null = null;
  modeImportInput: string = 'newLayer';

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentRemoved = true;
  }
  
  setImportDataType(dataType: string): void {
    this.importDataType = dataType;
  }

  importFromFormat(): void {
    let featureParams = {}
    if (this.strInputEpsgInput !== this.currentEpsg) {
      featureParams = {
        dataProjection: this.strInputEpsgInput,
        featureProjection: this.currentEpsg
      }
    }

    let featuresToAdd: any;

    if (this.strInputDataValues !== null) {
      if (this.importDataType === "GeoJSON") {
        featuresToAdd = readGeoJsonAndGroupedByGeomType(this.strInputDataValues, featureParams)
      } else if (this.importDataType === "WKT(s)") {
        featuresToAdd = readStringWktAndGroupedByGeomType(this.strInputDataValues.split('\n'), featureParams)
      }

      if (this.modeImportInput === 'newLayer') {
        this.featuresToNewLayerEvent.emit(featuresToAdd)
      } else {
        const layerIdToAppend = this.modeImportInput
        this.featuresToAppendEvent.emit({ layerId: layerIdToAppend, features: featuresToAdd })
      }
    }

    this.strInputDataValues = null;
    this.strInputEpsgInput = null;
    this.modeImportInput = 'newLayer';
  }

}


function readGeoJsonAndGroupedByGeomType(geoData: string, featureParams: any): any {
  let featuresGroupedByGeom = {}
  const vectorSource = new VectorSource({
    features: new GeoJSON().readFeatures(JSON.parse(geoData, featureParams))
  });

  const features = vectorSource.getFeatures()
  featuresGroupedByGeom = groupByGeomType(features)
  
  return featuresGroupedByGeom

}

function readStringWktAndGroupedByGeomType(inputWkts: string[], featureParams: any): any {
  let featuresGroupedByGeom: any = {}
  inputWkts.forEach((wktValue: string) => {
    // POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))
    let feature!: any;
    try {
      feature = new WKT().readFeature(wktValue, featureParams);
    } catch (error: any) { // TODO catch the expected exception
      alert(error.message)
    }

    if (feature !== undefined && !feature.getGeometry().flatCoordinates.includes(NaN) ) {
      // NaN check appears if the projection is not well defined
      const featureGeom = feature.getGeometry();
      const featureGeomType: string = featureGeom.getType()
      if (!( featureGeomType in featuresGroupedByGeom)) {
        featuresGroupedByGeom[featureGeomType] = []
      }

      if (featureGeom !== undefined) {
        featuresGroupedByGeom[featureGeomType].push(feature)
      }
    }
    // TODO add gui warning if something wrong appears with geom
    // => need to create a dedicated component

  })
  return featuresGroupedByGeom
}

function groupByGeomType(objectArray: any[]) {
  return objectArray.reduce((acc: any, obj: any) => {
    let key = obj.getGeometry().getType();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
