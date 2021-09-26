import { Component, Input, OnInit } from '@angular/core';
import { presIcon, expandIcon } from '../../core/inputs';

@Component({
  selector: 'app-centerbar-presentation',
  templateUrl: './centerbar-presentation.component.html',
  styleUrls: ['./centerbar-presentation.component.css']
})
export class CenterbarPresentationComponent implements OnInit {
  @Input() summaryData!: any;
  @Input() qualitiesData!: any;

  cardEnabled = true;

  inputSummaryData!: any;
  inputQualitiesData!: any;

  // icons
  presIcon = presIcon;
  expandIcon = expandIcon;

  constructor() { }

  ngOnInit(): void {
    this.inputSummaryData = this.summaryData;
    this.inputQualitiesData = this.qualitiesData;
  }

}
