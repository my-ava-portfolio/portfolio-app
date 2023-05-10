import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { assetsImagesPath } from '@core/globals/resume-shared-data';
import { fadeInOutAnimation } from '@core/animation_routes';
import { goBackEndInfo, pythonBackEndInfo, frontEndInfo } from '@core/globals/tech-infos';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent {
  portfolioV2ImgPath = assetsImagesPath + 'portfolio_v2.avif';

  goBackEndInfo = goBackEndInfo
  pythonBackEndInfo = pythonBackEndInfo;
  frontEnd = frontEndInfo;
}
