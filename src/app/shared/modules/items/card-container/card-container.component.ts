import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'set-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @Input() title!: string;
  @Input() colorName!: string;
  @Input() classes!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
