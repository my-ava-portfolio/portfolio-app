"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[13],{13:(R,g,s)=>{s.r(g),s.d(g,{GalleryModule:()=>U});var p=s(6895),d=s(2216),y=s(646),l=s(5017),_=s(2087),t=s(4650),m=s(9187),h=s(1557),v=s(1481),f=s(3686),x=s(7727),T=s(942),C=s(485),b=s(873),A=s(6298),Z=s(6423);function L(n,o){if(1&n&&(t.TgZ(0,"set-badge-content",12),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.activityType.class),t.xp6(1),t.Oqu(e.activityType.name)}}function G(n,o){if(1&n&&(t.TgZ(0,"set-badge-content",13),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit,i=t.oxw(2);t.Q6J("routerLink",i.experiencesRoute)("fragment",e.id)("customBgColor",e.experienceName.color),t.xp6(1),t.Oqu(e.experienceName.name)}}function J(n,o){if(1&n&&(t.TgZ(0,"set-badge-content",14),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.mediaType.name)("icon",e.mediaType.icon.icon),t.xp6(1),t.Oqu(e.mediaType.icon.title)}}function S(n,o){if(1&n&&(t.TgZ(0,"li",17)(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"span"),t._uU(4),t.qZA()()),2&n){const e=o.$implicit;t.xp6(2),t.hij("",e.key," : "),t.xp6(2),t.Oqu(e.value)}}function M(n,o){if(1&n&&(t.TgZ(0,"ul",15),t.YNc(1,S,5,2,"li",16),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,1,e.addons))}}function D(n,o){if(1&n&&(t.TgZ(0,"div",7),t.YNc(1,L,2,2,"set-badge-content",8),t.YNc(2,G,2,4,"set-badge-content",9),t.YNc(3,J,2,3,"set-badge-content",10),t.qZA(),t.TgZ(4,"set-paragraph-content"),t._uU(5),t.YNc(6,M,3,3,"ul",11),t.qZA()),2&n){const e=o.$implicit;t.xp6(1),t.Q6J("ngIf",e.activityType),t.xp6(1),t.Q6J("ngIf",e.experienceName),t.xp6(1),t.Q6J("ngIf",e.mediaType),t.xp6(2),t.hij(" ",e.description," "),t.xp6(1),t.Q6J("ngIf",e.addons)}}function I(n,o){1&n&&t.GkF(0)}function N(n,o){if(1&n&&t.YNc(0,I,1,0,"ng-container",18),2&n){t.oxw(2);const e=t.MAs(2);t.Q6J("ngTemplateOutlet",e)}}function O(n,o){if(1&n&&(t.TgZ(0,"article",2)(1,"app-grid-container",3),t.YNc(2,D,7,5,"ng-template",null,4,t.W1O),t.qZA(),t.TgZ(4,"set-legend-container",5),t.YNc(5,N,1,1,"ng-template",null,6,t.W1O),t.qZA()()),2&n){const e=t.oxw();t.Q6J("@fadeInOut",void 0),t.xp6(1),t.Q6J("features",e.galleryItems)}}function B(n,o){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",24),t.NdJ("click",function(){const c=t.CHM(e).$implicit,u=t.oxw(2);return t.KtG(u.getGalleryDataByActivity(c.key))}),t._uU(2),t.qZA(),t.BQk()}if(2&n){const e=o.$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("classes",i.currentActivity===e.key?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary"),t.xp6(1),t.hij("",e.value," ")}}function F(n,o){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",25),t.NdJ("click",function(){const c=t.CHM(e).$implicit,u=t.oxw(2);return t.KtG(u.getGalleryDataByType(c))}),t.qZA(),t.BQk()}if(2&n){const e=o.$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("classes","mx-0 rounded-0 btn-sm text-bg-"+e)("icon",i.typeStyleMapping[e].icon)("title",i.typeStyleMapping[e].title)}}function Q(n,o){if(1&n){const e=t.EpF();t.TgZ(0,"set-section-container")(1,"h6"),t._uU(2,"Filtrage par cat\xe9gories"),t.qZA(),t.TgZ(3,"set-button-content",19),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.resetGallery())}),t._uU(4,"Tous "),t.qZA(),t.TgZ(5,"set-button-content",20),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.getGalleryDataByCategory("job"))}),t._uU(6,"Missions "),t.qZA(),t.TgZ(7,"set-button-content",21),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.getGalleryDataByCategory("personal-project"))}),t._uU(8,"Projets personnels "),t.qZA(),t.TgZ(9,"set-button-content",22),t.NdJ("click",function(){t.CHM(e);const a=t.oxw();return t.KtG(a.getGalleryDataByCategory("volunteer"))}),t._uU(10,"B\xe9n\xe9volat "),t.qZA()(),t.TgZ(11,"set-section-container")(12,"h6"),t._uU(13,"Filtrage par activit\xe9s"),t.qZA(),t.YNc(14,B,3,2,"ng-container",23),t.ALo(15,"keyvalue"),t.qZA(),t.TgZ(16,"set-section-container")(17,"h6"),t._uU(18,"Filtrage par types d'illustration"),t.qZA(),t.YNc(19,F,2,3,"ng-container",23),t.qZA()}if(2&n){const e=t.oxw();t.xp6(3),t.Q6J("classes",null===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(2),t.Q6J("classes","job"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(2),t.Q6J("classes","personal_project"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(2),t.Q6J("classes","volunteer"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(5),t.Q6J("ngForOf",t.lcZ(15,10,e.activities)),t.xp6(5),t.Q6J("ngForOf",e.mediaTypes)}}const w=[{path:"",component:(()=>{class n{constructor(e,i,a,c,u){this.galleryService=e,this.mainService=i,this.activatedRoute=a,this.titleService=c,this.controlerService=u,this.experiencesRoute=l.I_.route,this.currentDate=(new Date).getFullYear(),this.defaultActivity=null,this.currentActivity=null,this.defaultCategory=null,this.currentCategory=null,this.isLegendDisplayed=!0,this.tagsIcon=l.yK,this.tagIcon=l.V2,this.defaultType=null,this.currentType=null,this.assetsImagesPath=l.On,this.galleryItems=[],this.innerRoutesAvailable=["maps/app/"],this.isDataAvailable=!1,this.fragment=null,this.typeStyleMapping={chart:{icon:l.Mj,title:"Graphiques & tableaux"},video:{icon:l.uk,title:"Vid\xe9os"},map:{icon:l.aD,title:"Cartes"},app:{icon:l.XL,title:"Applications"},tool:{icon:l.MQ,title:"Outils"},library:{icon:l.C1,title:"Libraries"},methodo:{icon:l.VF,title:"M\xe9thodologies"}},this.categoriesActivity={job:"Exp\xe9riences",personal_project:"Projet personnel",volunteer:"B\xe9n\xe9volat"},this.featureTypes={url_video:"video",url_img:"modal",url_app:"website",asset_img:"modal",asset_app:"local_website"},this.titleService.setTitle(this.activatedRoute.snapshot.data.title),this.activatedRoute.fragment.subscribe(r=>{void 0!==r&&(this.fragment=r)}),this.activitiesGallerySubscription=this.galleryService.activitiesGalleryData.subscribe(r=>{this.galleryItems=[],r.items.forEach(E=>{this.galleryItems.push(this.buildFeature(E))}),this.mediaTypes=r.media_types_available,this.activities=r.activities,this.currentCategory=r.current_category,this.isDataAvailable=!0})}ngOnInit(){this.sendResumeSubMenus(),this.resetGallery(),this.filterFromAnchor()}ngOnDestroy(){this.activitiesGallerySubscription.unsubscribe()}sendResumeSubMenus(){this.controlerService.pullSubMenus([])}buildFeature(e){let i;[null,"nan"].includes(e.media_splash)&&(e.media_splash=e.media),i=e.media_splash,e.media_splash.includes("http")||(i=l.On+e.media_splash),"asset"===e.source.split("_")[0]&&(e.media=l.On+e.media_splash);let c={};return e.data&&(c.Donn\u00e9es=e.data),e.tools&&(c.Outils=e.tools),{id:e.identifier,title:e.title,image_url:i,content_url:e.media,categories:[],tags:[],activityType:{name:this.categoriesActivity[e.category],class:e.category},experienceName:{name:e.name,color:e.color},mediaType:{name:e.type,icon:this.typeStyleMapping[e.type]},type:this.featureTypes[e.source],description:e.description,addons:c}}filterFromAnchor(){try{null!==this.fragment&&this.getGalleryDataByActivity(this.fragment.replace("#",""))}catch{}}resetGallery(){this.currentActivity=this.defaultActivity,this.currentCategory=this.defaultCategory,this.currentType=this.defaultType,this.galleryService.pullExistingActivitiesGallery(this.currentActivity,this.currentCategory,this.currentType),this.mainService.scrollToTopAction()}getGalleryDataByActivity(e){this.currentActivity=e,this.currentType=this.defaultType,this.galleryService.pullExistingActivitiesGallery(this.currentActivity,this.currentCategory,this.currentType),this.mainService.scrollToTopAction()}getGalleryDataByCategory(e){this.currentCategory=e,this.currentActivity=this.defaultActivity,this.currentType=this.defaultType,this.galleryService.pullExistingActivitiesGallery(this.currentActivity,this.currentCategory,this.currentType),this.mainService.scrollToTopAction()}getGalleryDataByType(e){this.currentType=e,this.galleryService.pullExistingActivitiesGallery(this.currentActivity,this.currentCategory,this.currentType),this.mainService.scrollToTopAction()}displayContentRegardingDeviceScreen(){0===window.screen.orientation.angle&&window.screen.height<=l.OM&&(this.isLegendDisplayed=!1)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}urlAppChecker(e){let i=!1;return this.innerRoutesAvailable.forEach(a=>{e.includes(a)&&(i=!0)}),i}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(m.r),t.Y36(h.J),t.Y36(y.gz),t.Y36(v.Dx),t.Y36(f.L))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-layout"]],hostBindings:function(e,i){1&e&&t.NdJ("orientationchange",function(c){return i.displayContentRegardingDeviceScreen(c)},!1,t.Jf7)},decls:3,vars:1,consts:[["id","galleryHome","class","gallery",4,"ngIf"],["galleryControler",""],["id","galleryHome",1,"gallery"],["columnNb","3","featuresHeaderClass","text-bg-dark",3,"features"],["descriptionTemplate",""],["classes","position-sticky"],["controlersTemplate",""],[1,"body-activity-badges","d-flex","flex-row","flex-wrap","mt-2","align-items-center"],[3,"classes",4,"ngIf"],["classes","pointer",3,"routerLink","fragment","customBgColor",4,"ngIf"],[3,"classes","icon",4,"ngIf"],["class","mt-2",4,"ngIf"],[3,"classes"],["classes","pointer",3,"routerLink","fragment","customBgColor"],[3,"classes","icon"],[1,"mt-2"],["class","",4,"ngFor","ngForOf"],[1,""],[4,"ngTemplateOutlet"],[3,"classes","icon","click"],["iconClasses","text-job",3,"classes","icon","click"],["iconClasses","text-personal_project",3,"classes","icon","click"],["iconClasses","text-volunteer",3,"classes","icon","click"],[4,"ngFor","ngForOf"],[3,"classes","click"],[3,"classes","icon","title","click"]],template:function(e,i){1&e&&(t.YNc(0,O,7,2,"article",0),t.YNc(1,Q,20,12,"ng-template",null,1,t.W1O)),2&e&&t.Q6J("ngIf",i.isDataAvailable)},dependencies:[p.sg,p.O5,p.tP,y.rH,x.A,T.d,C.C,b.v,A.H,Z.b,p.Nd],styles:[".gallery-container[_ngcontent-%COMP%]{columns:350px;column-count:3;column-gap:3%}"],data:{animation:[_.Ae]}}),n})(),data:{title:"Galerie",page:"gallery"}}];let Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[y.Bz.forChild(w),y.Bz]}),n})();var j=s(4586),k=s(739),H=s(7157);let U=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[m.r],imports:[p.ez,Y,d.uH,j.Dt,k.j,H.p]}),n})()}}]);