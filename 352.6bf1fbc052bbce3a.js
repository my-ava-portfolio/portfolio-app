"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[352],{2352:(w,p,s)=>{s.r(p),s.d(p,{BlogModule:()=>z});var r=s(6895),u=s(646),f=s(2087),m=s(2687),_=s(8227),t=s(4650),d=s(7579),T=s(8453),y=s(529);let h=(()=>{class e{constructor(o){this.http=o,this.apiUrlNotesData=T.JW,this.ErrorTopicsDataApiFound=new d.x,this.blogData=new d.x}queryBlogTopics(){this.http.get(`${this.apiUrlNotesData}blog/`).subscribe({complete:()=>{},error:o=>{this.ErrorTopicsDataApiFound.next(o.message)},next:o=>{this.blogData.next(o)}})}}return e.\u0275fac=function(o){return new(o||e)(t.LFG(y.eN))},e.\u0275prov=t.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var v=s(1557),C=s(7727),b=s(942),x=s(485),B=s(873),F=s(6298),A=s(6423);function Z(e,n){if(1&e&&(t.TgZ(0,"set-badge-content",12),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("customBgColor",o.color),t.xp6(1),t.Oqu(o.name)}}function L(e,n){if(1&e&&(t.TgZ(0,"div",9)(1,"span",10),t._uU(2,"Cat\xe9gorie(s):"),t.qZA(),t.YNc(3,Z,2,2,"set-badge-content",11),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",o.categories)}}function N(e,n){if(1&e&&(t.TgZ(0,"set-badge-content",12),t._uU(1),t.qZA()),2&e){const o=n.$implicit;t.Q6J("customBgColor",o.color),t.xp6(1),t.Oqu(o.name)}}function J(e,n){if(1&e&&(t.TgZ(0,"div",9)(1,"span",10),t._uU(2,"Tag(s):"),t.qZA(),t.YNc(3,N,2,2,"set-badge-content",11),t.qZA()),2&e){const o=t.oxw().$implicit;t.xp6(3),t.Q6J("ngForOf",o.tags)}}function S(e,n){if(1&e&&(t.TgZ(0,"div",7),t.YNc(1,L,4,1,"div",8),t.YNc(2,J,4,1,"div",8),t.qZA(),t.TgZ(3,"set-paragraph-content"),t._uU(4),t.qZA()),2&e){const o=n.$implicit;t.xp6(1),t.Q6J("ngIf",o.categories.length>0),t.xp6(1),t.Q6J("ngIf",o.tags.length>0),t.xp6(2),t.Oqu(o.description)}}function O(e,n){1&e&&t.GkF(0)}function E(e,n){if(1&e&&t.YNc(0,O,1,0,"ng-container",13),2&e){t.oxw(2);const o=t.MAs(2);t.Q6J("ngTemplateOutlet",o)}}function Q(e,n){if(1&e&&(t.TgZ(0,"div",2)(1,"app-grid-container",3),t.YNc(2,S,5,3,"ng-template",null,4,t.W1O),t.qZA(),t.TgZ(4,"set-legend-container",5),t.YNc(5,E,1,1,"ng-template",null,6,t.W1O),t.qZA()()),2&e){const o=t.oxw();t.Q6J("@fadeInOut",void 0),t.xp6(1),t.Q6J("features",o.selectedblogTopics)}}function D(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"set-button-content",16),t.NdJ("click",function(){const c=t.CHM(o).$implicit,l=t.oxw(2);return t.KtG(l.selectContentByCategory(c.name))}),t._uU(1),t.qZA()}if(2&e){const o=n.$implicit,i=t.oxw(2);t.Q6J("classes",i.currentCategory===o.name?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",i.tagIcon)("iconNgStyle","color:"+o.color+";"),t.xp6(1),t.hij("",o.name," ")}}function Y(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"set-button-content",16),t.NdJ("click",function(){const c=t.CHM(o).$implicit,l=t.oxw(2);return t.KtG(l.selectContentByTag(c.name))}),t._uU(1),t.qZA()}if(2&e){const o=n.$implicit,i=t.oxw(2);t.Q6J("classes",i.currentTag===o.name?"btn-sm btn-secondary fw-bold":"btn-sm btn-secondary")("icon",i.tagIcon)("iconNgStyle","color:"+o.color+";"),t.xp6(1),t.hij("",o.name," ")}}function I(e,n){if(1&e){const o=t.EpF();t.TgZ(0,"set-section-container")(1,"h6"),t._uU(2,"Filtrage par cat\xe9gories"),t.qZA(),t.TgZ(3,"set-button-content",14),t.NdJ("click",function(){t.CHM(o);const a=t.oxw();return t.KtG(a.resetContent())}),t._uU(4,"Tous "),t.qZA(),t.YNc(5,D,2,4,"set-button-content",15),t.qZA(),t.TgZ(6,"set-section-container")(7,"h6"),t._uU(8,"Filtrage par tags"),t.qZA(),t.YNc(9,Y,2,4,"set-button-content",15),t.qZA()}if(2&e){const o=t.oxw();t.xp6(3),t.Q6J("icon",o.tagIcon),t.xp6(2),t.Q6J("ngForOf",o.allCategories),t.xp6(4),t.Q6J("ngForOf",o.allTags)}}const U=[{path:"",component:(()=>{class e{constructor(o,i){this.blogService=o,this.mainService=i,this.isLegendDisplayed=!0,this.tagsIcon=m.tho,this.tagIcon=m.LEN,this.allCategories=[],this.seedCategory=50,this.allTags=[],this.seedTag=8,this.selectedblogTopics=[],this.allBlogTopics=[],this.topicsDataSubscription=this.blogService.blogData.subscribe(a=>{a.forEach(c=>{this.allBlogTopics.push(this.buildFeature(c))}),this.selectedblogTopics=this.allBlogTopics,this.allBlogTopics.forEach(c=>{c.categories.forEach(l=>{0===Array.from(this.allCategories.values()).filter(g=>g.name===l.name).length&&this.allCategories.push(l)})}),this.allBlogTopics.forEach(c=>{c.tags.forEach(l=>{0===Array.from(this.allTags.values()).filter(g=>g.name===l.name).length&&this.allTags.push(l)})})})}ngOnInit(){this.blogService.queryBlogTopics()}ngOnDestroy(){this.topicsDataSubscription.unsubscribe()}buildFeature(o){let i=[];o.categories.forEach(c=>{i.push({name:c,color:this.getTagColor(c,this.seedCategory)})});let a=[];return o.tags.forEach(c=>{a.push({name:c,color:this.getTagColor(c,this.seedTag)})}),{title:o.title,image_url:o.image,content_url:o.url,categories:i,tags:a,type:"website",description:o.resume}}getTagColor(o,i){return(0,_.u_)(o,i)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}resetContent(){this.selectedblogTopics=this.allBlogTopics,this.mainService.scrollToTopAction()}selectContentByCategory(o){let i=this.allBlogTopics.filter(a=>1===Array.from(a.categories.values()).filter(l=>l.name===o).length);this.currentCategory=o,this.selectedblogTopics=i,this.mainService.scrollToTopAction()}selectContentByTag(o){let i=this.allBlogTopics.filter(a=>1===Array.from(a.tags.values()).filter(l=>l.name===o).length);this.currentTag=o,this.selectedblogTopics=i,this.mainService.scrollToTopAction()}}return e.\u0275fac=function(o){return new(o||e)(t.Y36(h),t.Y36(v.J))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-app-layout"]],decls:3,vars:1,consts:[["id","blogHome","class","gallery",4,"ngIf"],["controler",""],["id","blogHome",1,"gallery"],["columnNb","4","featuresHeaderClass","text-bg-dark",3,"features"],["descriptionTemplate",""],["classes","position-sticky"],["controlersTemplate",""],[1,"body-generic-badges","mt-2"],["class","body-text small",4,"ngIf"],[1,"body-text","small"],[1,"fw-bold"],[3,"customBgColor",4,"ngFor","ngForOf"],[3,"customBgColor"],[4,"ngTemplateOutlet"],["classes","btn-sm btn-secondary",3,"icon","click"],[3,"classes","icon","iconNgStyle","click",4,"ngFor","ngForOf"],[3,"classes","icon","iconNgStyle","click"]],template:function(o,i){1&o&&(t.YNc(0,Q,7,2,"div",0),t.YNc(1,I,10,3,"ng-template",null,1,t.W1O)),2&o&&t.Q6J("ngIf",i.selectedblogTopics.length>0)},dependencies:[r.sg,r.O5,r.tP,C.A,b.d,x.C,B.v,F.H,A.b],data:{animation:[f.Ae]}}),e})()}];let M=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[u.Bz.forChild(U),u.Bz]}),e})();var $=s(2216),H=s(4586),j=s(739),G=s(7157);let z=(()=>{class e{}return e.\u0275fac=function(o){return new(o||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[h],imports:[r.ez,M,H.Dt,$.uH,j.j,G.p]}),e})()}}]);