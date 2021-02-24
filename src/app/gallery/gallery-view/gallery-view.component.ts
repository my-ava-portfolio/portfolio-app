import { Component, OnInit, OnDestroy } from '@angular/core';
import { apiUrl } from '../../core/inputs';

import { GalleryService } from '../../services/gallery.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { pythonIcon, chartItemIcon, mapIcon, videoItemIcon, appItemIcon, toolItemIcon } from '../../core/inputs';



@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit, OnDestroy {
  // TODO create a route to get all activities titles
  currentDate: number = new Date().getFullYear();
  defaultActivity: string | null = null;
  currentActivity: string | null = null;

  defaultCategory: string | null = null;
  currentCategory: string | null = null;

  mediaTypes!: string[];
  defaultType: string | null = null;
  currentType: string | null = null;

  apiBaseUrl = apiUrl;
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
  };

  activitiesGallerySubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;

  constructor(
    private galleryService: GalleryService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
    ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.activatedRoute.fragment.subscribe(
      (fragment) => {
        if (fragment !== undefined) {
          console.log('ralala', fragment);
          this.fragment = fragment;
        }
      }
  );

    this.activitiesGallerySubscription = this.galleryService.activitiesGalleryData.subscribe(
      (data) => {
        this.galleryItems = data.items;
        this.mediaTypes = data.media_types_available;
        this.isDataAvailable = true;
        console.log(data);

      },
      (error) => {
        console.log('error');
      }
    );

  }

  ngOnInit(): void {
    this.filterFromAnchor();
    this.resetGallery();
  }

  ngOnDestroy(): void {
    console.log('lalala gallery');
    this.activitiesGallerySubscription.unsubscribe();

  }

  filterFromAnchor(): void {
    try {
      if (this.fragment !== null) {
        this.currentActivity = this.fragment.replace('#', '');
        console.log('hello')
      }
    } catch (e) {
      console.log('anchor scrolling error');
    }
  }


  resetGallery(): any {
    this.currentCategory = this.defaultCategory;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
  }

  getGalleryDataByActivity(activityName: string | null): any {
    this.currentActivity = activityName;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
  }

  getGalleryDataByCategory(categoryName: string | null): any {
    this.currentCategory = categoryName;
    this.currentActivity = this.defaultActivity;
    this.currentType = this.defaultType;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
  }

  getGalleryDataByType(typeName: string | null): any {
    this.currentType = typeName;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory, this.currentType);
  }

}
