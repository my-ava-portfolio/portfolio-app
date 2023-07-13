import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { MapService } from '@services/map.service';

@Component({
  selector: 'set-legend-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss'],
})
export class LegendContainerComponent implements OnInit {
  // WARNING: important to set the element position (ex: fixed for apps map & sticky for grid)
  @Input() classes!: string;
  @ContentChild('buttonsTemplate') buttonsTmplt!: TemplateRef<any>;
  @ContentChild('controlersTemplate') controlersTmplt!: TemplateRef<any>;

  // bootstrap icon
  tagIcon = "bi bi-bookmarks-fill";

  isLegendDisplayed: boolean = true;

  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  zoomOnData(): void {
    this.mapService.sendZoomAction();
  }

}
