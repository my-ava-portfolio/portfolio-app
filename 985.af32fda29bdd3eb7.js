"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[985],{7985:(Q,p,o)=>{o.r(p),o.d(p,{MapsModule:()=>I});var s=o(9808),u=o(9444),l=o(9560),r=o(2397),m=o(2087),t=o(5e3),v=o(9947),g=o(3686);function h(e,i){1&e&&(t.ynx(0),t._UZ(1,"router-outlet",12),t.BQk())}function x(e,i){1&e&&(t.ynx(0),t._UZ(1,"router-outlet",22),t.BQk())}function b(e,i){1&e&&(t.ynx(0),t._UZ(1,"router-outlet",23),t.BQk())}function M(e,i){if(1&e){const n=t.EpF();t.TgZ(0,"div",13)(1,"div",14)(2,"div",15)(3,"div",16)(4,"button",17),t.NdJ("click",function(){return t.CHM(n),t.oxw().showHideLegend()}),t._UZ(5,"fa-icon",18),t._uU(6," L\xe9gende "),t.qZA(),t.TgZ(7,"button",19),t.NdJ("click",function(){return t.CHM(n),t.oxw().zoomOnData()}),t._UZ(8,"fa-icon",18),t.qZA()()(),t.TgZ(9,"div",20),t.YNc(10,x,2,0,"ng-container",9),t.YNc(11,b,2,0,"ng-container",9),t.qZA(),t._UZ(12,"div",21),t.qZA()()}if(2&e){const n=t.oxw();t.xp6(5),t.Q6J("icon",n.tagIcon),t.xp6(3),t.Q6J("icon",n.centerIcon),t.xp6(1),t.Q6J("ngClass",n.isLegendDisplayed?"d-block":"d-none"),t.xp6(1),t.Q6J("ngIf","activities"===n.currentMapTool),t.xp6(1),t.Q6J("ngIf","gtfs-viewer"===n.currentMapTool),t.xp6(1),t.Q6J("ngClass",n.isLegendDisplayed?"d-none":"d-block")}}function y(e,i){if(1&e&&(t.TgZ(0,"div",14),t._UZ(1,"img",15),t.qZA()),2&e){const n=t.oxw().$implicit;t.xp6(1),t.Q6J("src",n.img,t.LSH)}}const w=function(e){return[e]};function S(e,i){if(1&e&&(t.TgZ(0,"a",16),t._uU(1,"Acc\xe9der"),t.qZA()),2&e){const n=t.oxw().$implicit;t.Q6J("routerLink",t.VKq(1,w,n.route))}}function Z(e,i){if(1&e&&(t.TgZ(0,"a",17),t._uU(1,"Acc\xe9der"),t.qZA()),2&e){const n=t.oxw().$implicit;t.Q6J("href",n.route,t.LSH)}}function T(e,i){if(1&e&&(t.TgZ(0,"div",5)(1,"div",6)(2,"h4",7),t._uU(3),t.qZA()(),t.TgZ(4,"div",8),t.YNc(5,y,2,1,"div",9),t.TgZ(6,"p",10),t._uU(7),t.qZA(),t.YNc(8,S,2,3,"a",11),t.YNc(9,Z,2,1,"a",12),t.qZA(),t._UZ(10,"div",13),t.qZA()),2&e){const n=i.$implicit;t.xp6(3),t.Oqu(n.title),t.xp6(2),t.Q6J("ngIf",n.img),t.xp6(2),t.Oqu(n.details),t.xp6(1),t.Q6J("ngIf",!n.route.includes("https")),t.xp6(1),t.Q6J("ngIf",n.route.includes("https"))}}const L=[{path:"app",component:(()=>{class e{constructor(n,a,c,J){this.mapService=n,this.router=a,this.location=c,this.controlerService=J,this.tagIcon=r.V2,this.centerIcon=r.HI,this.isLegendDisplayed=!0,this.appsWithLegend=["gtfs-viewer","activities"],this.appsWithoutLegend=["sandbox"],this.mapScaleDivSubscription=this.mapService.setMapControler.subscribe(d=>{d&&this.setMapElements()}),this.mapService.setMapProjectionFromEpsg.subscribe(d=>{this.setMapElements()}),this.routerSubscription=this.router.events.subscribe(d=>{const f=this.location.path().split("/");this.currentMapTool=f[f.length-1]})}ngOnInit(){this.mapService.mapInteraction(!0),this.sendResumeSubMenus(),this.mapService.buildMapMapControlers()}ngAfterViewInit(){}ngOnDestroy(){this.mapService.mapInteraction(!1),this.mapService.unsetControlToMap("scale"),this.mapService.unsetControlToMap("attribution"),this.mapService.unsetControlToMap("miniMap"),this.mapScaleDivSubscription.unsubscribe(),this.routerSubscription.unsubscribe()}sendResumeSubMenus(){this.controlerService.pullSubMenus([])}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}zoomOnData(){this.mapService.sendZoomAction()}setMapElements(){this.mapService.unsetControlToMap("miniMap"),this.mapService.unsetControlToMap("scale"),this.mapService.unsetControlToMap("attribution"),this.mapService.setControlToMap("miniMap"),window.document.getElementById("overview-map").appendChild(window.document.getElementsByClassName("ol-overviewmap ol-custom-overviewmap")[0]),this.mapService.setControlToMap("scale"),window.document.getElementById("legend-scale").appendChild(window.document.getElementsByClassName("ol-scale-line ol-unselectable")[0]),this.mapService.setControlToMap("attribution"),window.document.getElementById("attribution").appendChild(window.document.getElementsByClassName("ol-attribution ol-unselectable ol-control ol-uncollapsible")[0])}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(v.S),t.Y36(l.F0),t.Y36(s.Ye),t.Y36(g.L))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-layout"]],decls:13,vars:3,consts:[[1,"container-fluid","g-0"],[1,"d-flex","flex-column"],[1,"map-sources"],["id","attribution",1,"float-end","d-none","d-sm-block"],[1,"map-sources","d-flex","flex-column"],[1,"m-2"],["id","overview-map",1,"float-end","shadow","d-none","d-sm-block"],[1,"mx-2"],["id","legend-scale",1,"float-end","shadow"],[4,"ngIf"],[1,"d-flex","flex-row","map-content"],["class","legend-container",4,"ngIf"],["name","map-sandbox"],[1,"legend-container"],[1,"d-flex","flex-column","flex-fill"],[1,"d-flex","flex-row","align-items-end","justify-content-between","px-3"],["id","legendLabels",1,"d-flex","flex-row"],["type","button","checked","","autocomplete","off",1,"rounded-top","border-0","bg-dark","bg-gradient","text-white","mx-2","p-2","-1",3,"click"],[1,"",3,"icon"],["title","Centrer","type","button","checked","","autocomplete","off",1,"rounded-top","border-0","bg-warning","bg-gradient","text-black","mx-2","mt-2","-1",3,"click"],[1,"bg-white","legend-content","text-center","py-3","justify-content-center",3,"ngClass"],[1,"d-flex","flex-column","flex-lg-row","bg-white","legend-content","text-center","py-3","justify-content-center",3,"ngClass"],["name","map-activities"],["name","map-gtfs-viewer"]],template:function(n,a){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",1),t._UZ(4,"div",3),t.qZA(),t.TgZ(5,"div",4)(6,"div",5),t._UZ(7,"div",6),t.qZA(),t.TgZ(8,"div",7),t._UZ(9,"div",8),t.qZA()()(),t.YNc(10,h,2,0,"ng-container",9),t._UZ(11,"div",10),t.YNc(12,M,13,6,"div",11),t.qZA()()),2&n&&(t.Q6J("@fadeInOut",void 0),t.xp6(10),t.Q6J("ngIf",a.appsWithoutLegend.includes(a.currentMapTool)),t.xp6(2),t.Q6J("ngIf",a.appsWithLegend.includes(a.currentMapTool)))},directives:[s.O5,l.lC,u.BN,s.mk],styles:[".map-content{min-height:100vh;pointer-events:none}.legend-container{position:sticky;bottom:0;transition:all .1s}@media (max-width: 576px){.legend-container{position:fixed;width:100%}}.legend-content{box-shadow:0 -5px 20px #00000080}.legend-content.disable{height:2em}.legend-content.disable .d-flex{visibility:hidden}.map-sources{position:fixed;right:0em}.ol-scale-line,.ol-control{position:unset!important}.ol-attribution{max-width:unset}#legend-scale{font-size:12px!important;background-color:#f1f1f1c9!important;margin:3px!important;padding:5px;border-radius:5px}.ol-scale-line{background:unset}.ol-scale-line-inner{border:2px solid #000;color:#000;border-top:none}\n"],encapsulation:2,data:{animation:[m.Ae]}}),e})(),children:[{path:"activities",loadChildren:()=>Promise.all([o.e(101),o.e(255),o.e(181),o.e(205)]).then(o.bind(o,205)).then(e=>e.MapActivitiesModule)},{path:"sandbox",loadChildren:()=>Promise.all([o.e(101),o.e(181),o.e(889)]).then(o.bind(o,4889)).then(e=>e.MapSandboxModule)},{path:"gtfs-viewer",loadChildren:()=>Promise.all([o.e(101),o.e(255),o.e(801)]).then(o.bind(o,4801)).then(e=>e.MapGtfsViewerModule)},{path:"",redirectTo:"",pathMatch:"full"}]},{path:"",component:(()=>{class e{constructor(n){this.controlerService=n,this.mapPagesMenus=r.v2}ngOnInit(){this.sendResumeSubMenus()}sendResumeSubMenus(){this.controlerService.pullSubMenus([])}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.L))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-home"]],decls:5,vars:2,consts:[[1,"container-fluid"],[1,"row","justify-content-center"],[1,"col-11","m-4","maps-content"],[1,"grid-container"],["class","mb-4 feat-map bg-white",4,"ngFor","ngForOf"],[1,"mb-4","feat-map","bg-white"],[1,"card-header","bg-dark","bg-gradient","text-white"],[1,"card-title"],[1,"card-body"],["class","text-center mb-3",4,"ngIf"],[1,"card-text"],["class","btn btn-warning mt-auto fw-bold",3,"routerLink",4,"ngIf"],["class","btn btn-warning mt-auto fw-bold","target","_blank","rel","noopener noreferrer",3,"href",4,"ngIf"],[1,"card-footer"],[1,"text-center","mb-3"],[1,"img-fluid","rounded","mx-auto","d-block","shadow",3,"src"],[1,"btn","btn-warning","mt-auto","fw-bold",3,"routerLink"],["target","_blank","rel","noopener noreferrer",1,"btn","btn-warning","mt-auto","fw-bold",3,"href"]],template:function(n,a){1&n&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),t.YNc(4,T,11,5,"div",4),t.qZA()()()()),2&n&&(t.xp6(1),t.Q6J("@fadeInOut",void 0),t.xp6(3),t.Q6J("ngForOf",a.mapPagesMenus.sub_menus))},directives:[s.sg,s.O5,l.yS],styles:[".grid-container[_ngcontent-%COMP%]{columns:200px;-webkit-column-count:3;-webkit-column-gap:3%;-moz-column-count:3;-moz-column-gap:3%;column-count:3;column-gap:5%}.feat-map[_ngcontent-%COMP%]{display:grid;grid-template-rows:1fr auto;page-break-inside:avoid;break-inside:avoid}"],data:{animation:[m.Ae]}}),e})(),data:{title:"Cartes",page:"home"}}];let A=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[l.Bz.forChild(L)],l.Bz]}),e})(),I=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[s.ez,A,u.uH]]}),e})()}}]);