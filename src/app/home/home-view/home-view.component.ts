import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {

  quarter1Selected = false;
  quarter2Selected = false;
  quarter3Selected = false;
  quarter4Selected = false;

  constructor() {
  }

  ngOnInit(): void {
  }

}
