import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Subject } from 'rxjs';
import { featuresLayerType, geomLayerTypes } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class EditComputingService {
  newFeatures: Subject<featuresLayerType> = new Subject<featuresLayerType>();
  snappingLayerEnabled: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  addNewFeatures(event: featuresLayerType): void {
    this.newFeatures.next(event);
  }

  activateSnapping(event: boolean): void {
    this.snappingLayerEnabled.next(event);
  }
}
