import { Component, EventEmitter, Input, Output } from '@angular/core';
import Feature from 'ol/Feature';

@Component({
  selector: 'app-widget-table',
  templateUrl: './widget-table.component.html',
  styleUrls: ['./widget-table.component.scss']
})
export class WidgetTableComponent {

  @Input() attributesHeaders!: string[];
  @Input() features!: Feature[];

  @Output() edited = new EventEmitter<boolean>();


  sendEditedEvent(): void {
    this.edited.emit(true)
  }
}
