import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { navBarIcon, subMenuIcon } from '../../core/inputs';

import { ControlerService } from '../../services/controler.service';


@Component({
  selector: 'app-control-bar',
  templateUrl: './control-bar.component.html',
  styleUrls: ['./control-bar.component.scss']
})
export class ControlBarComponent implements OnInit, OnDestroy {
  @Output() sideBarCollapsedEmit = new EventEmitter<boolean>();
  @Input() sideBarCollapsed!: boolean;

  navBarIcon = navBarIcon;
  subMenuIcon = subMenuIcon;

  pageTitle!: string;
  subMenus!: any;

  controlerPageTitleSubscription!: Subscription;
  controlerSubMenusSubscription!: Subscription;

  constructor(
    private controlerService: ControlerService,
  ) {

    this.controlerSubMenusSubscription = this.controlerService.subMenuFeatures.subscribe(
      (data) => {
        this.subMenus = data;
        console.log(this.subMenus)
      },
      (error) => {
        console.log('error');
      }
    );

    this.controlerPageTitleSubscription = this.controlerService.titlePageFeature.subscribe(
      (data) => {
        this.pageTitle = data;
        console.log(this.pageTitle)
      },
      (error) => {
        console.log('error');
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

}
