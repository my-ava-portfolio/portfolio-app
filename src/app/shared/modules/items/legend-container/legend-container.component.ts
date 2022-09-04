import { Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';
import { tagIcon, centerIcon } from '@core/inputs';
import { MapService } from '@services/map.service';

@Component({
  selector: 'set-legend-container',
  templateUrl: './legend-container.component.html',
  styleUrls: ['./legend-container.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LegendContainerComponent implements OnInit {

  @ContentChild('buttonsTemplate') buttonsTmplt!: TemplateRef<any>;

  tagIcon = tagIcon;
  centerIcon = centerIcon;
  
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
