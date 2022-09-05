import { Component, Input, OnInit } from '@angular/core';
import { getConstract } from '@core/colors';

@Component({
  selector: 'set-badge-content',
  templateUrl: './badge-content.component.html',
  styleUrls: ['./badge-content.component.scss']
})
export class BadgeContentComponent implements OnInit {
  @Input() title!: any;
  @Input() url!: string;
  @Input() icon!: any;
  @Input() customBgColor!: any;
  @Input() classes: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }


  getConstract(hexColor: string): 'black' | 'white' {
    return getConstract(hexColor)
  }

}
