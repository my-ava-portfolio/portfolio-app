import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { layerHandler } from '../../layer-handler/layer-handler';
import { Fill } from 'ol/style';

@Component({
  selector: 'app-widget-color',
  templateUrl: './widget-color.component.html',
  styleUrls: ['./widget-color.component.scss']
})
export class WidgetColorComponent {
  @Input() fillColor!: string;
  @Input() strokeColor!: string;
  @Input() strokeWidth!: string;

  @Output() fillColorEvent = new EventEmitter<string>();
  @Output() strokeColorEvent = new EventEmitter<string>();
  @Output() strokeWidthEvent = new EventEmitter<string>();

  setFillColor(color: string): void {
    this.fillColor = color;
    this.fillColorEvent.emit(color)
  }

  setStrokeColor(color: string): void {
    this.strokeColor = color;
    this.strokeColorEvent.emit(color)
  }

  setStrokeWidth(width: string): void {
    this.strokeWidth = width;
    this.strokeWidthEvent.emit(width)
  }
}
