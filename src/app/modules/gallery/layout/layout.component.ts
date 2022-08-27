import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { assetsImagesPath, experiencesPages, minWidthLandscape } from '@core/inputs';

import { GalleryService } from '@services/gallery.service';
import { MainService } from '@services/main.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { pythonIcon, tagsIcon, tagIcon, chartItemIcon, mapIcon, videoItemIcon, appItemIcon, toolItemIcon, methodoIcon } from '@core/inputs';

import { ControlerService } from '@services/controler.service';
import { fadeInOutAnimation } from '@core/animation_routes';
import { galleryFeature } from '@core/data-types';


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

  assetsImagesPath = assetsImagesPath;
  galleryItems: galleryFeature[] = [];

  innerRoutesAvailable: string[] = ['maps/app/']; // to redirect on the routes portolio
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
  featureTypes: any = { // TODO improvments needed: return info from the API
    youtube: 'video',
    url_img: 'modal',
    url_app: 'website',
    api_img: 'modal'
  }

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
        this.galleryItems = []

        data.items.forEach((feature: any) => {
          this.galleryItems.push(this.buildFeature(feature))
        })
        console.log(this.galleryItems)
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


  buildFeature(feature: any): galleryFeature {
    let img_url = feature.media_splash
    if ([null, 'nan'].includes(img_url)) { // TODO github image return 'nan'... check api
      img_url = feature.media
    }
    if (!img_url.includes('http')) {
      img_url = assetsImagesPath + img_url
    }
    if (!feature.media.includes('http') && this.featureTypes[feature.source] === 'modal') { // TODO use url... OR add it on asset
      feature.media = assetsImagesPath + feature.media
    }

    let addons: any = {};
    if (feature.data) {
      addons['Données'] = feature.data;
    }
    if (feature.tools) {
      addons['Outils'] = feature.tools;
    }

    return {
      id: feature.identifier,
      title: feature.title,
      image_url: img_url,
      content_url: feature.media,
      categories: [],
      tags: [],
      activityType: { name: this.categoriesActivity[feature.category], class: feature.category },
      experienceName: { name: feature.name, color: feature.color },
      mediaType: { name: feature.type, icon: this.typeStyleMapping[feature.type]},
      type: this.featureTypes[feature.source],
      description: feature.description,
      addons: addons
    }
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


