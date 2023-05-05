import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogService } from '@modules/blog/shared/services/blog.service';

import { fadeInOutAnimation } from '@core/animation_routes';
import { MainService } from '@services/main.service';
import { badge, galleryFeature } from '@core/data-types';
import { faTags, faTag } from '@fortawesome/free-solid-svg-icons';
import { stringToColor } from '@core/styles/colors';


@Component({
  selector: 'app-app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnDestroy {
  pageTitle!: string;
  topicsDataSubscription!: Subscription;
  isLegendDisplayed = true;

  tagsIcon = faTags;
  tagIcon = faTag;

  allCategories: badge[] = [];
  currentCategory!: string;
  seedCategory = 50;

  allTags: badge[] = [];
  currentTag!: string;
  seedTag = 8;

  selectedblogTopics: galleryFeature[] = [];
  allBlogTopics: galleryFeature[] = [];

  constructor(
    private blogService: BlogService,
    private mainService: MainService,
  ) {

    this.topicsDataSubscription = this.blogService.blogData.subscribe(
      (data: any) => {
        data.forEach((feature: any) => {
          this.allBlogTopics.push(this.buildFeature(feature))
        })
        this.selectedblogTopics = this.allBlogTopics

        this.allBlogTopics.forEach((element: any) => {
          element.categories.forEach((category: badge) => {
            const elementFound = Array.from(this.allCategories.values()).filter((item: any) => item.name === category.name);
            if (elementFound.length === 0) {
              this.allCategories.push(category)
            }
          });
        })

        this.allBlogTopics.forEach((element: any) => {
          element.tags.forEach((tag: badge) => {
            const elementFound = Array.from(this.allTags.values()).filter((item: any) => item.name === tag.name);
            if (elementFound.length === 0) {
              this.allTags.push(tag)
            }
          });
        })
      }
    )

  }

  ngOnInit(): void {
    this.blogService.queryBlogTopics()
  }

  ngOnDestroy(): void {
    this.topicsDataSubscription.unsubscribe()
  }

  buildFeature(feature: any): galleryFeature {
    let categoriesBuild: badge[] = [];
    feature.categories.forEach((element: any) => {
      categoriesBuild.push({
        name: element,
        color: this.getTagColor(element, this.seedCategory)
      })
    })

    let tagsBuild: badge[] = [];
    feature.tags.forEach((element: any) => {
      tagsBuild.push({
        name: element,
        color: this.getTagColor(element, this.seedTag)
      })
    })
    return {
      title: feature.title,
      image_url: feature.image,
      content_url: feature.url,
      categories: categoriesBuild,
      tags: tagsBuild,
      type: 'website',
      description: feature.resume
    }
  }

  getTagColor(value: string, seed: number): string {
    return stringToColor(value, seed)
  }

  showHideLegend(): void {
    this.isLegendDisplayed = !this.isLegendDisplayed;
  }

  resetContent(): void {
    this.selectedblogTopics = this.allBlogTopics;
    this.mainService.scrollToTopAction()
  }

  selectContentByCategory(category_name: string): void {
    let topicsFound = this.allBlogTopics.filter((feature: galleryFeature) => {
      const elementFound = Array.from(feature.categories.values()).filter((item: any) => item.name === category_name);
      return elementFound.length === 1;
    })
    this.currentCategory = category_name;
    this.selectedblogTopics = topicsFound;
    this.mainService.scrollToTopAction()
  }

  selectContentByTag(tag_name: string): void {
    let topicsFound = this.allBlogTopics.filter((feature: galleryFeature) => {
      const elementFound = Array.from(feature.tags.values()).filter((item: any) => item.name === tag_name);
      return elementFound.length === 1;
    })
    this.currentTag = tag_name;
    this.selectedblogTopics = topicsFound;
    this.mainService.scrollToTopAction()
  }

}


