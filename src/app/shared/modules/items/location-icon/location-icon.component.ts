import { Component, Input, OnInit } from '@angular/core';
import { locationIcon } from '@core/inputs';

@Component({
  selector: 'set-location-icon',
  templateUrl: './location-icon.component.html',
  styleUrls: ['./location-icon.component.scss']
})
export class LocationIconComponent implements OnInit {
  @Input() mainRoute!: string;
  @Input() specificRoute!: string;
  @Input() fragment!: string;
  @Input() title!: string;
  @Input() classes!: string;
  @Input() icon!: any;

  locationIcon = locationIcon;


  constructor() { }

  ngOnInit(): void {
  }

}
