import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BlogService } from '@services/blog.service';

import { personalBlogUrl } from '@core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ControlerService } from '@services/controler.service';

import { fadeInOutAnimation } from '@core/animation_routes';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent implements OnDestroy {
  pageTitle!: string;
  pageUrlToLoad = personalBlogUrl;
  notesDataSubscription!: Subscription;

  blogTopics!: any[];

  constructor(
    private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.notesDataSubscription = this.blogService.topicsData.subscribe(
      (data) => {
        this.blogTopics = data
      }
    )

  }

  ngOnInit(): void {
    this.sendResumeSubMenus()
    this.blogService.pulltopicsData()
  }


  ngOnDestroy(): void {
    this.notesDataSubscription.unsubscribe()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

}
