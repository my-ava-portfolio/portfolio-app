import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';

import { GalleryService } from '@modules/gallery/shared/services/gallery.service';
import { MainService } from '@services/main.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';

import { fadeInOutAnimation } from '@core/animation_routes';
import { galleryFeature } from '@core/data-types';
import { activitiesMapping, assetsImagesPath } from '@core/global-values/main';

import { minWidthLandscape } from '@core/styles/screen';

import { faYoutube, faAppStore, faPython } from '@fortawesome/free-brands-svg-icons';
import { faTags, faTag, faChartBar, faMap, faTools, faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { experiencesPages } from '@core/global-values/topics';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnInit, OnDestroy {
  experiencesRoute: string = experiencesPages.route;

  currentDate: number = new Date().getFullYear();
  defaultActivity: string = 'null';
  currentActivity: string = 'null';

  defaultCategory: string = 'null';
  currentCategory: string = 'null';

  isLegendDisplayed = true;
  tagsIcon = faTags;
  tagIcon = faTag;

  category!: string | null;
  activities!: any[];
  mediaTypes!: any[];
  defaultType: string | null = null;
  currentType: string | null = null;

  assetsImagesPath = assetsImagesPath;
  galleryItems: galleryFeature[] = [];

  activitiesMapping = activitiesMapping

  typeStyleMapping: any = {
    chart: { icon: faChartBar, title: 'Graphiques & tableaux' },
    video: { icon: faYoutube, title: 'Vidéos' },
    map: { icon: faMap, title: 'Cartes' },
    app: { icon: faAppStore, title: 'Applications' },
    tool: { icon: faTools, title: 'Outils' },
    library: { icon: faPython, title: 'Libraries' },
    methodo: { icon: faProjectDiagram, title: 'Méthodologies'}
  };

  featureTypes: any = {
    url_video: 'video',
    url_img: 'modal',
    url_app: 'website',
    asset_img: 'modal',
    asset_app: 'local_website'
  }
  
  activitiesGallerySubscription!: Subscription;
  activatedRouteSubscription!: Subscription;

  constructor(
    private galleryService: GalleryService,
    private mainService: MainService,
    private activatedRoute: ActivatedRoute,
    ) {

    this.activatedRouteSubscription = this.activatedRoute.fragment.subscribe(
      (fragment: string | null) => {
        if (fragment !== null) {
          this.getGalleryDataByActivity(fragment)
          return
        } 
        this.resetGallery();
        
      }
    );

    this.activitiesGallerySubscription = this.galleryService.activitiesGalleryData.subscribe(
      (data) => {
        this.galleryItems = []
        data.forEach((feature: any) => {
          this.galleryItems.push(this.buildFeature(feature))
        })
        this.mediaTypes = [...new Set(data.map((item: any) => item.type))]
        this.activities = data.reduce(function(a: any, b: any) {
            a[b['activity_identifier']] = b['name']
          return a
        }, {})

        this.currentCategory = data.current_category;
      }
    );

  }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.activitiesGallerySubscription.unsubscribe();
    this.activatedRouteSubscription.unsubscribe();
  }

  buildFeature(feature: any): galleryFeature {
    // some medias does not have a media_splash attribute
    let img_url!: string;
    if ([null, 'nan'].includes(feature.media_splash)) {
      feature.media_splash = feature.media
    }

    // media_splash may be an asset media
    img_url = feature.media_splash
    if (!feature.media_splash.includes('http')) {
      img_url = assetsImagesPath + feature.media_splash
    }

    if (['asset_img'].includes(feature.source)) {
      feature.media = assetsImagesPath + feature.media_splash
    }

    let addons: any = {};
    if (feature.data) {
      addons['Données'] = feature.data;
    }
    if (feature.tools) {
      addons['Outils'] = feature.tools;
    }
    return {
      id: feature.activity_identifier,
      title: feature.title,
      image_url: img_url,
      content_url: feature.media,
      categories: [],
      tags: [],
      activityType: {
        name: activitiesMapping[feature.category as keyof typeof activitiesMapping],
        class: feature.category
      },
      experienceName: {
        name: feature.name,
        color: feature.color
      },
      mediaType: {
        name: feature.type,
        icon: this.typeStyleMapping[feature.type]
      },
      type: this.featureTypes[feature.source],
      description: feature.description,
      addons: addons
    }
  }

  resetGallery(): any {
    this.currentActivity = this.defaultActivity;
    this.currentCategory = this.defaultCategory;
    this.currentType = this.defaultType;
    this.galleryService.queryGalleryFeatures({})
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByActivity(activityName: string): void {
    this.currentActivity = activityName;
    this.currentType = this.defaultType;
    this.galleryService.queryGalleryFeatures(
      {
        activity_name: this.currentActivity,
      }
    );
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByCategory(categoryName: string): void {
    this.currentCategory = categoryName;
    this.currentActivity = this.defaultActivity;
    this.currentType = this.defaultType;
    this.galleryService.queryGalleryFeatures(
      {
        activity_type: this.currentCategory,
      }
    );
    this.mainService.scrollToTopAction()
  }

  getGalleryDataByType(typeName: string): void {
    this.currentType = typeName;
    this.galleryService.queryGalleryFeatures(
      {
        media_type: this.currentType
      }
    );
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

}


