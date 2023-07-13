import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'set-section-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-container.component.html',
  styleUrls: ['./section-container.component.scss']
})
export class SectionContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
