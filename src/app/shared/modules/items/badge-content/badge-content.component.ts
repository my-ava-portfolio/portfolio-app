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

}
