import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Subject } from 'rxjs';
import { featuresLayerType, geomLayerTypes } from '../data-types';

@Injectable({
  providedIn: 'root'
})
export class EditComputingService {
  newFeatures: Subject<featuresLayerType> = new Subject<featuresLayerType>();
  featureIdEdited: Subject<string | null> = new Subject<string | null>();

  constructor() { }

  addNewFeatures(event: featuresLayerType): void {
    this.newFeatures.next(event);
  }

  sendFeatureIdEdited(event: string | null): void {
    this.featureIdEdited.next(event);
  }
}
