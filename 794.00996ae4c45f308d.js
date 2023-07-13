"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[794],{2794:(Q,c,n)=>{n.r(c),n.d(c,{MapsModule:()=>N});var l=n(4755),d=n(9129),p=n(7292),r=n(2087),t=n(2223),u=n(9947),g=n(3686);let v=(()=>{class e{constructor(o,i){this.mapService=o,this.controlerService=i,this.isLegendDisplayed=!0,this.mapScaleDivSubscription=this.mapService.setMapControler.subscribe(s=>{s&&this.setMapElements()}),this.mapProjectionSubscription=this.mapService.setMapProjectionFromEpsg.subscribe(s=>{this.setMapElements()})}ngOnInit(){this.sendResumeSubMenus(),this.mapService.mapInteraction(!0),this.mapService.buildMapMapControlers()}sendResumeSubMenus(){this.controlerService.pullSubMenus([])}ngOnDestroy(){this.mapService.mapInteraction(!1),this.mapService.unsetControlToMap("scale"),this.mapService.unsetControlToMap("attribution"),this.mapService.unsetControlToMap("miniMap"),this.mapScaleDivSubscription.unsubscribe(),this.mapProjectionSubscription.unsubscribe()}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}setMapElements(){this.mapService.unsetControlToMap("miniMap"),this.mapService.unsetControlToMap("scale"),this.mapService.unsetControlToMap("attribution"),this.mapService.setControlToMap("miniMap"),window.document.getElementById("overviewMap").appendChild(window.document.getElementsByClassName("ol-overviewmap ol-custom-overviewmap")[0]),this.mapService.setControlToMap("scale"),window.document.getElementById("legendScale").appendChild(window.document.getElementsByClassName("ol-scale-line ol-unselectable")[0]),this.mapService.setControlToMap("attribution");const s=window.document.getElementById("attribution");s.appendChild(window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0]),window.document.getElementById("mapLegendTools"),s.appendChild(window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0])}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(u.S),t.Y36(g.L))},e.\u0275cmp=t.Xpm({type:e,selectors:[["map-app-layout"]],decls:10,vars:0,consts:[["id","attributionContainer",1,"d-flex","flex-column"],["id","mapSources",1,"position-fixed","end-0"],[1,"map-sources","d-flex","flex-column","justify-content-end"],["id","attribution",1,"shadow","bg-white","p-1"],["id","overviewMap",1,"ms-auto","m-1","d-none","d-sm-block","shadow","rounded-2","p-1","bg-white"],["id","legendScale",1,"ms-auto","m-1","shadow","bg-white","rounded-3","p-1"],["id","mapLegendTools",1,"position-fixed","end-0"],["name","map-gtfs-viewer"],["name","map-activities"],["name","map-sandbox"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"div",3)(4,"span",4)(5,"span",5),t.qZA()(),t._UZ(6,"div",6),t.qZA(),t._UZ(7,"router-outlet",7)(8,"router-outlet",8)(9,"router-outlet",9))},dependencies:[p.lC],styles:[".ol-attribution,.ol-scale-line,.ol-control{position:unset!important;border-radius:4px;background:rgba(255,255,255,.8);max-width:none}.ol-overviewmap-box{border:2px dashed var(--bs-dark)}.ol-scale-line-inner{border:2px solid #000;color:#000;border-top:none}#attributionContainer{pointer-events:none}\n"],encapsulation:2,data:{animation:[r.Ae]}}),e})();var f=n(6786),h=n(7727),y=n(873);function M(e,a){1&e&&t.GkF(0)}const m=function(e){return{stack:e}};function C(e,a){if(1&e&&(t.ynx(0),t.YNc(1,M,1,0,"ng-container",7),t.BQk()),2&e){const o=t.oxw().$implicit;t.oxw(2);const i=t.MAs(5);t.xp6(1),t.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",t.VKq(2,m,o))}}function x(e,a){1&e&&t.GkF(0)}function T(e,a){if(1&e&&(t.ynx(0),t.YNc(1,x,1,0,"ng-container",7),t.BQk()),2&e){const o=t.oxw().$implicit;t.oxw(2);const i=t.MAs(5);t.xp6(1),t.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",t.VKq(2,m,o))}}function S(e,a){1&e&&t.GkF(0)}function L(e,a){if(1&e&&(t.ynx(0),t.YNc(1,S,1,0,"ng-container",7),t.BQk()),2&e){const o=t.oxw().$implicit;t.oxw(2);const i=t.MAs(5);t.xp6(1),t.Q6J("ngTemplateOutlet",i)("ngTemplateOutletContext",t.VKq(2,m,o))}}function b(e,a){if(1&e&&(t.ynx(0),t.YNc(1,C,2,4,"ng-container",6),t.YNc(2,T,2,4,"ng-container",6),t.YNc(3,L,2,4,"ng-container",6),t.BQk()),2&e){const o=a.$implicit;t.xp6(1),t.Q6J("ngIf","Pre-Proc"===o.type),t.xp6(1),t.Q6J("ngIf","Back-end"===o.type),t.xp6(1),t.Q6J("ngIf","Front-end"===o.type)}}function O(e,a){if(1&e&&(t.TgZ(0,"set-paragraph-content"),t._uU(1),t.qZA(),t.TgZ(2,"div",4),t.YNc(3,b,4,3,"ng-container",5),t.qZA()),2&e){const o=a.$implicit;t.xp6(1),t.Oqu(o.description),t.xp6(2),t.Q6J("ngForOf",o.stack)}}function A(e,a){if(1&e&&(t.TgZ(0,"div",8)(1,"span",9),t._uU(2),t.qZA(),t._UZ(3,"img",10),t.qZA()),2&e){const o=a.stack;t.xp6(2),t.Oqu(o.type),t.xp6(1),t.Q6J("src",o.img,t.LSH)("alt",o.language),t.uIk("title",o.language)}}const H=[{path:"app",component:v,children:[{path:"activities",loadChildren:()=>Promise.all([n.e(426),n.e(963),n.e(181),n.e(592),n.e(205)]).then(n.bind(n,205)).then(e=>e.MapActivitiesModule)},{path:"sandbox",loadChildren:()=>Promise.all([n.e(426),n.e(181),n.e(347)]).then(n.bind(n,5347)).then(e=>e.MapSandboxModule)},{path:"gtfs-viewer",loadChildren:()=>Promise.all([n.e(426),n.e(963),n.e(592),n.e(467)]).then(n.bind(n,6467)).then(e=>e.MapGtfsViewerModule)},{path:"",redirectTo:"",pathMatch:"full"}]},{path:"",component:(()=>{class e{constructor(){this.mapPagesMenus=f.v2}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home-layout"]],decls:6,vars:2,consts:[["id","mapsHome",1,"gallery"],["columnNb","3","featuresHeaderClass","text-bg-dark",3,"features"],["descriptionTemplate",""],["stackTemplate",""],[1,"d-flex","flex-row","align-items-center","justify-content-center"],[4,"ngFor","ngForOf"],[4,"ngIf"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"d-flex","flex-column","justify-content-center","align-items-center","border","rounded","m-2"],[1,"small"],[1,"stack-img","m-2",3,"src","alt"]],template:function(o,i){1&o&&(t.TgZ(0,"div",0)(1,"app-grid-container",1),t.YNc(2,O,4,2,"ng-template",null,2,t.W1O),t.qZA()(),t.YNc(4,A,4,4,"ng-template",null,3,t.W1O)),2&o&&(t.Q6J("@fadeInOut",void 0),t.xp6(1),t.Q6J("features",i.mapPagesMenus.sub_menus))},dependencies:[l.sg,l.O5,l.tP,h.A,y.v],styles:[".stack-img[_ngcontent-%COMP%]{height:50px}"],data:{animation:[r.Ae]}}),e})()}];let B=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[p.Bz.forChild(H),p.Bz]}),e})();var w=n(4586),Z=n(739),I=n(7157);let N=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[l.ez,B,d.uH,w.Dt,Z.j,I.p]}),e})()}}]);