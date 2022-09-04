import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
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
  // WARNING: important to set the element position (ex: fixed for apps map & sticky for grid)
  @Input() classes!: string;
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
