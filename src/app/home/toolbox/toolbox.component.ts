import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ResumeService } from 'src/app/services/resume.service';
import { helpIcon, toolsIcon, locationIcon, lineIcon, PolygonIcon } from '../../core/inputs';


@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.scss']
})
export class ToolboxComponent implements OnInit {
  toolsIcon = toolsIcon;
  locationIcon = locationIcon;
  lineIcon = lineIcon;
  PolygonIcon = PolygonIcon;

  sidebarCollapsed: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private resumeService: ResumeService
  ) {

    this.titleService.setTitle(this.activatedRoute.snapshot.data.title);

   }

  ngOnInit(): void {
  }

}
