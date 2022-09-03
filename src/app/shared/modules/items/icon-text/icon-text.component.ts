import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'set-icon-text',
  templateUrl: './icon-text.component.html',
  styleUrls: ['./icon-text.component.scss']
})
export class IconTextComponent implements OnInit {
  @Input() route!: string;
  @Input() fragment!: string;
  @Input() title!: string;
  @Input() classes!: string;
  @Input() iconInput!: any;

  
  constructor() { }

  ngOnInit(): void {
  }

}
