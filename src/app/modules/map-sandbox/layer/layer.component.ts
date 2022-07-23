import { findElementBy, layerHandler } from '@modules/map-sandbox/shared/core';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { faCircle, faCirclePlus, faCircleQuestion, faDrawPolygon, faGear, faLayerGroup, faPencil, faWaveSquare, faXmark } from '@fortawesome/free-solid-svg-icons';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss']
})
export class LayerComponent implements OnInit {
  @Input() layer!: layerHandler;
  @Input() currentLayerIdSelected!: string;
  @Output() layerSelectedId = new EventEmitter<string>();

  groupIcon = faLayerGroup;
  helpIcon = faCircleQuestion;
  addIcon = faCirclePlus;
  editIcon = faPencil;
  paramIcon = faGear;
  disabledIcon = faXmark;
  EditIcon = faCircle;
  pointIcon = faCircle;
  lineStringIcon = faWaveSquare;
  polygonIcon = faDrawPolygon;

  isDrawn: boolean = false;
  isEdited: boolean = false;
  isShown: boolean = false;

  layerSelected: boolean = false;
  featureIdSelected: string | number | undefined | null = null;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {

    // enable selecting
    this.layer.enableSelecting()

    // set select event
    this.layer.select.on("select", (event: any) => {
      let deselected = event.deselected
      let selected = event.selected

      if (deselected.length > 0 && selected.length === 0) {
        deselected.forEach((_: any) => {
          this.selectFeature(null)
        })
      }

      if (selected.length > 0) {
        selected.forEach((feature: any) => {
          this.selectFeature(feature.getId())
        })
      }
    })


  }

  ngOnDestroy(): void {
    this.elementRef.nativeElement.remove();

    this.resetInteractions()
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.currentLayerIdSelected.currentValue !== this.layer.id) {
      this.resetInteractions()
    }

  }


  removeLayer(): void {
    this.layer.removeLayer()
    this.ngOnDestroy()
  }

  editHandler(status: boolean): void {
    if (status) {
      this.drawHandler(false) // disable draw tool
      this.editFeatureEnable()
    } else {
      this.editFeatureDisable()
    }
  }

  drawHandler(status: boolean, holeStatus: boolean = false): void {
    if (status) {
      this.editHandler(false) // disable edit tool
      this.addFeatureEnable(holeStatus)
    } else {
      this.addFeatureDisable()
    }
  }

  selectLayer(): void {
    this.layerSelected = !this.layerSelected
    this.layerSelectedId.emit(this.layer.id)
  }

  selectFeature(featureId: string | null): void {
    this.featureIdSelected = featureId
    // TODO reset toast
    if (featureId !== null) {
      let feature = this.getFeature(featureId)
      this.layer.select.getFeatures().clear()
      this.layer.select.getFeatures().push(feature)
    }
  }

  private resetInteractions(): void {
    this.drawHandler(false)
    this.editHandler(false)
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

  private getFeature(featureId: string): any {
    let features = this.layer.features().filter((feature: any) => {
      return feature.getId() === featureId
    })
    if (features.length === 1) {
      return features[0]
    }
    return null
  }


}
