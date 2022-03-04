import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotesService } from '../../services/notes.service';

import { personalBlogUrl } from '../../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ControlerService } from 'src/app/services/controler.service';


@Component({
  selector: 'app-notes-view',
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.scss']
})
export class NotesViewComponent implements OnDestroy {
  pageTitle!: string;
  pageUrlToLoad = personalBlogUrl;
  notesDataSubscription!: Subscription;

  constructor(
    private notesService: NotesService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private controlerService: ControlerService,
  ) {

    // to get the data properties from routes (app.module.ts)
    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

    this.notesDataSubscription = this.notesService.notesData.subscribe(
      (data) => {
        this.pageTitle = data.page_title;
        this.pageUrlToLoad = data.url_to_display;
        this.titleService.setTitle(this.activatedRoute.snapshot.data.title + ' - ' + this.pageTitle)

      }
    )

  }

  ngOnInit(): void {
    this.sendResumeSubMenus()
  }

  ngOnDestroy(): void {
    this.notesDataSubscription.unsubscribe()
  }

  sendResumeSubMenus(): void {
    this.controlerService.pullSubMenus([])
  }

}
