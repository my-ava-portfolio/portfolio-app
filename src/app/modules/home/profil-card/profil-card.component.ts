import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { apiMapsUrl, arrowLeftIcon, arrowRightIcon, chunkArray, galleryPages, imageProfile, projectPages, resumeTopicsPages } from '@core/inputs';

import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { GalleryService } from '@services/gallery.service';
import { Subscription } from 'rxjs';
import { ResumeService } from '@services/resume.service';


@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent implements OnInit, OnDestroy {
  generalData!: any;
  galleryItems!: any[];
  galleryItemsChunked!: any[];

  arrowRightIcon = arrowRightIcon;
  arrowLeftIcon = arrowLeftIcon;

  apiMapsUrl = apiMapsUrl;
  galleryPagesRoute: string = galleryPages.route;

  resumePages: any[] = resumeTopicsPages;
  projectPages: any[] = projectPages;
  imageProfile: string = imageProfile;

  cardClosed: boolean = false;

  activitiesGallerySubscription!: Subscription;
  generalDataSubscription!: Subscription;

  constructor(
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private galleryService: GalleryService,
    private resumeService: ResumeService,
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.activitiesGallerySubscription = this.galleryService.activitiesGalleryData.subscribe(
      (data) => {
        this.galleryItems = data.items;
        this.galleryItemsChunked = chunkArray(this.galleryItems, 3)

      }
    )

    this.generalDataSubscription = this.resumeService.generalData.subscribe(
      (data) => {
        this.generalData = data;
      }
    );

  }

  ngOnInit(): void {
    this.resumeService.pullGeneralData();
    this.galleryService.pullExistingActivitiesGallery(null, null, null);
  }

  ngOnDestroy(): void {
    this.activitiesGallerySubscription.unsubscribe();
    this.generalDataSubscription.unsubscribe();
  }

}

