import { Component } from '@angular/core';

import { fadeInOutAnimation } from '@core/animation_routes';
import { goBackEndInfo, pythonBackEndInfo, frontEndInfo } from '@core/globals/tech-infos';
import { portfolioArchitectureImgPath, resumeApiMcdImgPath } from '../core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [fadeInOutAnimation]
})
export class LayoutComponent {
  portfolioArchitectureImgPath = portfolioArchitectureImgPath;
  resumeApiMcdImgPath = resumeApiMcdImgPath;

  goBackEndInfo = goBackEndInfo
  pythonBackEndInfo = pythonBackEndInfo;
  frontEnd = frontEndInfo;
}
