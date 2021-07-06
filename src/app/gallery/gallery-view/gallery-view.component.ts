import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { apiMapsUrl, minWidthLandscape } from '../../core/inputs';

import { GalleryService } from '../../services/gallery.service';
import { ResumeService } from '../../services/resume.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { pythonIcon, tagsIcon, tagIcon, chartItemIcon, mapIcon, videoItemIcon, appItemIcon, toolItemIcon, methodoIcon } from '../../core/inputs';

import { checkIfScreenPortraitOrientation } from '../../core/inputs';


@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.scss']
})
export class GalleryViewComponent implements OnInit, OnDestroy {
  // TODO create a route to get all activities titles
  currentDate: number = new Date().getFullYear();
  defaultActivity: string | null = null;
  currentActivity: string | null = null;

  defaultCategory: string | null = null;
  currentCategory: string | null = null;

  isGalleryDataCanBeDisplayed = false;
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
    private resumeService: ResumeService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
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

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
    this.displayContentRegardingDeviceScreen();

    if (this.isGalleryDataCanBeDisplayed) {
      this.resetGallery();
      this.filterFromAnchor();
    }


  }

  ngOnDestroy(): void {
    this.activitiesGallerySubscription.unsubscribe();

  }

  filterFromAnchor(): void {
    try {
      if (this.fragment !== null) {
        this.getGalleryDataByActivity(this.fragment.replace('#', ''));
      }
    } catch (e) {
      console.log('anchor scrolling error');
    }
  }


  resetGallery(): any {
    this.currentActivity = this.defaultActivity;
    this.currentCategory = this.defaultCategory;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.resumeService.scrollToTopAction()
  }

  getGalleryDataByActivity(activityName: string | null): any {
    this.currentActivity = activityName;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.resumeService.scrollToTopAction()
  }

  getGalleryDataByCategory(categoryName: string | null): any {
    this.currentCategory = categoryName;
    this.currentActivity = this.defaultActivity;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.resumeService.scrollToTopAction()
  }

  getGalleryDataByType(typeName: string | null): any {
    this.currentType = typeName;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
    this.resumeService.scrollToTopAction()
  }


  @HostListener('window:orientationchange', ['$event']) displayContentRegardingDeviceScreen(): void {
    this.isGalleryDataCanBeDisplayed = checkIfScreenPortraitOrientation();

    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.isLegendDisplayed = false;
    }
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

}
