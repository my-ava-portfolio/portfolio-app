import { Component, Input, OnInit } from '@angular/core';
import { ActivityActionsService } from '../services/activity-actions.service';



@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit {

  @Input() profilData: any;
  @Input() activityTypesMetadata: any;


  inputProfilData: any;
  tabView = "job";

  constructor(
    private activityActionsService: ActivityActionsService
  ) { }

  ngOnInit(): void {
    this.inputProfilData = this.profilData

  }

  enableActivity(idName: string): void {
    this.activityActionsService.setActivity(idName)
    this.tabView = idName
  }

}
