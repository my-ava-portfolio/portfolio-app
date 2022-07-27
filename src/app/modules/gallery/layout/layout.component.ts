import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { apiMapsUrl, experiencesPages, minWidthLandscape } from '@core/inputs';

import { GalleryService } from '@services/gallery.service';
import { MainService } from '@services/main.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { pythonIcon, tagsIcon, tagIcon, chartItemIcon, mapIcon, videoItemIcon, appItemIcon, toolItemIcon, methodoIcon } from '@core/inputs';

import { ControlerService } from '@services/controler.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { fadeInOutAnimation } from '@core/animation_routes';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy {
  experiencesRoute: string = experiencesPages.route;

  // TODO create a route to get all activities titles
  currentDate: number = new Date().getFullYear();
  defaultActivity: string | null = null;
  currentActivity: string | null = null;

  defaultCategory: string | null = null;
  currentCategory: string | null = null;

  isLegendDisplayed = true;
  tagsIcon = tagsIcon;
  tagIcon = tagIcon;

  category!: string | null;
  activities!: string[];
  mediaTypes!: string[];
  defaultType: string | null = null;
  currentType: string | null = null;

  apiMapsUrl = apiMapsUrl;
  galleryItems!: any;

  innerRoutesAvailable: string[] = ['map/app/']; // to redirect on the routes portolio
  isDataAvailable = false;

  fragment: string | null = null;

  typeStyleMapping: any = {
    chart: { icon: chartItemIcon, title: 'Graphiques & tableaux' },
    video: { icon: videoItemIcon, title: 'Vidéos' },
    map: { icon: mapIcon, title: 'Cartes' },
    app: { icon: appItemIcon, title: 'Applications' },
    tool: { icon: toolItemIcon, title: 'Outils' },
    library: { icon: pythonIcon, title: 'Libraries' },
    methodo: { icon: methodoIcon, title: 'Méthodologies'}
  };

  categoriesActivity: any = {
    job: 'Expériences',
    personal_project: 'Projet personnel',
    volunteer: 'Bénévolat'
  };

  activitiesGallerySubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;

  constructor(
    private galleryService: GalleryService,
    private mainService: MainService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
    ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment !== undefined) {
          this.fragment = fragment;
        }
      }
    );

    this.activitiesGallerySubscription = this.galleryService.activitiesGalleryData.subscribe(
      (data) => {
        this.galleryItems = data.items;
        this.mediaTypes = data.media_types_available;
        this.activities = data.activities;
        this.currentCategory = data.current_category;
        this.isDataAvailable = true;
      }
    );

  }

  ngOnInit(): void {
    this.sendResumeSubMenus()
    this.resetGallery();
    this.filterFromAnchor();

  }

  ngOnDestroy(): void {
    this.activitiesGallerySubscription.unsubscribe();
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

  filterFromAnchor(): void {
    try {
      if (this.fragment !== null) {
        this.getGalleryDataByActivity(this.fragment.replace('#', ''));
      }
    } catch (e) {
      // console.log('anchor scrolling error');
    }
  }


  resetGallery(): any {
    this.currentActivity = this.defaultActivity;
    this.currentCategory = this.defaultCategory;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByActivity(activityName: string | null): any {
    this.currentActivity = activityName;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByCategory(categoryName: string | null): any {
    this.currentCategory = categoryName;
    this.currentActivity = this.defaultActivity;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByType(typeName: string | null): any {
    this.currentType = typeName;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.mainService.scrollToTopAction()
  }


  @HostListener('window:orientationchange', ['$event'])
  displayContentRegardingDeviceScreen(): void {
    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.isLegendDisplayed = false;
    }
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  urlAppChecker(url: string): boolean {
    let urlIsAnInnerUrl: boolean = false;
    this.innerRoutesAvailable.forEach((innerUrl: string) => {
      if (url.includes(innerUrl)) {
        urlIsAnInnerUrl = true
      }
    });
    return urlIsAnInnerUrl;
  }

}


