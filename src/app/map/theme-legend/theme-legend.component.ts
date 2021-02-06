import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-theme-legend',
  templateUrl: './theme-legend.component.html',
  styleUrls: ['./theme-legend.component.css']
})
export class ThemeLegendComponent implements OnInit {
  @Input() map: any;

  constructor() { }

  ngOnInit(): void {
    console.log('map!', this.map);
  }

}
