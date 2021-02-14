import { Component, OnInit, OnDestroy } from '@angular/core';
import { apiBaseUrl } from '../../core/inputs';

import { GalleryService } from '../../services/gallery.service';

import { Subscription } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


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

  apiBaseUrl = apiBaseUrl;
  galleryItems!: any;

  isDataAvailable = false;

  fragment: string | null = null;

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
        this.currentActivity  = this.fragment.replace('#', '');
      }
    } catch (e) {
      console.log('anchor scrolling error');
    }
  }


  resetGallery(): any {
    this.currentCategory = this.defaultCategory;
    this.currentCategory = this.defaultActivity;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory);
  }

  getGalleryDataByActivity(activityName: string | null): any {
    this.currentActivity = activityName;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory);
  }

  getGalleryDataByCategory(categoryName: string | null): any {
    this.currentCategory = categoryName;
    console.log('aa', this.currentCategory)
    this.galleryService.pullExistingActivitiesGallery(null, this.currentCategory);
  }

}
