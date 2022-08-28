import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { ActivityActionsService } from '../services/activity-actions.service';

@Component({
  selector: '[app-general-info]',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.scss']
})
export class GeneralInfoComponent implements OnInit, OnDestroy {

  @Input() profilData: any;
  @Input() activityTypesMetadata: any;

  inputProfilData: any;
  tabView = "job";

  activityEnablingSubscription!: Subscription;

  constructor(
    private activityActionsService: ActivityActionsService
  ) {

    this.activityEnablingSubscription = this.activityActionsService.activityId.subscribe(
      (activityId) => {
        this.tabView = activityId
      }
    )

   }

  ngOnInit(): void {
    this.inputProfilData = this.profilData

  }

  ngOnDestroy(): void {
    this.activityEnablingSubscription.unsubscribe()
  }

  enableActivity(idName: string): void {
    this.activityActionsService.setActivity(idName)
    this.tabView = idName
  }

}
