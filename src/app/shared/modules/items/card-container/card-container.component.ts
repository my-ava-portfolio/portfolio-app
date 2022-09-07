import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'set-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss']
})
export class CardContainerComponent implements OnInit {
  @ContentChild('cardBodyTemplate') cardBodyTmplt!: TemplateRef<any>;
  @ContentChild('cardFooterTemplate') cardFooterTmplt!: TemplateRef<any>;

  @Input() cardClass!: string;

  @Input() title!: string;
  @Input() headerClass!: string;
  @Input() headerNgStyle!: any;

  constructor() { }

  ngOnInit(): void {
  }

}
