import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navBarIcon } from '../../core/inputs';

@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.css']
})
export class ControlBarComponent implements OnInit {
  @Output() sideBarCollapsedEmit = new EventEmitter<boolean>();

  // Here to set the default status of the bar
  // TODO check the orientation to collapse or not the bar
  sideBarCollapsed: boolean = true;
  navBarIcon = navBarIcon;

  constructor() { }

  ngOnInit(): void {
    this.sideBarCollapseUpdated()

  }

  sideBarCollapseUpdated(): void {
    this.sideBarCollapsed = !this.sideBarCollapsed
    console.log(this.sideBarCollapsed)
    this.sideBarCollapsedEmit.emit(this.sideBarCollapsed);
  }

}
