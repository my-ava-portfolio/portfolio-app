import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'set-article-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-container.component.html',
  styleUrls: ['./article-container.component.scss']
})
export class ArticleContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
