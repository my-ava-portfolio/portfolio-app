import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

import { homePages } from '@core/inputs';


import { ControlerService } from 'src/app/services/controler.service';
import { MapService } from 'src/app/services/map.service';
import { ResumeService } from 'src/app/services/resume.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  homeTopics: any[] = homePages;

  pointsSvGLayerId = "HomePoints";
  linesSvGLayerId = "HomeLiness";

  isWelcomeCardDisplayed = true;

  generalData!: any;
  generalDataSubscription!: Subscription;

  fullSkillsThemes!: any;
  fullSkillsTechnics!: any;
  fullSkillsTools!: any;
  fullSkillsDataSubscription!: Subscription;

  legendEnabled: boolean = false;

  constructor(
    private controlerService: ControlerService,
    private resumeService: ResumeService,
    private mapService: MapService
  ) {

    // to get the data properties from routes (app.module.ts)

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      }
    );

    this.fullSkillsDataSubscription = this.resumeService.fullSkillsData.subscribe(
      (data) => {

        this.fullSkillsThemes = data.themes;
        this.fullSkillsTechnics = data.technics;
        this.fullSkillsTools = data.tools;

      }
    );

   }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
    this.resumeService.pullFullSkillsData();
    this.sendResumeSubMenus();
  }

  ngOnDestroy(): void {
    this.generalDataSubscription.unsubscribe();
    this.fullSkillsDataSubscription.unsubscribe();

    // clean all layers
    this.mapService.pullRemovePointsSvgLayerName("homePoints")

  }

  updatePage(outlet: any): any {
    this.controlerService.pullTitlePage(outlet.activatedRouteData.title)
    if (outlet.activatedRouteData.page === "sandbox") {
      this.legendEnabled = true
    } else {
      this.legendEnabled = false
    };
  }


  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus(this.homeTopics)
  }

  showHideWelcomeCard(): void {
    this.isWelcomeCardDisplayed = !this.isWelcomeCardDisplayed;
  }

  createPointsSvgLayer(enabled: boolean): void {
    console.log(enabled)
    if (enabled) {
      this.mapService.pullPointsSvgLayerName("homePoints")
    } else {
      this.mapService.pullRemovePointsSvgLayerName("homePoints")
    }
  }

  createLinesSvgLayer(enabled: boolean): void {
    console.log(enabled)
    if (enabled) {
      this.mapService.pullLinesSvgLayerName("homeLines")
    } else {
      this.mapService.pullRemoveLinesSvgLayerName("homeLines")
    }
  }

}
