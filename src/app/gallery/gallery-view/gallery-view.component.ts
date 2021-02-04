import { Component, OnInit, OnDestroy } from '@angular/core';
import { apiBaseUrl } from '../../core/inputs';

import { GalleryService } from '../../services/gallery.service';

import { Subscription } from 'rxjs';


@Component({
  selector: 'app-gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit, OnDestroy {
  // TODO create a route to get all activities titles
  youtubeDefaultUrl = 'https://www.youtube.com';
  githubusercontentDefaultUrl = 'https://raw.githubusercontent.com/';
  currentDate: number = new Date().getFullYear();
  defaultActivity: string | null = null;
  currentActivity: string | null = null;

  defaultCategory: string | null = null;
  currentCategory: string | null = null;

  apiBaseUrl = apiBaseUrl;
  galleryItems!: any;

  isDataAvailable = false;


  activitiesGallerySubscription!: Subscription;
  activitiesFilteredSubscription!: Subscription;

  constructor(
    private galleryService: GalleryService,
  ) {

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

    this.resetGallery();

  }

  ngOnDestroy(): void {
    console.log('lalala gallery')
    this.activitiesGallerySubscription.unsubscribe();

  }

  resetGallery(): any {
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory);
  }

  getGalleryDataByActivity(activityName: string | null): any {
    this.currentActivity = activityName;
    this.galleryService.pullExistingActivitiesGallery(this.currentActivity, this.currentCategory);
  }

  getGalleryDataByCategory(categoryName: string | null): any {
    this.currentCategory = categoryName;
    this.galleryService.pullExistingActivitiesGallery(null, this.currentCategory);
  }

  checkMediaType(mediaItem: string): string {
    if (mediaItem.includes(this.youtubeDefaultUrl)) {
      return 'youtube_url';
    } else if (mediaItem.includes(this.githubusercontentDefaultUrl)) {
      return 'githubusercontent_url';
    } else {
      return 'local_url';
    }
  }

}
