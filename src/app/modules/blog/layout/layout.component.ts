import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogService } from '@services/blog.service';

import { minWidthLandscape, personalBlogUrl, stringToColor, tagIcon, tagsIcon } from '@core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ControlerService } from '@services/controler.service';

import { fadeInOutAnimation } from '@core/animation_routes';
import { MainService } from '@services/main.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnDestroy {
  pageTitle!: string;
  pageUrlToLoad = personalBlogUrl;
  topicsDataSubscription!: Subscription;
  isLegendDisplayed = true;

  tagsIcon = tagsIcon;
  tagIcon = tagIcon;

  allCategories!: string[];
  currentCategory!: string;
  seedCategory = 50;

  allTags!: string[];
  currentTag!: string;
  seedTag = 8;

  selectedblogTopics!: any[];
  allBlogTopics!: any[];

  constructor(
    private blogService: BlogService,
    private mainService: MainService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.topicsDataSubscription = this.blogService.topicsData.subscribe(
      (data) => {
        this.allBlogTopics = data
        this.selectedblogTopics = data

        // TODO refactor
        let categoriesValues: string[] = [];
        this.allBlogTopics.forEach((element: any, index: number) => {
          categoriesValues = [...categoriesValues, ...element.categories]
        })
        this.allCategories = Array.from(new Set(categoriesValues));

        let tagsValues: string[] = [];
        this.allBlogTopics.forEach((element: any, index: number) => {
          tagsValues = [...tagsValues, ...element.tags]
        })
        this.allTags = Array.from(new Set(tagsValues));
      }
    )

  }

  ngOnInit(): void {
    this.sendResumeSubMenus()
    this.blogService.pulltopicsData()

  }

  ngOnDestroy(): void {
    this.topicsDataSubscription.unsubscribe()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
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
    let topicsFound = this.allBlogTopics.filter((e: any) => {
      return e.categories.includes(category_name)
    })
    this.selectedblogTopics = topicsFound;
    this.mainService.scrollToTopAction()
  }

  selectContentByTag(tag_name: string): void {
    let topicsFound = this.allBlogTopics.filter((e: any) => {
      return e.tags.includes(tag_name)
    })
    this.selectedblogTopics = topicsFound;
    this.mainService.scrollToTopAction()
  }


  @HostListener('window:orientationchange', ['$event'])
  displayContentRegardingDeviceScreen(): void {
    // if mode portrait and width screen <= 1024...
    if (window.screen.orientation.angle === 0 && window.screen.height <= minWidthLandscape) {
      this.isLegendDisplayed = false;
    }
  }

}


