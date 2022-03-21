import { Component, OnInit } from '@angular/core';
import { helpIcon, toolsIcon, locationIcon, lineIcon, PolygonIcon } from '../../core/inputs';


@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  toolsIcon = toolsIcon;
  locationIcon = locationIcon;
  lineIcon = lineIcon;
  PolygonIcon = PolygonIcon;

  sidebarCollapsed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
