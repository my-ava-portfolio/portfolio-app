import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlerService {
  subMenuFeatures: Subject<any[]> = new Subject<any[]>();
  titlePageFeature: Subject<any> = new Subject<any>();
  sideBarCollapsed: Subject<any> = new Subject<any>();

  constructor() { }


  pullSubMenus(menus: any[]): void {
    this.subMenuFeatures.next(menus);
  }

  pullTitlePage(pageName: string): void {
    this.titlePageFeature.next(pageName);
  }

}
