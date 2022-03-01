import { Component, Input, OnInit } from '@angular/core';
import { presIcon, expandIcon } from '../../core/inputs';


@Component({
  selector: 'app-presentation-bar',
  templateUrl: './presentation-bar.component.html',
  styleUrls: ['./presentation-bar.component.scss']
})
export class PresentationBarComponent implements OnInit {
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
