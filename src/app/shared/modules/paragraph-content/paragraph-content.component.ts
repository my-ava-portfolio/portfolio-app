import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'set-paragraph-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paragraph-content.component.html',
  styleUrls: ['./paragraph-content.component.scss']
})
export class ParagraphContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
