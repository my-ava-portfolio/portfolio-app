import { Component, Input, OnInit } from '@angular/core';
import { topicIcon } from '../../core/inputs';

@Component({
  selector: 'app-centerbar-presentation',
  templateUrl: './centerbar-presentation.component.html',
  styleUrls: ['./centerbar-presentation.component.css']
})
export class CenterbarPresentationComponent implements OnInit {
  @Input() summaryData!: any;
  @Input() qualitiesData!: any;


  inputSummaryData!: any;
  inputQualitiesData!: any;

  // icons
  topicIcon = topicIcon;

  constructor() { }

  ngOnInit(): void {
    this.inputSummaryData = this.summaryData;
    this.inputQualitiesData = this.qualitiesData;
  }

}
