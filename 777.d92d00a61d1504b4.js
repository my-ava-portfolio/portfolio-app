"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[777],{777:(q,v,o)=>{o.r(v),o.d(v,{GalleryModule:()=>y});var m=o(6895),f=o(2216),_=o(9371),T=o(3991),r=o(1904),C=o(1837),h=o(8712),p=o(2687),b=o(1853),t=o(4650),x=o(7579),A=o(529);class l{constructor(n){this.http=n,this.apiUrlActivitiesGallery=r.JW+"gallery/",this.ErrorActivitiesGalleryApiFound=new x.x,this.activitiesGalleryData=new x.x}queryGalleryFeatures(n){this.http.get(`${this.apiUrlActivitiesGallery}`,{params:n}).subscribe({complete:()=>{},error:e=>{this.ErrorActivitiesGalleryApiFound.next(e.error.message)},next:e=>{this.activitiesGalleryData.next(e)}})}}l.\u0275fac=function(n){return new(n||l)(t.LFG(A.eN))},l.\u0275prov=t.Yz7({token:l,factory:l.\u0275fac});var Z=o(2735),G=o(9537),L=o(5538),J=o(9645),F=o(5408),M=o(9970),S=o(910);function N(i,n){if(1&i&&(t.TgZ(0,"set-badge-content",11),t._uU(1),t.qZA()),2&i){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.activityType.class),t.xp6(1),t.Oqu(e.activityType.name)}}function O(i,n){if(1&i&&(t.TgZ(0,"set-badge-content",12),t._uU(1),t.qZA()),2&i){const e=t.oxw().$implicit,a=t.oxw();t.Q6J("routerLink",a.experiencesRoute)("fragment",e.id)("customBgColor",e.experienceName.color),t.xp6(1),t.Oqu(e.experienceName.name)}}function D(i,n){if(1&i&&(t.TgZ(0,"set-badge-content",13),t._uU(1),t.qZA()),2&i){const e=t.oxw().$implicit;t.Q6J("classes","pe-none text-bg-"+e.mediaType.name)("icon",e.mediaType.icon.icon),t.xp6(1),t.Oqu(e.mediaType.icon.title)}}function B(i,n){if(1&i&&(t.TgZ(0,"li",16)(1,"span"),t._uU(2),t.qZA(),t.TgZ(3,"span"),t._uU(4),t.qZA()()),2&i){const e=n.$implicit;t.xp6(2),t.hij("",e.key," : "),t.xp6(2),t.Oqu(e.value)}}function I(i,n){if(1&i&&(t.TgZ(0,"ul",14),t.YNc(1,B,5,2,"li",15),t.ALo(2,"keyvalue"),t.qZA()),2&i){const e=t.oxw().$implicit;t.xp6(1),t.Q6J("ngForOf",t.lcZ(2,1,e.addons))}}function Q(i,n){if(1&i&&(t.TgZ(0,"div",6),t.YNc(1,N,2,2,"set-badge-content",7),t.YNc(2,O,2,4,"set-badge-content",8),t.YNc(3,D,2,3,"set-badge-content",9),t.qZA(),t.TgZ(4,"set-paragraph-content"),t._uU(5),t.YNc(6,I,3,3,"ul",10),t.qZA()),2&i){const e=n.$implicit;t.xp6(1),t.Q6J("ngIf",e.activityType),t.xp6(1),t.Q6J("ngIf",e.experienceName),t.xp6(1),t.Q6J("ngIf",e.mediaType),t.xp6(2),t.hij(" ",e.description," "),t.xp6(1),t.Q6J("ngIf",e.addons)}}function j(i,n){1&i&&t.GkF(0)}function w(i,n){if(1&i&&t.YNc(0,j,1,0,"ng-container",17),2&i){t.oxw();const e=t.MAs(8);t.Q6J("ngTemplateOutlet",e)}}function H(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",25),t.NdJ("click",function(){const c=t.CHM(e).$implicit,g=t.oxw(2);return t.KtG(g.getGalleryDataByActivity(c.key))}),t._uU(2),t.qZA(),t.BQk()}if(2&i){const e=n.$implicit,a=t.oxw(2);t.xp6(1),t.Q6J("classes",a.currentActivity===e.key?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary"),t.xp6(1),t.hij("",e.value," ")}}function U(i,n){if(1&i){const e=t.EpF();t.ynx(0),t.TgZ(1,"set-button-content",26),t.NdJ("click",function(){const c=t.CHM(e).$implicit,g=t.oxw(2);return t.KtG(g.getGalleryDataByMediaType(c))}),t.qZA(),t.BQk()}if(2&i){const e=n.$implicit,a=t.oxw(2);t.xp6(1),t.Q6J("classes","mx-0 rounded-0 btn-sm text-bg-"+e)("icon",a.typeStyleMapping[e].icon)("title",a.typeStyleMapping[e].title)}}function Y(i,n){if(1&i){const e=t.EpF();t.TgZ(0,"set-section-container",18)(1,"h6"),t._uU(2,"Filtrage par cat\xe9gories"),t.qZA(),t.TgZ(3,"div",19)(4,"set-button-content",20),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.resetGallery())}),t._uU(5,"Tous "),t.qZA()(),t.TgZ(6,"set-button-content",21),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("job"))}),t._uU(7),t.qZA(),t.TgZ(8,"set-button-content",22),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("personal-project"))}),t._uU(9),t.qZA(),t.TgZ(10,"set-button-content",23),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.getGalleryDataByCategory("volunteer"))}),t._uU(11),t.qZA()(),t.TgZ(12,"set-section-container",18)(13,"h6"),t._uU(14,"Filtrage par activit\xe9s"),t.qZA(),t.YNc(15,H,3,2,"ng-container",24),t.ALo(16,"keyvalue"),t.qZA(),t.TgZ(17,"set-section-container",18)(18,"h6"),t._uU(19,"Filtrage par types d'illustration"),t.qZA(),t.YNc(20,U,2,3,"ng-container",24),t.qZA()}if(2&i){const e=t.oxw();t.xp6(4),t.Q6J("classes",null===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(2),t.Q6J("classes","job"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping.job," "),t.xp6(1),t.Q6J("classes","personal-project"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping["personal-project"]," "),t.xp6(1),t.Q6J("classes","volunteer"===e.currentCategory?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",e.tagIcon),t.xp6(1),t.hij("",e.activitiesMapping.volunteer," "),t.xp6(4),t.Q6J("ngForOf",t.lcZ(16,13,e.activities)),t.xp6(5),t.Q6J("ngForOf",e.mediaTypes)}}class d{constructor(n,e,a){this.galleryService=n,this.mainService=e,this.activatedRoute=a,this.experiencesRoute=b.I_.route,this.currentDate=(new Date).getFullYear(),this.defaultActivity="null",this.currentActivity="null",this.defaultCategory="null",this.currentCategory="null",this.isLegendDisplayed=!0,this.tagsIcon=p.tho,this.tagIcon=p.LEN,this.defaultType=null,this.currentType=null,this.assetsImagesPath=r.On,this.galleryItems=[],this.activitiesMapping=r.$M,this.typeStyleMapping={chart:{icon:p.koM,title:"Graphiques & tableaux"},video:{icon:h.opf,title:"Vid\xe9os"},map:{icon:p.Wx7,title:"Cartes"},app:{icon:h.OF7,title:"Applications"},tool:{icon:p.CgH,title:"Outils"},library:{icon:h.Bmx,title:"Libraries"},methodo:{icon:p.TmZ,title:"M\xe9thodologies"}},this.featureTypes={url_video:"video",url_img:"modal",url_app:"website",asset_img:"modal",asset_app:"local_website"},this.activatedRouteSubscription=this.activatedRoute.fragment.subscribe(s=>{null===s?this.resetGallery():this.getGalleryDataByActivity(s)}),this.activitiesGallerySubscription=this.galleryService.activitiesGalleryData.subscribe(s=>{this.galleryItems=[],s.forEach(c=>{this.galleryItems.push(this.buildFeature(c))}),this.mediaTypes=[...new Set(s.map(c=>c.type))],this.activities=s.reduce(function(c,g){return c[g.activity_identifier]=g.name,c},{})})}ngOnInit(){}ngOnDestroy(){this.activitiesGallerySubscription.unsubscribe(),this.activatedRouteSubscription.unsubscribe()}buildFeature(n){let e;[null,"nan"].includes(n.media_splash)&&(n.media_splash=n.media),e=n.media_splash,n.media_splash.includes("http")||(e=r.On+n.media_splash),["asset_img"].includes(n.source)&&(n.media=r.On+n.media_splash);let a={};return n.data&&(a.Donn\u00e9es=n.data),n.tools&&(a.Outils=n.tools),{id:n.activity_identifier,title:n.title,image_url:e,content_url:n.media,categories:[],tags:[],activityType:{name:r.$M[n.category],class:n.category},experienceName:{name:n.name,color:n.color},mediaType:{name:n.type,icon:this.typeStyleMapping[n.type]},type:this.featureTypes[n.source],description:n.description,addons:a}}resetGallery(){this.currentActivity=this.defaultActivity,this.currentCategory=this.defaultCategory,this.currentType=this.defaultType,this.galleryService.queryGalleryFeatures({}),this.mainService.scrollToTopAction()}getGalleryDataByCategory(n){this.currentCategory=n,this.galleryService.queryGalleryFeatures({activity_type:this.currentCategory}),this.mainService.scrollToTopAction()}getGalleryDataByActivity(n){this.currentActivity=n,this.galleryService.queryGalleryFeatures({activity_type:this.currentCategory,activity_name:this.currentActivity}),this.mainService.scrollToTopAction()}getGalleryDataByMediaType(n){this.currentType=n,this.galleryService.queryGalleryFeatures({activity_type:this.currentCategory,activity_name:this.currentActivity,media_type:this.currentType}),this.mainService.scrollToTopAction()}displayContentRegardingDeviceScreen(){0===window.screen.orientation.angle&&window.screen.height<=C.OM&&(this.isLegendDisplayed=!1)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}}d.\u0275fac=function(n){return new(n||d)(t.Y36(l),t.Y36(Z.J),t.Y36(_.gz))},d.\u0275cmp=t.Xpm({type:d,selectors:[["app-app-layout"]],hostBindings:function(n,e){1&n&&t.NdJ("orientationchange",function(s){return e.displayContentRegardingDeviceScreen(s)},!1,t.Jf7)},decls:9,vars:2,consts:[["id","galleryHome",1,"gallery"],["columnNb","3","featuresHeaderClass","text-bg-dark",3,"features"],["descriptionTemplate",""],["classes","position-sticky"],["controlersTemplate",""],["galleryControler",""],[1,"body-activity-badges","d-flex","flex-row","flex-wrap","mt-2","align-items-center"],[3,"classes",4,"ngIf"],["classes","pointer",3,"routerLink","fragment","customBgColor",4,"ngIf"],[3,"classes","icon",4,"ngIf"],["class","mt-2",4,"ngIf"],[3,"classes"],["classes","pointer",3,"routerLink","fragment","customBgColor"],[3,"classes","icon"],[1,"mt-2"],["class","",4,"ngFor","ngForOf"],[1,""],[4,"ngTemplateOutlet"],[1,"col-12","col-lg-4"],[1,"row"],[3,"classes","icon","click"],["iconClasses","text-job",3,"classes","icon","click"],["iconClasses","text-personal-project",3,"classes","icon","click"],["iconClasses","text-volunteer",3,"classes","icon","click"],[4,"ngFor","ngForOf"],[3,"classes","click"],[3,"classes","icon","title","click"]],template:function(n,e){1&n&&(t.TgZ(0,"article",0)(1,"app-grid-container",1),t.YNc(2,Q,7,5,"ng-template",null,2,t.W1O),t.qZA(),t.TgZ(4,"set-legend-container",3),t.YNc(5,w,1,1,"ng-template",null,4,t.W1O),t.qZA()(),t.YNc(7,Y,21,15,"ng-template",null,5,t.W1O)),2&n&&(t.Q6J("@fadeInOut",void 0),t.xp6(1),t.Q6J("features",e.galleryItems))},dependencies:[m.sg,m.O5,m.tP,_.rH,G.A,L.d,J.C,F.v,M.H,S.b,m.Nd],styles:[".gallery-container[_ngcontent-%COMP%]{columns:350px;column-count:3;column-gap:3%}"],data:{animation:[T.Ae]}});const k=[{path:"",component:d}];class u{}u.\u0275fac=function(n){return new(n||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[_.Bz.forChild(k),_.Bz]});var $=o(5055),R=o(6154),E=o(6852);class y{}y.\u0275fac=function(n){return new(n||y)},y.\u0275mod=t.oAB({type:y}),y.\u0275inj=t.cJS({providers:[l],imports:[m.ez,u,f.uH,$.Dt,R.j,E.p]})}}]);