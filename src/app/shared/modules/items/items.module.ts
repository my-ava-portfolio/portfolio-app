import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {RouterModule} from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { SectionContainerComponent } from '../section-container/section-container.component';
import { ButtonContentComponent } from './button-content/button-content.component';
import { IconTextComponent } from './icon-text/icon-text.component';
import { BadgeContentComponent } from './badge-content/badge-content.component';


const components = [
  ButtonContentComponent,
  IconTextComponent,
  BadgeContentComponent,
]

@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FontAwesomeModule,
    RouterModule
  ],
  exports: components
})
export class ItemsModule { }
