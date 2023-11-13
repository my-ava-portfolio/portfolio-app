"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[592],{8553:(P,C,l)=>{l.d(C,{y:()=>g});var t=l(4755),e=l(2223);const f=["*"];let g=(()=>{class m{constructor(){}ngOnInit(){}}return m.\u0275fac=function(c){return new(c||m)},m.\u0275cmp=e.Xpm({type:m,selectors:[["set-article-container"]],standalone:!0,features:[e.jDz],ngContentSelectors:f,decls:2,vars:0,consts:[[1,"d-flex","flex-column","m-2","rounded"]],template:function(c,u){1&c&&(e.F$t(),e.TgZ(0,"article",0),e.Hsn(1),e.qZA())},dependencies:[t.ez]}),m})()},8037:(P,C,l)=>{l.d(C,{P:()=>g});var t=l(4755),e=l(2223);const f=["*"];let g=(()=>{class m{constructor(){}ngOnInit(){}}return m.\u0275fac=function(c){return new(c||m)},m.\u0275cmp=e.Xpm({type:m,selectors:[["set-article-header"]],standalone:!0,features:[e.jDz],ngContentSelectors:f,decls:2,vars:0,consts:[[1,"d-flex","flex-xl-row","flex-column","justify-content-around","align-items-center","bg-dark","bg-gradient","rounded-top","py-3"]],template:function(c,u){1&c&&(e.F$t(),e.TgZ(0,"div",0),e.Hsn(1),e.qZA())},dependencies:[t.ez]}),m})()},4519:(P,C,l)=>{l.d(C,{b:()=>a});var t=l(4755),e=l(2223),f=l(9947);const g=["buttonsTemplate"],m=["controlersTemplate"];function r(d,n){1&d&&e.GkF(0)}function c(d,n){1&d&&e.GkF(0)}const u=["*"];let a=(()=>{class d{constructor(i){this.mapService=i,this.tagIcon="bi bi-bookmarks-fill",this.isLegendDisplayed=!0}ngOnInit(){}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}zoomOnData(){this.mapService.sendZoomAction()}}return d.\u0275fac=function(i){return new(i||d)(e.Y36(f.S))},d.\u0275cmp=e.Xpm({type:d,selectors:[["set-legend-container"]],contentQueries:function(i,s,p){if(1&i&&(e.Suo(p,g,5),e.Suo(p,m,5)),2&i){let o;e.iGM(o=e.CRH())&&(s.buttonsTmplt=o.first),e.iGM(o=e.CRH())&&(s.controlersTmplt=o.first)}},inputs:{classes:"classes"},standalone:!0,features:[e.jDz],ngContentSelectors:u,decls:10,vars:6,consts:[["id","legendContainer",1,"d-flex","flex-column","bottom-0","position-fixed",3,"ngClass"],[1,"legend-container-buttons","mx-3"],["type","button","checked","","autocomplete","off",1,"btn","btn-sm","btn-dark","mx-1","shadow",3,"click"],[3,"ngClass"],[4,"ngTemplateOutlet"],[1,"legend-container-content","d-flex","flex-xl-row","flex-column","justify-content-around","text-center","py-3","bg-white",3,"ngClass"],[1,"legend-container-content","bg-white",3,"ngClass"]],template:function(i,s){1&i&&(e.F$t(),e.TgZ(0,"div",0)(1,"div",1)(2,"button",2),e.NdJ("click",function(){return s.showHideLegend()}),e._UZ(3,"i",3),e._uU(4," L\xe9gende "),e.qZA(),e.YNc(5,r,1,0,"ng-container",4),e.qZA(),e.TgZ(6,"div",5),e.YNc(7,c,1,0,"ng-container",4),e.Hsn(8),e.qZA(),e._UZ(9,"div",6),e.qZA()),2&i&&(e.Q6J("ngClass",s.classes),e.xp6(3),e.Q6J("ngClass",s.tagIcon),e.xp6(2),e.Q6J("ngTemplateOutlet",s.buttonsTmplt),e.xp6(1),e.Q6J("ngClass",s.isLegendDisplayed?"":"d-none"),e.xp6(1),e.Q6J("ngTemplateOutlet",s.controlersTmplt),e.xp6(2),e.Q6J("ngClass",s.isLegendDisplayed?"d-none":""))},dependencies:[t.ez,t.mk,t.tP],styles:["#legendContainer[_ngcontent-%COMP%]{width:-webkit-fill-available;width:-moz-available;width:stretch}.legend-container-content[_ngcontent-%COMP%]{min-height:2em;box-shadow:0 -5px 20px #00000080}"]}),d})()},2921:(P,C,l)=>{l.d(C,{g:()=>u});var t=l(2223),e=l(7963),f=l(2687),g=l(4755),m=l(9129),r=l(6600);function c(a,d){if(1&a){const n=t.EpF();t.ynx(0),t.TgZ(1,"h6",11),t._uU(2,"Vitesse"),t.qZA(),t.TgZ(3,"div",12)(4,"div",13),t._uU(5,"-"),t.qZA(),t.TgZ(6,"div",14)(7,"input",15),t.NdJ("change",function(s){t.CHM(n);const p=t.oxw();return t.KtG(p.updateStepValue(s))}),t.qZA()(),t.TgZ(8,"div",13),t._uU(9,"+"),t.qZA()(),t.BQk()}if(2&a){const n=t.oxw();t.xp6(7),t.Q6J("min",n.minStepValue)("max",n.maxStepValue)("step",n.minStepValue)("value",n.stepValue)}}let u=(()=>{class a{constructor(){this.timeLineId="timeline-slider",this.timelineDateFormat="year",this.currentDateFormat="dd MMMM y HH:mm",this.stepValue=4e3,this.currentDateEvent=new t.vpe,this.backwardIcon=f.uYr,this.forwardIcon=f.Ybx,this.tagIcon=f.tho,this.minStepValue=50,this.timerStep=25,this.brightnessValuesAtEachHours=[.5,.5,.5,.5,.5,.65,.74,.83,.93,1,1,1,1,1,1,1,1,1,1,.93,.83,.72,.65,.5,.5],this.margin={top:10,right:15,bottom:0,left:15},this.displayedDatePixelValue=0,this.fontSize="11px",this.width=500,this.height=75,this.maxDatePosition=this.width-this.margin.left-this.margin.right}ngOnInit(){}ngOnChanges(n){n.currentDate&&(this.defaultDate=n.currentDate.currentValue),(n.startDate||n.enDate)&&n.startDate.currentValue<n.endDate.currentValue&&(this.startDate=n.startDate.currentValue,this.endDate=n.endDate.currentValue,n.currentDate||(this.defaultDate=n.startDate.currentValue),this.buildTimeline()),n.stepValue&&(this.maxStepValue=2*this.stepValue-this.minStepValue)}updateStepValue(n){this.stepValue=n.target.value}buildTimeline(){e.td_(".slider-bar").remove();const n=e.Ys("#"+this.timeLineId),i=e.Ys("#play-button");this.initDateRange();const s=n.append("g").attr("class","slider-bar").attr("transform",`translate(${this.margin.left},${this.height/2})`);s.append("line").attr("class","track").attr("x1",this.dateRange.range()[0]).attr("x2",this.dateRange.range()[1]).select((D,h,E)=>E[h].parentNode.appendChild(E[h].cloneNode(!0))).attr("class","track-inset").select((D,h,E)=>E[h].parentNode.appendChild(E[h].cloneNode(!0))).attr("class","track-overlay").call(e.ohM().on("drag start",D=>{i.text("Pause"),i.dispatch("click"),this.displayedDatePixelValue=D.x,this.update(this.dateRange.invert(this.displayedDatePixelValue))}).on("end",D=>{this.dateRange.invert(this.displayedDatePixelValue).toTimeString()===this.endDate.toTimeString()||this.dateRange.invert(this.displayedDatePixelValue).toTimeString()===this.startDate.toTimeString()?i.text("Play"):i.text("Continue")})),s.insert("g",".track-overlay").attr("class","ticks").attr("transform","translate(0,21)").selectAll("text").data(this.dateRange.ticks(10)).enter().append("text").attr("x",this.dateRange).attr("y",0).style("font-size",this.fontSize).attr("text-anchor","middle").text(D=>this.formatTimeLineDate(D)),s.insert("g",".track-overlay").attr("class","ticks-bound").attr("transform","translate(0,-6)").selectAll("line").data(this.dateRange.ticks(10)).enter().append("line").attr("x1",this.dateRange).attr("x2",this.dateRange).attr("y1",0).attr("y2",12).style("stroke","grey").style("stroke-width","1px"),s.insert("line",".track-overlay").attr("id","trace").attr("x1",this.dateRange(this.startDate)).attr("x2",this.dateRange(this.currentDate)),s.insert("circle",".track-overlay").attr("id","handle-timeline").attr("r",10),s.append("g").attr("class","circle-events"),this.displayedDatePixelValue=this.dateRange(this.defaultDate),this.update(this.defaultDate)}initDateRange(){this.dateRange=e.Xf().domain([this.startDate,this.endDate]).range([0,this.maxDatePosition]).clamp(!0)}formatTimeLineDate(n){return"hour"===this.timelineDateFormat?n.getHours()+"h.":n.getFullYear().toString()}formatDate(n){return e.i$Z("%Y-%m-%d %H:%M:%S")(n)}update(n){const i=this.dateRange(n);this.currentDateEvent.emit(n),e.Ys("#trace").attr("x2",i).style("stroke","#6c6c6c").style("stroke-width","4"),e.Ys("#handle-timeline").attr("cx",i)}step(){this.update(this.dateRange.invert(this.displayedDatePixelValue)),this.displayedDatePixelValue=this.displayedDatePixelValue+this.maxDatePosition/this.stepValue,this.displayedDatePixelValue>this.maxDatePosition&&this.forwardTimeLine()}startTimeLine(){const n=e.Ys("#play-button");"Pause"===n.html()?(clearInterval(this.timer),n.text("Continue")):(n.html(),this.timer=setInterval(this.step.bind(this),this.timerStep),n.html("Pause"))}resetTimeLine(){e.Ys("#play-button").html("Start"),this.update(this.startDate),this.displayedDatePixelValue=0,clearInterval(this.timer)}forwardTimeLine(){e.Ys("#play-button").html("Play"),this.update(this.endDate),this.displayedDatePixelValue=0,clearInterval(this.timer)}}return a.\u0275fac=function(n){return new(n||a)},a.\u0275cmp=t.Xpm({type:a,selectors:[["app-time-line"]],inputs:{timeLineId:"timeLineId",timeLineSpeedSliderEnabled:"timeLineSpeedSliderEnabled",startDate:"startDate",endDate:"endDate",timelineDateFormat:"timelineDateFormat",currentDate:"currentDate",currentDateFormat:"currentDateFormat",defaultDate:"defaultDate",stepValue:"stepValue"},outputs:{currentDateEvent:"currentDateEvent"},features:[t.TTD],decls:18,vars:9,consts:[[1,"d-flex","flex-xl-row","flex-column"],[1,"badge","text-bg-secondary"],[1,"d-flex","flex-row","justify-content-center"],[3,"id"],[1,"d-flex","flex-column","justify-content-center","m-2"],[1,"d-flex","flex-row","justify-content-center","align-items-center"],["id","start-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[3,"icon"],["id","play-button","role","button",1,"btn","btn-dark","mx-2",3,"click"],["id","end-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[4,"ngIf"],[1,"mt-3"],[1,"d-flex","flex-row","align-self-center"],[1,"fw-bold"],[1,"px-1"],["id","speed-slider","type","range",1,"form-range",3,"min","max","step","value","change"]],template:function(n,i){1&n&&(t.TgZ(0,"div",0)(1,"set-section-container")(2,"h6"),t._uU(3,"Barre Temporelle"),t.qZA(),t.TgZ(4,"div",1),t._uU(5),t.ALo(6,"date"),t.qZA(),t.TgZ(7,"div",2),t.O4$(),t._UZ(8,"svg",3),t.qZA()(),t.kcU(),t.TgZ(9,"div",4)(10,"div",5)(11,"a",6),t.NdJ("click",function(){return i.resetTimeLine()}),t._UZ(12,"fa-icon",7),t.qZA(),t.TgZ(13,"a",8),t.NdJ("click",function(){return i.startTimeLine()}),t._uU(14,"Play"),t.qZA(),t.TgZ(15,"a",9),t.NdJ("click",function(){return i.forwardTimeLine()}),t._UZ(16,"fa-icon",7),t.qZA()(),t.YNc(17,c,10,4,"ng-container",10),t.qZA()()),2&n&&(t.xp6(5),t.Oqu(t.xi3(6,6,i.currentDate,i.currentDateFormat)),t.xp6(3),t.Q6J("id",i.timeLineId),t.uIk("viewBox","0 10 "+i.width+" "+i.height),t.xp6(4),t.Q6J("icon",i.backwardIcon),t.xp6(4),t.Q6J("icon",i.forwardIcon),t.xp6(1),t.Q6J("ngIf",i.timeLineSpeedSliderEnabled))},dependencies:[g.O5,m.BN,r.d,g.uU],styles:['.ticks[_ngcontent-%COMP%]{font-weight:700}.track[_ngcontent-%COMP%], .track-inset[_ngcontent-%COMP%], .track-overlay[_ngcontent-%COMP%]{stroke-linecap:round}.track[_ngcontent-%COMP%]{stroke:#000;stroke-opacity:.3;stroke-width:13px}.track-inset[_ngcontent-%COMP%]{stroke:#dcdcdc;stroke-width:11px}.track-overlay[_ngcontent-%COMP%]{pointer-events:stroke;stroke-width:50px;stroke:transparent;cursor:pointer}#handle-timeline[_ngcontent-%COMP%]{fill:#fff;stroke:#000;stroke-opacity:.5;stroke-width:1.25px}svg[_ngcontent-%COMP%]   #trace[_ngcontent-%COMP%]{stroke:#6c6c6c;stroke-width:4}#play-button[_ngcontent-%COMP%]{width:90px}circle.preselected[_ngcontent-%COMP%]{stroke:#000!important;stroke-width:2px!important}#timeline-slider[_ngcontent-%COMP%]{width:33em}@media (max-width: 576px){#timeline-slider[_ngcontent-%COMP%]{width:20em}}#speed-slider[_ngcontent-%COMP%]{transform:rotate(180deg)}.marker-fontawesome[_ngcontent-%COMP%]{font-family:"Font Awesome 5 Free";text-anchor:middle;dominant-baseline:middle;pointer-events:none}']}),a})()},9387:(P,C,l)=>{l.d(C,{k:()=>c});var t=l(4755),e=l(9129),f=l(4586),g=l(7292),m=l(6600),r=l(2223);let c=(()=>{class u{}return u.\u0275fac=function(d){return new(d||u)},u.\u0275mod=r.oAB({type:u}),u.\u0275inj=r.cJS({imports:[t.ez,e.uH,f.Dt,g.Bz,m.d]}),u})()},6527:(P,C,l)=>{l.d(C,{Z:()=>s});var t=l(2774),e=l(5066),f=l(760),g=l(8999),m=l(9182),r=l(2456),c=l(3280),u=l(392),a=l(410),d=l(9644),n=l(3343);class i extends t.ZP{constructor(o,_){super(),this.flatMidpoint_=null,this.flatMidpointRevision_=-1,this.maxDelta_=-1,this.maxDeltaRevision_=-1,void 0===_||Array.isArray(o[0])?this.setCoordinates(o,_):this.setFlatCoordinates(_,o)}appendCoordinate(o){this.flatCoordinates?(0,r.l7)(this.flatCoordinates,o):this.flatCoordinates=o.slice(),this.changed()}clone(){const o=new i(this.flatCoordinates.slice(),this.layout);return o.applyProperties(this),o}closestPointXY(o,_,D,h){return h<(0,f.qf)(this.getExtent(),o,_)?h:(this.maxDeltaRevision_!=this.getRevision()&&(this.maxDelta_=Math.sqrt((0,e.Bv)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,0)),this.maxDeltaRevision_=this.getRevision()),(0,e.H$)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,this.maxDelta_,!1,o,_,D,h))}forEachSegment(o){return(0,c.E)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,o)}getCoordinateAtM(o,_){return"XYM"!=this.layout&&"XYZM"!=this.layout?null:(0,a.iJ)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,o,_=void 0!==_&&_)}getCoordinates(){return(0,u.Ml)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getCoordinateAt(o,_){return(0,a.WW)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,o,_,this.stride)}getLength(){return(0,n.W)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride)}getFlatMidpoint(){return this.flatMidpointRevision_!=this.getRevision()&&(this.flatMidpoint_=this.getCoordinateAt(.5,this.flatMidpoint_),this.flatMidpointRevision_=this.getRevision()),this.flatMidpoint_}getSimplifiedGeometryInternal(o){const _=[];return _.length=(0,m.dt)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,o,_,0),new i(_,"XY")}getType(){return"LineString"}intersectsExtent(o){return(0,d.Kz)(this.flatCoordinates,0,this.flatCoordinates.length,this.stride,o)}setCoordinates(o,_){this.setLayout(_,o,1),this.flatCoordinates||(this.flatCoordinates=[]),this.flatCoordinates.length=(0,g.Sg)(this.flatCoordinates,0,o,this.stride),this.changed()}}const s=i},410:(P,C,l)=>{l.d(C,{WW:()=>f,dG:()=>m,iJ:()=>g});var t=l(2456),e=l(2156);function f(r,c,u,a,d,n,i){let s,p;const o=(u-c)/a;if(1===o)s=c;else if(2===o)s=c,p=d;else if(0!==o){let _=r[c],D=r[c+1],h=0;const E=[0];for(let v=c+a;v<u;v+=a){const T=r[v],x=r[v+1];h+=Math.sqrt((T-_)*(T-_)+(x-D)*(x-D)),E.push(h),_=T,D=x}const O=d*h,M=(0,t.ry)(E,O);M<0?(p=(O-E[-M-2])/(E[-M-1]-E[-M-2]),s=c+(-M-2)*a):s=c+M*a}i=i>1?i:2,n=n||new Array(i);for(let _=0;_<i;++_)n[_]=void 0===s?NaN:void 0===p?r[s+_]:(0,e.t7)(r[s+_],r[s+a+_],p);return n}function g(r,c,u,a,d,n){if(u==c)return null;let i;if(d<r[c+a-1])return n?(i=r.slice(c,c+a),i[a-1]=d,i):null;if(r[u-1]<d)return n?(i=r.slice(u-a,u),i[a-1]=d,i):null;if(d==r[c+a-1])return r.slice(c,c+a);let s=c/a,p=u/a;for(;s<p;){const h=s+p>>1;d<r[(h+1)*a-1]?p=h:s=h+1}const o=r[s*a-1];if(d==o)return r.slice((s-1)*a,(s-1)*a+a);const D=(d-o)/(r[(s+1)*a-1]-o);i=[];for(let h=0;h<a-1;++h)i.push((0,e.t7)(r[(s-1)*a+h],r[s*a+h],D));return i.push(d),i}function m(r,c,u,a,d,n,i){if(i)return g(r,c,u[u.length-1],a,d,n);let s;if(d<r[a-1])return n?(s=r.slice(0,a),s[a-1]=d,s):null;if(r[r.length-1]<d)return n?(s=r.slice(r.length-a),s[a-1]=d,s):null;for(let p=0,o=u.length;p<o;++p){const _=u[p];if(c!=_){if(d<r[c+a-1])return null;if(d<=r[_-1])return g(r,c,_,a,d,!1);c=_}}return null}}}]);