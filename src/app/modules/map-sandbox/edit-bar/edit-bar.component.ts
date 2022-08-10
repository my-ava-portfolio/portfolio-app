import { Component, Input, OnInit } from '@angular/core';

import { faUpload, faCircle, faCirclePlus, faDrawPolygon, faGear, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons';

import { layerHandler } from '@modules/map-sandbox/shared/core';

import WKT from 'ol/format/WKT';
import GeoJSON from 'ol/format/GeoJSON';

import VectorSource from 'ol/source/Vector';


@Component({
  selector: 'app-edit-bar',
  templateUrl: './edit-bar.component.html',
  styleUrls: ['./edit-bar.component.scss']
})
export class EditBarComponent implements OnInit {
  @Input() layerContainer!: layerHandler | null;
  @Input() currentEpsg!: string;

  layer!: layerHandler;

  currentLayerIdSelected!: string;

  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  EditIcon = faCircle;
  polygonIcon = faDrawPolygon;
  loadIcon = faUpload;

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;
  isHole: boolean = false;

  // wkt import
  epsgAvailable = ["EPSG:4326", "EPSG:3857"]; //TODO refactor
  strInputDataValues: string | null = null;
  strInputEspgInput: string | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (!changes.layerContainer.firstChange) {
      this.resetPreviousSelectedLayer(changes.layerContainer.previousValue)
    }
    this.layer = changes.layerContainer.currentValue

  }

  resetPreviousSelectedLayer(previousLayer: layerHandler): void {
    this.layer = previousLayer

    // this.resetFeaturesPopups()
    this.drawHoleHandler(false)
    this.drawHandler(false)
    this.editHandler(false)
    this.unSelectFeature()
  }


  unSelectFeature(): void {
      // this.featureIdSelected = 'none'
      this.layer.select.getFeatures().clear()

  }

  removeFeature(): void {
  }

  editHandler(status: boolean): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.drawHoleHandler(false) // disable hole draw tool

      this.editFeatureEnable()
    } else {
      this.editFeatureDisable()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.editHandler(false) // disable edit tool
      this.drawHoleHandler(false) // disable hole draw tool

      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
    }
  }

  drawHoleHandler(status: boolean, holeStatus: boolean = true): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.editHandler(false) // disable edit tool

      this.addHoleFeatureEnable(holeStatus)
    } else {
      this.addHoleFeatureDisable()
    }
  }

  private addFeatureEnable(holeStatus: boolean = false): void {
    this.layer.enableDrawing(holeStatus);
    this.isDrawn = true;
  }

  private addFeatureDisable(): void {
    this.layer.disableDrawing();
    this.isDrawn = false;
  }

  private editFeatureEnable(): void {
    this.layer.enableEditing()
    this.isEdited = true;
  }

  private editFeatureDisable(): void {
    this.layer.disableEditing()
    this.isEdited = false
  }

  private addHoleFeatureEnable(holeStatus: boolean = true): void {
    this.layer.enableDrawing(holeStatus);
    this.isHole = true;
  }
  private addHoleFeatureDisable(): void {
    this.layer.disableDrawing();
    this.isHole = false;
  }


  moveWktModalToBody(): void {
    // TODO create a global function
    let modalLayerDiv = document.getElementById('modalWktLayer-'+ this.layer.id);
    if (modalLayerDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(modalLayerDiv)

      }
    }
  }

  moveGeoJsonModalToBody(): void {
    // TODO create a global function
    let modalLayerDiv = document.getElementById('modalGeoJsonLayer-'+ this.layer.id);
    if (modalLayerDiv !== null) {

      let bodyDiv = document.body;
      if (bodyDiv !== null) {
        bodyDiv.appendChild(modalLayerDiv)

      }
    }
  }

  addGeoJSON(): void {

    let featureParams = {}
    if (this.strInputEspgInput !== this.currentEpsg) {
      featureParams = {
        dataProjection: this.strInputEspgInput,
        featureProjection: this.currentEpsg
      }
    }

    let featuresToAdd: any[] = [];

    if (this.strInputDataValues !== null) {
      const vectorSource = new VectorSource({
        features: new GeoJSON().readFeatures(JSON.parse(this.strInputDataValues), featureParams),
      });
      vectorSource.getFeatures().forEach((element: any) => {
        if (element.getGeometry().getType() === this.layer.geomType) {
          featuresToAdd.push(element)
        }
      })
      this.layer.addFeaturesFromGeomFeatureWithoutProperties(featuresToAdd)

    }
    this.clearStrInputDataDialog()

  }

  addWkt(): void {

    let featureParams = {}
    if (this.strInputEspgInput !== this.currentEpsg) {
      featureParams = {
        dataProjection: this.strInputEspgInput,
        featureProjection: this.currentEpsg
      }
    }

    let featuresToAdd: any[] = [];

    if (this.strInputDataValues !== null) {

      const wktString: string[] = this.strInputDataValues.split('\n');

      wktString.forEach((wktValue: string) => {
        // POLYGON((10.689 -25.092, 34.595 -20.170, 38.814 -35.639, 13.502 -39.155, 10.689 -25.092))
        let feature!: any;
        try {

          feature = new WKT().readFeature(wktValue, featureParams);
        } catch (error: any) { // TODO catche the expected exception
          alert(error.message)
        }

        if (feature !== undefined) {
          const featureGeomType = feature.getGeometry();

          if (featureGeomType !== undefined) {
            if (featureGeomType.getType() !== this.layer.geomType) {
              alert('Only ' + this.layer.geomType + " are supported on your selected layer")
              return;
            } else {
              featuresToAdd.push(feature)
            }
          }
        }

      })

      this.layer.addFeaturesFromGeomFeatureWithoutProperties(featuresToAdd)
      this.clearStrInputDataDialog()

    }

  }

  clearStrInputDataDialog(): void {
    this.strInputDataValues = null;
    this.strInputEspgInput = null;
  }

}
