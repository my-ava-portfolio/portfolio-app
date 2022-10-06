import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { ControlerService } from '@services/controler.service';
import { Router } from '@angular/router';
import { faAlignLeft, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import { activityFeature } from '@core/data-types';


@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit, OnDestroy {
  @Output() sideBarCollapsedEmit = new EventEmitter<boolean>();
  @Input() sideBarCollapsed!: boolean;
  @Input() subMenuBarEnabled!: boolean;

  navBarIcon = faAlignLeft;
  subMenuIcon = faAlignJustify;

  pageTitle!: string;
  topicPages!: any;
  topicPagesSubMenus: activityFeature[] = [];
  mainRoute!: string;

  controlerPageTitleSubscription!: Subscription;
  controlerSubMenusSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
    private router: Router,
  ) {

    this.router.events.subscribe(_ => {
      this.subMenuBarEnabled = false;
    });

    this.controlerSubMenusSubscription = this.controlerService.subMenuFeatures.subscribe(
      (data) => {
        this.topicPages = data;
        if (data.length > 0) {
          this.mainRoute = this.router.url;
          this.topicPagesSubMenus = data;
        } else {
          // to reset the control bar anchors
          this.topicPagesSubMenus = data
        }
      }
    );

    this.controlerPageTitleSubscription = this.controlerService.titlePageFeature.subscribe(
      (data) => {
        this.pageTitle = data;
      }
    );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.controlerSubMenusSubscription.unsubscribe();
    this.controlerPageTitleSubscription.unsubscribe();
  }

  sideBarCollapseUpdated(): void {
    this.sideBarCollapsed = !this.sideBarCollapsed
    this.sideBarCollapsedEmit.emit(this.sideBarCollapsed);
  }

  showHideSubMenuBar(): void {
    this.subMenuBarEnabled = !this.subMenuBarEnabled
  }

}
