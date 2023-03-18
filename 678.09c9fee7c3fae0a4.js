"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[678],{9678:(q,m,o)=>{o.r(m),o.d(m,{GalleryModule:()=>E});var u=o(6895),v=o(2216),y=o(646),x=o(2087),r=o(8453),f=o(3996),g=o(8712),p=o(2687),T=o(1733),t=o(4650),d=o(7579),C=o(529);let _=(()=>{class n{constructor(e){this.http=e,this.apiUrlActivitiesGallery=r.JW+"gallery/",this.ErrorActivitiesGalleryApiFound=new d.x,this.activitiesGalleryData=new d.x}queryGalleryFeatures(e){this.http.get(`${this.apiUrlActivitiesGallery}`,{params:e}).subscribe({complete:()=>{},error:i=>{this.ErrorActivitiesGalleryApiFound.next(i.error.message)},next:i=>{this.activitiesGalleryData.next(i)}})}}return n.\u0275fac=function(e){return new(e||n)(t.LFG(C.eN))},n.\u0275prov=t.Yz7({token:n,factory:n.\u0275fac}),n})();var b=o(1557),A=o(7727),G=o(942),Z=o(485),L=o(873),J=o(6298),F=o(6423);function M(n,a){if(1&n&&(t.TgZ(0,"set-badge-content",11),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.activityType.class),t.xp6(1),t.Oqu(e.activityType.name)}}function S(n,a){if(1&n&&(t.TgZ(0,"set-badge-content",12),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit,i=t.oxw();t.Q6J("routerLink",i.experiencesRoute)("fragment",e.id)("customBgColor",e.experienceName.color),t.xp6(1),t.Oqu(e.experienceName.name)}}function N(n,a){if(1&n&&(t.TgZ(0,"set-badge-content",13),t._uU(1),t.qZA()),2&n){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.mediaType.name)("icon",e.mediaType.icon.icon),t.xp6(1),t.Oqu(e.mediaType.icon.title)}}function O(n,a){if(1&n&&(t.TgZ(0,"li",16)(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"span"),t._uU(4),t.qZA()()),2&n){const e=a.$implicit;t.xp6(2),t.hij("",e.key," : "),t.xp6(2),t.Oqu(e.value)}}function D(n,a){if(1&n&&(t.TgZ(0,"ul",14),t.YNc(1,O,5,2,"li",15),t.ALo(2,"keyvalue"),t.qZA()),2&n){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,1,e.addons))}}function B(n,a){if(1&n&&(t.TgZ(0,"div",6),t.YNc(1,M,2,2,"set-badge-content",7),t.YNc(2,S,2,4,"set-badge-content",8),t.YNc(3,N,2,3,"set-badge-content",9),t.qZA(),t.TgZ(4,"set-paragraph-content"),t._uU(5),t.YNc(6,D,3,3,"ul",10),t.qZA()),2&n){const e=a.$implicit;t.xp6(1),t.Q6J("ngIf",e.activityType),t.xp6(1),t.Q6J("ngIf",e.experienceName),t.xp6(1),t.Q6J("ngIf",e.mediaType),t.xp6(2),t.hij(" ",e.description," "),t.xp6(1),t.Q6J("ngIf",e.addons)}}function I(n,a){1&n&&t.GkF(0)}function Q(n,a){if(1&n&&t.YNc(0,I,1,0,"ng-container",17),2&n){t.oxw();const e=t.MAs(8);t.Q6J("ngTemplateOutlet",e)}}function j(n,a){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",25),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.getGalleryDataByActivity(c.key))}),t._uU(2),t.qZA(),t.BQk()}if(2&n){const e=a.$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("classes",i.currentActivity===e.key?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary"),t.xp6(1),t.hij("",e.value," ")}}function w(n,a){if(1&n){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",26),t.NdJ("click",function(){const c=t.CHM(e).$implicit,l=t.oxw(2);return t.KtG(l.getGalleryDataByMediaType(c))}),t.qZA(),t.BQk()}if(2&n){const e=a.$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("classes","mx-0 rounded-0 btn-sm text-bg-"+e)("icon",i.typeStyleMapping[e].icon)("title",i.typeStyleMapping[e].title)}}function H(n,a){if(1&n){const e=t.EpF();t.TgZ(0,"set-section-container",18)(1,"h6"),t._uU(2,"Filtrage par cat\xe9gories"),t.qZA(),t.TgZ(3,"div",19)(4,"set-button-content",20),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.resetGallery())}),t._uU(5,"Tous "),t.qZA()(),t.TgZ(6,"set-button-content",21),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("job"))}),t._uU(7),t.qZA(),t.TgZ(8,"set-button-content",22),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("personal-project"))}),t._uU(9),t.qZA(),t.TgZ(10,"set-button-content",23),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("volunteer"))}),t._uU(11),t.qZA()(),t.TgZ(12,"set-section-container",18)(13,"h6"),t._uU(14,"Filtrage par activit\xe9s"),t.qZA(),t.YNc(15,j,3,2,"ng-container",24),t.ALo(16,"keyvalue"),t.qZA(),t.TgZ(17,"set-section-container",18)(18,"h6"),t._uU(19,"Filtrage par types d'illustration"),t.qZA(),t.YNc(20,w,2,3,"ng-container",24),t.qZA()}if(2&n){const e=t.oxw();t.xp6(4),t.Q6J("classes",null===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(2),t.Q6J("classes","job"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping.job," "),t.xp6(1),t.Q6J("classes","personal-project"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping["personal-project"]," "),t.xp6(1),t.Q6J("classes","volunteer"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping.volunteer," "),t.xp6(4),t.Q6J("ngForOf",t.lcZ(16,13,e.activities)),t.xp6(5),t.Q6J("ngForOf",e.mediaTypes)}}const U=[{path:"",component:(()=>{class n{constructor(e,i,s){this.galleryService=e,this.mainService=i,this.activatedRoute=s,this.experiencesRoute=T.I_.route,this.currentDate=(new Date).getFullYear(),this.defaultActivity="null",this.currentActivity="null",this.defaultCategory="null",this.currentCategory="null",this.isLegendDisplayed=!0,this.tagsIcon=p.tho,this.tagIcon=p.LEN,this.defaultType=null,this.currentType=null,this.assetsImagesPath=r.On,this.galleryItems=[],this.activitiesMapping=r.$M,this.typeStyleMapping={chart:{icon:p.koM,title:"Graphiques & tableaux"},video:{icon:g.opf,title:"Vid\xe9os"},map:{icon:p.Wx7,title:"Cartes"},app:{icon:g.OF7,title:"Applications"},tool:{icon:p.CgH,title:"Outils"},library:{icon:g.Bmx,title:"Libraries"},methodo:{icon:p.TmZ,title:"M\xe9thodologies"}},this.featureTypes={url_video:"video",url_img:"modal",url_app:"website",asset_img:"modal",asset_app:"local_website"},this.activatedRouteSubscription=this.activatedRoute.fragment.subscribe(c=>{null===c?this.resetGallery():this.getGalleryDataByActivity(c)}),this.activitiesGallerySubscription=this.galleryService.activitiesGalleryData.subscribe(c=>{this.galleryItems=[],c.forEach(l=>{this.galleryItems.push(this.buildFeature(l))}),this.mediaTypes=[...new Set(c.map(l=>l.type))],this.activities=c.reduce(function(l,h){return l[h.activity_identifier]=h.name,l},{})})}ngOnInit(){}ngOnDestroy(){this.activitiesGallerySubscription.unsubscribe(),this.activatedRouteSubscription.unsubscribe()}buildFeature(e){let i;[null,"nan"].includes(e.media_splash)&&(e.media_splash=e.media),i=e.media_splash,e.media_splash.includes("http")||(i=r.On+"md-"+e.media_splash),["asset_img"].includes(e.source)&&(e.media=r.On+e.media_splash);let s={};return e.data&&(s.Donn\u00e9es=e.data),e.tools&&(s.Outils=e.tools),{id:e.activity_identifier,title:e.title,image_url:i,content_url:e.media,categories:[],tags:[],activityType:{name:r.$M[e.category],class:e.category},experienceName:{name:e.name,color:e.color},mediaType:{name:e.type,icon:this.typeStyleMapping[e.type]},type:this.featureTypes[e.source],description:e.description,addons:s}}resetGallery(){this.currentActivity=this.defaultActivity,this.currentCategory=this.defaultCategory,this.currentType=this.defaultType,this.galleryService.queryGalleryFeatures({}),this.mainService.scrollToTopAction()}getGalleryDataByCategory(e){this.currentCategory=e,this.galleryService.queryGalleryFeatures({activity_type:this.currentCategory}),this.mainService.scrollToTopAction()}getGalleryDataByActivity(e){this.currentActivity=e,this.galleryService.queryGalleryFeatures({activity_name:this.currentActivity}),this.mainService.scrollToTopAction()}getGalleryDataByMediaType(e){this.currentType=e,this.galleryService.queryGalleryFeatures({media_type:this.currentType}),this.mainService.scrollToTopAction()}displayContentRegardingDeviceScreen(){0===window.screen.orientation.angle&&window.screen.height<=f.OM&&(this.isLegendDisplayed=!1)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}}return n.\u0275fac=function(e){return new(e||n)(t.Y36(_),t.Y36(b.J),t.Y36(y.gz))},n.\u0275cmp=t.Xpm({type:n,selectors:[["app-app-layout"]],hostBindings:function(e,i){1&e&&t.NdJ("orientationchange",function(c){return i.displayContentRegardingDeviceScreen(c)},!1,t.Jf7)},decls:9,vars:2,consts:[["id","galleryHome",1,"gallery"],["columnNb","3","featuresHeaderClass","text-bg-dark",3,"features"],["descriptionTemplate",""],["classes","position-sticky"],["controlersTemplate",""],["galleryControler",""],[1,"body-activity-badges","d-flex","flex-row","flex-wrap","mt-2","align-items-center"],[3,"classes",4,"ngIf"],["classes","pointer",3,"routerLink","fragment","customBgColor",4,"ngIf"],[3,"classes","icon",4,"ngIf"],["class","mt-2",4,"ngIf"],[3,"classes"],["classes","pointer",3,"routerLink","fragment","customBgColor"],[3,"classes","icon"],[1,"mt-2"],["class","",4,"ngFor","ngForOf"],[1,""],[4,"ngTemplateOutlet"],[1,"col-12","col-lg-4"],[1,"row"],[3,"classes","icon","click"],["iconClasses","text-job",3,"classes","icon","click"],["iconClasses","text-personal-project",3,"classes","icon","click"],["iconClasses","text-volunteer",3,"classes","icon","click"],[4,"ngFor","ngForOf"],[3,"classes","click"],[3,"classes","icon","title","click"]],template:function(e,i){1&e&&(t.TgZ(0,"article",0)(1,"app-grid-container",1),t.YNc(2,B,7,5,"ng-template",null,2,t.W1O),t.qZA(),t.TgZ(4,"set-legend-container",3),t.YNc(5,Q,1,1,"ng-template",null,4,t.W1O),t.qZA()(),t.YNc(7,H,21,15,"ng-template",null,5,t.W1O)),2&e&&(t.Q6J("@fadeInOut",void 0),t.xp6(1),t.Q6J("features",i.galleryItems))},dependencies:[u.sg,u.O5,u.tP,y.rH,A.A,G.d,Z.C,L.v,J.H,F.b,u.Nd],styles:[".gallery-container[_ngcontent-%COMP%]{columns:350px;column-count:3;column-gap:3%}"],data:{animation:[x.Ae]}}),n})()}];let Y=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({imports:[y.Bz.forChild(U),y.Bz]}),n})();var k=o(4586),$=o(739),R=o(7157);let E=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=t.oAB({type:n}),n.\u0275inj=t.cJS({providers:[_],imports:[u.ez,Y,v.uH,k.Dt,$.j,R.p]}),n})()}}]);