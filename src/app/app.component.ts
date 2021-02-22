import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  isPortraitDeviceMode = true;
  currentPage!: string;

  constructor(
    private router: Router,
    private location: Location
  ) {

    // to get the current page opened
    this.router.events.subscribe(_ => {
      this.currentPage = this.location.path();
      this.displayOrientationAlert()
    });
  }

  ngOnInit(): void {
  }

  displayOrientationAlert(): void {
    if (window.screen.orientation.angle === 90) {
      if (this.currentPage === '/map') {
        this.isPortraitDeviceMode = false;
      }
    } else {
      this.isPortraitDeviceMode = true;
    }
  }


  // to display an alert message about device orientation
  @HostListener('window:orientationchange', ['$event']) onOrientationChange(event: any): void {
    this.displayOrientationAlert();
  }


}
