import { Component, Input, OnInit } from '@angular/core';

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
    const rgbValues: string[] | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor)

    if (rgbValues) {
      const red = parseInt(rgbValues[1]);
      const green = parseInt(rgbValues[2]);
      const blue = parseInt(rgbValues[3]);
  
      const contrastLimit = Math.round((red * 299 + green * 587 + blue * 114) / 1000);
  
      if (contrastLimit > 125) {
        return 'black';
      } else {
        return 'white';
      }
    }

    return 'white'
  }

}
