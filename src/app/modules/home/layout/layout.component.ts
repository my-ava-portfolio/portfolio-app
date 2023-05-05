import { Component, OnInit } from '@angular/core';
import { fadeInOutAnimation } from '@core/animation_routes';
import { homePages } from '@core/globals/topics_skeleton';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit {

  homeTopics = homePages;

  constructor( ) { }

  ngOnInit(): void { }

}

