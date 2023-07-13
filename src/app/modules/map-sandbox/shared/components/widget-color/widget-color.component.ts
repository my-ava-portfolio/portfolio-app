import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-widget-color',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-color.component.html',
  styleUrls: ['./widget-color.component.scss']
})
export class WidgetColorComponent {
  @Input() fillColor!: string;
  @Input() strokeColor!: string;
  @Input() strokeWidth!: number;

  @Output() fillColorEvent = new EventEmitter<string>();
  @Output() strokeColorEvent = new EventEmitter<string>();
  @Output() strokeWidthEvent = new EventEmitter<number>();

  setFillColor(color: string): void {
    this.fillColor = color;
    this.fillColorEvent.emit(color)
  }

  setStrokeColor(color: string): void {
    this.strokeColor = color;
    this.strokeColorEvent.emit(color)
  }

  setStrokeWidth(width: string): void {
    this.strokeWidth = parseFloat(width);
    this.strokeWidthEvent.emit(this.strokeWidth)
  }
}
