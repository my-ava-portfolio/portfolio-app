"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[310],{9310:(j,l,o)=>{o.r(l),o.d(l,{HomeModule:()=>U});var r=o(6895),u=o(4945),p=o(433),c=o(646),g=o(2087),s=o(5017),e=o(4650),d=o(1481),f=o(3686),h=o(9033),y=o(942),x=o(4153),m=o(873),v=o(3655);function Z(n,a){if(1&n&&(e.TgZ(0,"set-article-header")(1,"div",1)(2,"h2",2),e._uU(3),e.qZA(),e.TgZ(4,"div",3)(5,"div",4),e._uU(6),e.qZA(),e.TgZ(7,"div",5),e._uU(8),e.qZA()(),e.TgZ(9,"set-paragraph-content",6),e._uU(10),e.qZA()(),e._UZ(11,"img",7),e.qZA()),2&n){const t=e.oxw();e.xp6(3),e.AsE("",t.generalData.first_name," ",t.generalData.last_name,""),e.xp6(3),e.Oqu(t.generalData.job),e.xp6(2),e.Oqu(t.generalData.experience_duration),e.xp6(2),e.hij(" ",t.generalData.carrier_summary," "),e.xp6(1),e.Q6J("src",t.imageProfile,e.LSH)}}let T=(()=>{class n{constructor(t){this.resumeService=t,this.imageProfile=s.tz,this.generalDataSubscription=this.resumeService.generalData.subscribe(i=>{this.generalData=i})}ngOnInit(){this.resumeService.pullGeneralData()}ngOnDestroy(){this.generalDataSubscription.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(x.B))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-general-info"]],decls:1,vars:1,consts:[[4,"ngIf"],["id","home__generalInfo__header",1,"d-flex","flex-column","text-center","my-2"],[1,"title-name"],[1,"my-2","d-flex","flex-column","flex-md-row","justify-content-center","mx-auto"],[1,"badge-title-light"],[1,"badge-title-warning"],[1,"text-white"],[1,"home-img","d-none","d-lg-block","rounded-circle","col-2","me-3",3,"src"]],template:function(t,i){1&t&&e.YNc(0,Z,12,6,"set-article-header",0),2&t&&e.Q6J("ngIf",i.generalData)},dependencies:[r.O5,m.v,v.P]}),n})();var C=o(485);function S(n,a){if(1&n&&(e.ynx(0),e.TgZ(1,"set-button-content",4),e._uU(2),e.qZA(),e.BQk()),2&n){const t=a.$implicit;e.xp6(1),e.Q6J("classes","btn-"+t.colorType)("title",t.title)("icon",t.icon)("route",t.route),e.xp6(1),e.hij("",t.title," ")}}function A(n,a){if(1&n&&(e.ynx(0),e.TgZ(1,"set-button-content",6),e._uU(2),e.qZA(),e.BQk()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Q6J("classes","btn-"+t.colorType)("icon",t.icon)("route",t.route),e.xp6(1),e.hij("",t.title," ")}}function I(n,a){if(1&n&&(e.ynx(0),e.TgZ(1,"set-button-content",7),e._uU(2),e.qZA(),e.BQk()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.Q6J("classes","btn-"+t.colorType)("icon",t.icon)("url",t.url),e.xp6(1),e.hij("",t.title," ")}}function O(n,a){if(1&n&&(e.ynx(0),e.YNc(1,A,3,4,"ng-container",5),e.YNc(2,I,3,4,"ng-container",5),e.BQk()),2&n){const t=a.$implicit;e.xp6(1),e.Q6J("ngIf",t.route),e.xp6(1),e.Q6J("ngIf",t.url)}}let D=(()=>{class n{constructor(){this.resumePages=s.$m,this.projectPages=s.cN}ngOnInit(){}ngOnDestroy(){}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-summary"]],decls:10,vars:2,consts:[["id","summary__card__welcome",1,"d-flex","flex-column","justify-content-around","bg-white"],[1,"title-tick-warning"],["id","summary__card__welcome__pageLinks",1,"text-center","mt-2","mb-5"],[4,"ngFor","ngForOf"],[3,"classes","title","icon","route"],[4,"ngIf"],[3,"classes","icon","route"],[3,"classes","icon","url"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"h3",1),e._uU(2,"Bienvenue"),e.qZA(),e.TgZ(3,"set-paragraph-content"),e._uU(4," Vous voici sur mon site personnel, \xe0 la fois pour pr\xe9senter mon parcours et mes r\xe9alisations, mais aussi un bac \xe0 sable qui me permet de centraliser mes exp\xe9rimentations. "),e.qZA(),e.TgZ(5,"h3",1),e._uU(6,"Rubriques"),e.qZA(),e.TgZ(7,"div",2),e.YNc(8,S,3,5,"ng-container",3),e.YNc(9,O,3,2,"ng-container",3),e.qZA()()),2&t&&(e.xp6(8),e.Q6J("ngForOf",i.resumePages),e.xp6(1),e.Q6J("ngForOf",i.projectPages))},dependencies:[r.sg,r.O5,C.C,m.v],styles:[".carousel-item[_ngcontent-%COMP%]   .row[_ngcontent-%COMP%]{min-height:320px!important}img[_ngcontent-%COMP%]:hover{-webkit-filter:brightness(70%);transition:all .5s ease}"]}),n})();const b=[{path:"",component:(()=>{class n{constructor(t,i,P){this.titleService=t,this.activatedRoute=i,this.controlerService=P,this.homeTopics=s.PA,this.isWelcomeCardDisplayed=!0,this.legendEnabled=!1,this.titleService.setTitle(this.activatedRoute.snapshot.data.title)}ngOnInit(){this.sendResumeSubMenus()}sendResumeSubMenus(){this.controlerService.pullSubMenus(this.homeTopics)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(d.Dx),e.Y36(c.gz),e.Y36(f.L))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-app-layout"]],decls:5,vars:2,consts:[[1,"align-middle","mx-auto","col","col-xl-8"]],template:function(t,i){1&t&&(e.TgZ(0,"set-article-container")(1,"div",0),e._UZ(2,"app-general-info"),e.TgZ(3,"set-section-container"),e._UZ(4,"app-summary"),e.qZA()()()),2&t&&(e.xp6(2),e.Q6J("@fadeInOut",void 0),e.xp6(2),e.Q6J("@fadeInOut",void 0))},dependencies:[h.y,y.d,T,D],data:{animation:[g.Ae]}}),n})(),data:{title:"Amaury Valorge - Portfolio",page:"about_me"}}];let Q=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[c.Bz.forChild(b),c.Bz]}),n})();var J=o(4586),M=o(7157);let U=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[r.ez,p.u5,Q,J.Dt,u.IJ,M.p]}),n})()}}]);