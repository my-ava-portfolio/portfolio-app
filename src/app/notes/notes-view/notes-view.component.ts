import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotesService } from '../../services/notes.service';

import { jupyterNotebookUrl as personalBlogUrl } from '../../core/inputs';

import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';


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
    private titleService: Title
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

  ngOnDestroy(): void {
    this.notesDataSubscription.unsubscribe()
  }

}
