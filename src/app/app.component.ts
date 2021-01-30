import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import * as L from 'leaflet';
import 'leaflet/dist/images/marker-shadow.png';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  title = 'portfolio';

  private InitialViewCoords: any = [44.896741, 4.932861];
  private zoomValue = 8;
  private osmLayer: any = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.png', {
    maxZoom: 13,
    minZoom: 8
  });


  navBarEnabled = true
  footerBarEnabled = true
  map: any;

  constructor(private router: Router) {

    router.events.subscribe( (event) => {
      this.changeHomeBarsStatus(router)
    });

  }

  ngOnInit(): void {
    this.initMap()
  }

  changeHomeBarsStatus(router: any): void {
    if (router.url.includes("home")) {
      this.navBarEnabled = false
      this.footerBarEnabled = false
    }
  }

  initMap(): void {
    this.map = L.map('map', {
      center: this.InitialViewCoords,
      zoom: this.zoomValue,
      zoomControl: false,
    }).addLayer(this.osmLayer);
  }

}
