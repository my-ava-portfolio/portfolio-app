import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'set-article-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './article-header.component.html',
  styleUrls: ['./article-header.component.scss']
})
export class ArticleHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
