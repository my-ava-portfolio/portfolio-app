import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { navBarIcon, subMenuIcon } from '@core/inputs';

import { ControlerService } from '@services/controler.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit, OnDestroy {
  @Output() sideBarCollapsedEmit = new EventEmitter<boolean>();
  @Input() sideBarCollapsed!: boolean;
  @Input() subMenuBarEnabled!: boolean;

  navBarIcon = navBarIcon;
  subMenuIcon = subMenuIcon;

  pageTitle!: string;
  topicPages!: any;
  topicPagesSubMenus: any[] = [];

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
        if (data.sub_menus) {
          this.topicPagesSubMenus = data.sub_menus;
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
