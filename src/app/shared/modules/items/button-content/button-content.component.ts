import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'set-button-content',
  templateUrl: './button-content.component.html',
  styleUrls: ['./button-content.component.scss']
})
export class ButtonContentComponent implements OnInit {
  @Input() classes!: string;
  @Input() iconClasses!: string;
  @Input() iconNgStyle!: any;

  @Input() route?: string;
  @Input() url?: string;

  @Input() icon?: any;

  constructor() { }

  ngOnInit(): void {
  }

}
