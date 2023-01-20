"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[205],{205:(tt,V,r)=>{r.r(V),r.d(V,{MapActivitiesModule:()=>D});var ne=r(9387),m=r(6895),I=r(2216),P=r(646),Z=r(3171),j=r(7053),Q=r(5947),k=r(187),oe=r(3324),se=r(6597),re=r(3620),ae=r(483),ce=r(8377),R=r(6003),de=r(6527),p=r(9255),v=r(8227),L=r(109),y=r(7392),x=r(5044),u=r(6785);const g="activities",F="travel",N="legendActivity",w="white",ue=new y.Z({radius:0,fill:new x.Z({color:v.Cm}),stroke:new u.Z({color:w,width:2})}),ge=new y.Z({radius:0,fill:new x.Z({color:v.bj}),stroke:new u.Z({color:w,width:2})}),he=new y.Z({radius:0,fill:new x.Z({color:v.C1}),stroke:new u.Z({color:w,width:2})});function U(n){let i;i="job"===n.get("type")?ue.clone():"education"===n.get("type")?ge.clone():he.clone();let t=2*n.get("radius");return i.setRadius(t),new L.ZP({image:i})}function B(n){return new L.ZP({image:new y.Z({radius:2*n,fill:new x.Z({color:"rgba(255, 215, 0, 0.6)"}),stroke:new u.Z({color:"black",width:2})})})}const J="black",W="yellow",Se=new L.ZP({stroke:new u.Z({width:4,color:"black"})}),Ze=new L.ZP({image:new y.Z({radius:2,fill:new x.Z({color:"black"}),stroke:new u.Z({color:J,width:1})})}),H=new L.ZP({image:new y.Z({radius:7,fill:new x.Z({color:W}),stroke:new u.Z({color:J,width:3})})}),X=n=>"route"===n?Se:"limit"===n?Ze:H;function G(n,i,t,o){return n.getLayers().getArray().filter(l=>l.get("name")===i)[0].getSource().getFeatures().filter(l=>l.get(o)===t)[0]}var A=r(8453),O=r(2687),q=r(1733),e=r(4650),K=r(9947),h=r(7579),Le=r(529);class f{constructor(i){this.http=i,this.apiUrlActivitiesGeoData=A.JW+"geodata/activities",this.errorapiUrlApiFound=new h.x,this.activitiesGeoData=new h.x,this.apiUrlTripsGeoData=A.JW+"/geodata/trips",this.tripsGeoData=new h.x,this.dateNotified=new h.x,this.timelineBuild=new h.x,this.activitiesGeoDataToMap=new h.x,this.tripsGeoDataToMap=new h.x}queryActivitiesGeoData(){this.http.get(this.apiUrlActivitiesGeoData).subscribe({complete:()=>{},error:i=>{this.errorapiUrlApiFound.next(i.error.message)},next:i=>{this.activitiesGeoData.next(i)}})}pullActivitiesGeoDataToMap(i){this.activitiesGeoDataToMap.next(i)}queryTripsGeoData(){this.http.get(this.apiUrlTripsGeoData).subscribe({complete:()=>{},error:i=>{this.errorapiUrlApiFound.next(i.error.message)},next:i=>{this.tripsGeoData.next(i)}})}pullTripsGeoDataToMap(i){this.tripsGeoDataToMap.next(i)}}f.\u0275fac=function(i){return new(i||f)(e.LFG(Le.eN))},f.\u0275prov=e.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"});var be=r(1481),Ce=r(3686),Me=r(6423),ee=r(942);function _e(n,i){if(1&n&&(e.O4$(),e._UZ(0,"circle")),2&n){const t=i.$implicit,o=e.oxw();e.Tol(t.class),e.uIk("r",o.activityTypesLegendData.circleR)("cx",o.activityTypesLegendData.circleCxPos)("cy",t.cy)("fill",t.color)("stroke",t.strokeColor)}}function ke(n,i){if(1&n&&(e.O4$(),e.TgZ(0,"text"),e._uU(1),e.qZA()),2&n){const t=i.$implicit,o=e.oxw();e.Tol(t.class+" label"),e.uIk("x",o.activityTypesLegendData.textXPos)("y",t.cy)("font-size",o.fontSize),e.xp6(1),e.hij("",t.label," ")}}function Fe(n,i){if(1&n&&(e.O4$(),e._UZ(0,"circle",7)),2&n){const t=i.$implicit,o=e.oxw();e.uIk("r",t)("cx",o.activityMonthLegendData.circleCxPos)("cy",t)}}function Ae(n,i){if(1&n&&(e.O4$(),e.TgZ(0,"text",8),e._uU(1),e.qZA()),2&n){const t=i.$implicit,o=e.oxw();e.uIk("x",o.activityMonthLegendData.textXPos)("y",2*t)("font-size",o.fontSize),e.xp6(1),e.hij("",t," mois ")}}function Oe(n,i){if(1&n&&(e.O4$(),e._UZ(0,"line",9)),2&n){const t=i.$implicit;e.uIk("y1",2*t+2)("y2",2*t+2)}}function Ie(n,i){if(1&n&&(e.O4$(),e._UZ(0,"line")),2&n){const t=i.$implicit;e.Tol(t.classLine),e.uIk("x1",t.x1)("x2",t.x2)("y1",t.y1)("y2",t.y2)("strokeColor",t.strokeColor)}}function Pe(n,i){if(1&n&&(e.O4$(),e._UZ(0,"circle")),2&n){const t=i.$implicit;e.Tol(t.classMarker),e.uIk("r",t.r)("cx",t.y2/2)("cy",t.y2/2)("color",t.circleColor)("strokeColor",t.strokeColor)}}function Ne(n,i){if(1&n&&(e.O4$(),e._UZ(0,"text")),2&n){const t=i.$implicit,o=e.oxw();e.uIk("x",t.y2/2)("y",t.y2/2)("font-size",o.movesLineLegendData.markerFontSize)}}function Ee(n,i){if(1&n&&(e.O4$(),e.TgZ(0,"text",8),e._uU(1),e.qZA()),2&n){const t=i.$implicit,o=e.oxw();e.uIk("x",o.movesLineLegendData.textXPos)("y",t.y2/2)("font-size",o.fontSize),e.xp6(1),e.hij("",t.label," ")}}class b{constructor(){this.sliderBarId="slider-bar",this.legendActivitiesId=N,this.widthLegendElement=200,this.heightLegendElement=140,this.heightMoveLegendElement=60,this.fontSize="19px",this.activityMonthLegendData={circleMonthR:[40,20,10],circleCxPos:50,textXPos:120},this.activityTypesLegendData={circleR:18,circleCxPos:20,textXPos:50,circleJobs:[{cy:25,class:"education",label:"Formations",color:v.bj,strokeColor:w},{cy:70,class:"job",label:"Entreprises",color:v.Cm,strokeColor:w},{cy:115,class:"volunteer",label:"B\xe9n\xe9volat",color:v.C1,strokeColor:w}]},this.movesLineLegendData={textXPos:50,markerFontSize:"12px",moves:[{x1:0,x2:45,y1:0,y2:45,r:12,classLine:"train-line",classMarker:"train-marker",classMarkerText:"train-marker-text",label:"Train",circleColor:W,strokeColor:J}]}}ngOnInit(){}}b.\u0275fac=function(i){return new(i||b)},b.\u0275cmp=e.Xpm({type:b,selectors:[["app-theme-legend"]],decls:22,vars:13,consts:[["id","theme-legend",1,"d-flex","flex-row","justify-content-around"],[3,"id"],[3,"class",4,"ngFor","ngForOf"],["class","activity-months",4,"ngFor","ngForOf"],["class","label",4,"ngFor","ngForOf"],["x1","50","x2","115","class","line-dot",4,"ngFor","ngForOf"],[4,"ngFor","ngForOf"],[1,"activity-months"],[1,"label"],["x1","50","x2","115",1,"line-dot"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0)(1,"set-section-container")(2,"h6"),e._uU(3,"Activit\xe9s"),e.qZA(),e.O4$(),e.TgZ(4,"svg",1),e.YNc(5,_e,1,7,"circle",2),e.YNc(6,ke,2,6,"text",2),e.qZA()(),e.kcU(),e.TgZ(7,"set-section-container")(8,"h6"),e._uU(9,"Dur\xe9e"),e.qZA(),e.O4$(),e.TgZ(10,"svg"),e.YNc(11,Fe,1,3,"circle",3),e.YNc(12,Ae,2,4,"text",4),e.YNc(13,Oe,1,2,"line",5),e.qZA()(),e.kcU(),e.TgZ(14,"set-section-container")(15,"h6"),e._uU(16,"D\xe9placements"),e.qZA(),e.O4$(),e.TgZ(17,"svg"),e.YNc(18,Ie,1,7,"line",2),e.YNc(19,Pe,1,7,"circle",2),e.YNc(20,Ne,1,3,"text",6),e.YNc(21,Ee,2,4,"text",4),e.qZA()()()),2&i&&(e.xp6(4),e.Q6J("id",t.legendActivitiesId),e.uIk("viewBox","0 0 "+t.widthLegendElement+" "+t.heightLegendElement),e.xp6(1),e.Q6J("ngForOf",t.activityTypesLegendData.circleJobs),e.xp6(1),e.Q6J("ngForOf",t.activityTypesLegendData.circleJobs),e.xp6(4),e.uIk("viewBox","0 0 "+t.widthLegendElement+" "+t.heightLegendElement),e.xp6(1),e.Q6J("ngForOf",t.activityMonthLegendData.circleMonthR),e.xp6(1),e.Q6J("ngForOf",t.activityMonthLegendData.circleMonthR),e.xp6(1),e.Q6J("ngForOf",t.activityMonthLegendData.circleMonthR),e.xp6(4),e.uIk("viewBox","0 0 "+t.widthLegendElement+" "+t.heightMoveLegendElement),e.xp6(1),e.Q6J("ngForOf",t.movesLineLegendData.moves),e.xp6(1),e.Q6J("ngForOf",t.movesLineLegendData.moves),e.xp6(1),e.Q6J("ngForOf",t.movesLineLegendData.moves),e.xp6(1),e.Q6J("ngForOf",t.movesLineLegendData.moves))},dependencies:[m.sg,ee.d],styles:['.label[_ngcontent-%COMP%]{text-anchor:start;dominant-baseline:middle}svg[_ngcontent-%COMP%]{width:9em}@media (max-width: 576px){svg[_ngcontent-%COMP%]{width:6em}}.activity-months[_ngcontent-%COMP%]{fill:#fff;opacity:.7;stroke:#000;stroke-width:2px;stroke-opacity:1}.line-dot[_ngcontent-%COMP%]{stroke:#000;stroke-width:1;stroke-dasharray:5,5}.train-line[_ngcontent-%COMP%]{stroke:#000;stroke-width:3px}.train-marker[_ngcontent-%COMP%]{fill:#ff0;stroke:#000;stroke-width:3px;color:#000}.train-marker-text[_ngcontent-%COMP%]{font-family:"Font Awesome 5 Free";font-weight:900;color:#000;text-anchor:middle;dominant-baseline:middle;pointer-events:none}']});var Ue=r(2921),Je=r(6298);function Ge(n,i){if(1&n){const t=e.EpF();e.ynx(0),e.TgZ(1,"h6",11),e._uU(2,"Vitesse"),e.qZA(),e.TgZ(3,"div",12)(4,"div",13),e._uU(5,"-"),e.qZA(),e.TgZ(6,"div",14)(7,"input",15),e.NdJ("change",function(s){e.CHM(t);const c=e.oxw();return e.KtG(c.updateStepValue(s))}),e.qZA()(),e.TgZ(8,"div",13),e._uU(9,"+"),e.qZA()(),e.BQk()}if(2&n){const t=e.oxw();e.xp6(7),e.Q6J("min",t.minStepValue)("max",t.maxStepValue)("step",t.minStepValue)("value",t.stepValue)}}class C extends Ue.g{constructor(i){super(),this.mapService=i,this.mapSubscription=this.mapService.map.subscribe(t=>{this.map=t})}ngOnInit(){super.ngOnInit(),this.mapService.getMap()}ngOnChanges(i){super.ngOnChanges(i),i.timelineDataViz&&p.Ys(".circle-events").selectAll("circle").data(this.timelineDataViz).enter().append("circle").attr("class",o=>new Date(o.start_date)<=this.currentDate?"pointer svg-color-"+o.type:"pointer trace").attr("id",o=>"location_"+o.id).attr("r","4").attr("cx",o=>{const s=new Date(o.start_date);return this.dateRange(s)}).on("mouseover",(o,s)=>{p.Ys("#popup-feature-"+s.id).style("display","block").style("right","1em").style("top","5em");const c=G(this.map,g,s.id,"id");void 0!==c&&(this.interactionWithEventNode(o.currentTarget,s),c.setStyle(B(c.get("radius"))))}).on("mouseout",(o,s)=>{p.Ys("#popup-feature-"+s.id).style("display","none").style("right","unset").style("top","unset");const c=G(this.map,g,s.id,"id");void 0!==c&&(this.interactionWithEventNode(o.currentTarget,s),c.setStyle(U(c)))}),i.currentDate&&p.td_(".circle-events circle").attr("class",t=>new Date(t.start_date)<=this.currentDate?"pointer svg-color-"+t.type:"trace")}interactionWithEventNode(i,t){const o=p.Ys(i);o.classed("selected",!o.classed("selected"));const s=p.Ys("#"+N+" circle."+t.type);s.classed("selected",!s.classed("selected"))}}function ze(n,i){if(1&n){const t=e.EpF();e.TgZ(0,"button",5),e.NdJ("click",function(){e.CHM(t);const s=e.oxw();return e.KtG(s.zoomOnData())}),e._UZ(1,"fa-icon",6),e.qZA()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("icon",t.centerIcon)}}function Ye(n,i){if(1&n){const t=e.EpF();e._UZ(0,"app-theme-legend"),e.TgZ(1,"app-time-legend",7),e.NdJ("currentDateEvent",function(s){e.CHM(t);const c=e.oxw();return e.KtG(c.getCurrentDate(s))}),e.qZA()}if(2&n){const t=e.oxw();e.xp6(1),e.Q6J("timeLineSpeedSliderEnabled",!1)("startDate",t.startDate)("endDate",t.endDate)("currentDate",t.currentDate)("stepValue",800)("timelineDataViz",t.geoFeaturesData)}}function Ve(n,i){1&n&&e.GkF(0)}function je(n,i){if(1&n&&(e.TgZ(0,"div",21),e._UZ(1,"img",22),e.qZA()),2&n){const t=e.oxw().$implicit,o=e.oxw(2);e.xp6(1),e.Q6J("src",o.apiImgUrl+t.img_activity,e.LSH)}}function Qe(n,i){1&n&&e._UZ(0,"div")}function Re(n,i){if(1&n&&(e.TgZ(0,"div",16),e._uU(1),e.ALo(2,"date"),e.ALo(3,"date"),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.AsE("Du ",e.xi3(2,2,t.start_date,"MM-yyyy")," au ",e.xi3(3,5,t.end_date,"MM-yyyy"),"")}}function $e(n,i){if(1&n&&(e.TgZ(0,"div",16),e._uU(1),e.ALo(2,"date"),e.qZA()),2&n){const t=e.oxw().$implicit;e.xp6(1),e.hij("Du ",e.xi3(2,1,t.start_date,"MM-yyyy")," \xe0 aujourd'hui")}}function Be(n,i){if(1&n&&(e.TgZ(0,"div",9)(1,"div",10)(2,"div",11)(3,"h5",12),e._uU(4),e.qZA()(),e.TgZ(5,"div",13),e.YNc(6,je,2,1,"div",14),e.TgZ(7,"div",15)(8,"h6",12),e._uU(9),e.qZA(),e.TgZ(10,"span",16),e._UZ(11,"fa-icon",17),e._uU(12),e.qZA(),e.YNc(13,Qe,1,0,"div",18),e.YNc(14,Re,4,8,"ng-template",null,19,e.W1O),e.YNc(16,$e,3,4,"ng-template",null,20,e.W1O),e.qZA()()()()),2&n){const t=i.$implicit,o=e.MAs(15),s=e.MAs(17),c=e.oxw(2);e.Q6J("id","popup-feature-"+t.id),e.xp6(4),e.Oqu(t.title),e.xp6(2),e.Q6J("ngIf","null"!==t.img_activity),e.xp6(3),e.Oqu(t.name),e.xp6(2),e.Q6J("icon",c.locationIcon),e.xp6(1),e.hij(" ",t.location," "),e.xp6(1),e.Q6J("ngIf","InProgress"===t.status)("ngIfThen",s)("ngIfElse",o)}}function We(n,i){if(1&n&&e.YNc(0,Be,18,9,"div",8),2&n){const t=e.oxw();e.Q6J("ngForOf",t.geoFeaturesData)}}C.\u0275fac=function(i){return new(i||C)(e.Y36(K.S))},C.\u0275cmp=e.Xpm({type:C,selectors:[["app-time-legend"]],inputs:{timelineDataViz:"timelineDataViz"},features:[e.qOj,e.TTD],decls:18,vars:9,consts:[[1,"d-flex","flex-xl-row","flex-column"],["classes","text-bg-secondary"],[1,"d-flex","flex-row","justify-content-center"],[3,"id"],[1,"d-flex","flex-column","justify-content-center","m-2"],[1,"d-flex","flex-row","justify-content-center","align-items-center"],["id","start-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[3,"icon"],["id","play-button","role","button",1,"btn","btn-dark","mx-2",3,"click"],["id","end-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[4,"ngIf"],[1,"mt-3"],[1,"d-flex","flex-row","align-self-center"],[1,"fw-bold"],[1,"px-1"],["id","speed-slider","type","range",1,"form-range",3,"min","max","step","value","change"]],template:function(i,t){1&i&&(e.TgZ(0,"div",0)(1,"set-section-container")(2,"h6"),e._uU(3,"Barre Temporelle"),e.qZA(),e.TgZ(4,"set-badge-content",1),e._uU(5),e.ALo(6,"date"),e.qZA(),e.TgZ(7,"div",2),e.O4$(),e._UZ(8,"svg",3),e.qZA()(),e.kcU(),e.TgZ(9,"div",4)(10,"div",5)(11,"a",6),e.NdJ("click",function(){return t.resetTimeLine()}),e._UZ(12,"fa-icon",7),e.qZA(),e.TgZ(13,"a",8),e.NdJ("click",function(){return t.startTimeLine()}),e._uU(14,"Play"),e.qZA(),e.TgZ(15,"a",9),e.NdJ("click",function(){return t.forwardTimeLine()}),e._UZ(16,"fa-icon",7),e.qZA()(),e.YNc(17,Ge,10,4,"ng-container",10),e.qZA()()),2&i&&(e.xp6(5),e.Oqu(e.xi3(6,6,t.currentDate,t.currentDateFormat)),e.xp6(3),e.Q6J("id",t.timeLineId),e.uIk("viewBox","0 10 "+t.width+" "+t.height),e.xp6(4),e.Q6J("icon",t.backwardIcon),e.xp6(4),e.Q6J("icon",t.forwardIcon),e.xp6(1),e.Q6J("ngIf",t.timeLineSpeedSliderEnabled))},dependencies:[m.O5,I.BN,ee.d,Je.H,m.uU],styles:[".circle-events circle{opacity:1;stroke:#f8f8ff;stroke-width:1px}.circle-events circle.trace{fill:#686868;opacity:.7;stroke:#f8f8ff;stroke-width:1px;stroke-opacity:1}.circle-events circle.selected{stroke:#000;stroke-width:2px}\n",'.ticks{font-weight:700}.track,.track-inset,.track-overlay{stroke-linecap:round}.track{stroke:#000;stroke-opacity:.3;stroke-width:13px}.track-inset{stroke:#dcdcdc;stroke-width:11px}.track-overlay{pointer-events:stroke;stroke-width:50px;stroke:transparent;cursor:pointer}#handle-timeline{fill:#fff;stroke:#000;stroke-opacity:.5;stroke-width:1.25px}svg #trace{stroke:#6c6c6c;stroke-width:4}#play-button{width:90px}circle.preselected{stroke:#000!important;stroke-width:2px!important}#timeline-slider{width:33em}@media (max-width: 576px){#timeline-slider{width:20em}}#speed-slider{transform:rotate(180deg)}.marker-fontawesome{font-family:"Font Awesome 5 Free";text-anchor:middle;dominant-baseline:middle;pointer-events:none}\n'],encapsulation:2});const He=function(){return{}};class M{constructor(i,t,o,s,c){this.mapService=i,this.dataService=t,this.activatedRoute=o,this.titleService=s,this.controlerService=c,this.imageProfile=A.tz,this.fragment=null,this.experiencesRoute=q.I_.route,this.educationRoute=q.QD.route,this.geoTripsData=[],this.travelId=null,this.isLegendDisplayed=!0,this.defaultActivitieLayerZoom=9,this.apiImgUrl=A.uV,this.locationIcon=O.FGq,this.tagIcon=O.tho,this.centerIcon=O.TL5,this.helpIcon=O.Fuz,this.helpPopup="Voici une cartographie spatio-temporelles de mes exp\xe9riences",this.popupWidth=330,this.popupHeight=190,this.zoomEventSubscription=this.mapService.zoomEvent.subscribe(a=>{this.mapService.zoomToLayerName(g,this.defaultActivitieLayerZoom)}),this.newCoordsSubscription=this.mapService.newCoords.subscribe(a=>{this.popupMoving(a[1])}),this.mapSubscription=this.mapService.map.subscribe(a=>{this.map=a}),this.getActivitiesGeoDataToMapSubscription=this.dataService.activitiesGeoData.subscribe(a=>{if(this.geoFeaturesData=a.geojson,this.startDate=new Date(a.date_range.start_date),this.endDate=new Date,this.getCurrentDate(this.endDate),null!==this.fragment){const l=G(this.map,g,this.fragment,"id").getGeometry();void 0!==l&&this.mapService.zoomToExtent(l.getExtent(),13)}else this.mapService.zoomToLayerName(g,this.defaultActivitieLayerZoom)}),this.getTripsGeoDataToMapSubscription=this.dataService.tripsGeoData.subscribe(a=>{this.geoTripsData=a}),this.tripsGeoDataToMapSubscription=this.dataService.tripsGeoDataToMap.subscribe(a=>{1===a.length&&this.travelId!==a[0].name&&(this.mapService.removeLayerByName(F),this.travelId=a[0].name,this.buildTravelLayer(a[0])),0===a.length&&(this.travelId=null,this.mapService.removeLayerByName(F))}),this.routeSubscription=this.activatedRoute.fragment.subscribe(a=>{this.fragment=null===a?null:a})}ngOnInit(){this.mapService.changeMapInteractionStatus(!0),this.mapService.getMap(),this.sendResumeSubMenus(),this.initLayer(g,U),this.dataService.queryTripsGeoData(),this.dataService.queryActivitiesGeoData(),this.zoomInitDone=!1,this.innerWidth=window.innerWidth,this.innerHeight=window.innerHeight}ngOnDestroy(){this.mapSubscription.unsubscribe(),this.getActivitiesGeoDataToMapSubscription.unsubscribe(),this.tripsGeoDataToMapSubscription.unsubscribe(),this.getTripsGeoDataToMapSubscription.unsubscribe(),this.zoomEventSubscription.unsubscribe(),this.routeSubscription.unsubscribe(),this.newCoordsSubscription.unsubscribe(),this.mapService.removeLayerByName(g),this.mapService.removeLayerByName(F),this.mapService.changeMapInteractionStatus(!1),this.mapService.resetMapView()}getCurrentDate(i){this.currentDate=i;const t=this.geoFeaturesData.filter(s=>new Date(s.start_date)<=this.currentDate);this.addLayerFeatures(t,U);let o=[];this.geoTripsData.forEach(s=>{const a=s.end_date,d=new Date(s.start_date),l=new Date(a);this.currentDate>=d&&this.currentDate<l&&o.push(s)}),this.dataService.pullTripsGeoDataToMap(o)}zoomOnData(){this.mapService.sendZoomAction()}sendResumeSubMenus(){this.controlerService.pullSubMenus([]),this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}initLayer(i,t){this.sourceFeatures=new Q.Z;const o=new j.Z({source:this.sourceFeatures,style:(c,a)=>t(c)});o.set("name",i),this.map.addLayer(o);let s=new oe.Z({condition:se.MJ,multi:!1,layers:[o],style:c=>B(c.get("radius"))});s.on("select",c=>{const a=c.selected,d=c.deselected;if(1===d.length){let l=d[0];this.currentFeatureSelectedId=null,this.mapService.unsetMapEvent("mapCoords"),p.Ys("#popup-feature-"+l.get("id")).style("display","none").style("right","unset").style("top","unset").style("left","unset"),this._handleActivityCircleOnLegend(l)}if(1===a.length){let l=a[0];this.currentFeatureSelectedId=l.get("id"),this.mapService.setMapEvent("mapCoords"),p.Ys("#popup-feature-"+l.get("id")).style("z-index","1"),this._handleActivityCircleOnLegend(l)}}),this.map.addInteraction(s)}addLayerFeatures(i,t){let o=[];i.forEach((s,c)=>{let a=new Z.Z({geometry:new k.Z(s.geometry.coordinates).transform("EPSG:4326","EPSG:3857"),id:s.id,type:s.type,name:s.name,radius:12*s.years+s.months});o.push(a)}),this.sourceFeatures.clear(),this.sourceFeatures.addFeatures(o)}_handleActivityCircleOnLegend(i){const t=i.getProperties(),o=p.Ys("#"+N+" circle."+t.type);o.classed("selected",!o.classed("selected"));const s=p.Ys(".circle-events circle#location_"+t.id);s.classed("selected",!s.classed("selected"))}buildTravelLayer(i){const t=new de.Z(i.geojson_data[0].coordinates),o=new Z.Z({type:"route",geometry:t}),s=new Z.Z({type:"limit",geometry:new k.Z(t.getFirstCoordinate())}),c=new Z.Z({type:"limit",geometry:new k.Z(t.getLastCoordinate())}),a=new k.Z(t.getFirstCoordinate());new Z.Z({type:"movingNode",geometry:a});let l=new Q.Z({features:[]}),z=new j.Z({source:l});[o,s,c].forEach((S,Y)=>{S.setStyle(X(S.get("type"))),l.addFeature(S)}),z.set("name",F),this.map.addLayer(z);let te=Date.now(),_=0;z.on("postrender",S=>{const Y=S.frameState.time;_=(_+100*(Y-te)/1e6)%2,te=Y;const et=t.getCoordinateAt(_>1?2-_:_);a.setCoordinates(et);const ie=function le(n){if(!(n.context instanceof CanvasRenderingContext2D))throw new Error("Only works for render events from Canvas 2D layers");const i=n.inversePixelTransform[0],t=n.inversePixelTransform[1],o=Math.sqrt(i*i+t*t),s=n.frameState,c=(0,ae.Jp)(n.inversePixelTransform.slice(),s.coordinateToPixelTransform),a=(0,ce.se)(s.viewState.resolution,o);let d;const l=(0,R.Cs)();return l&&(d=(0,R.WO)(l,s.viewState.projection)),new re.Z(n.context,o,s.extent,c,s.viewState.rotation,a,d)}(S);ie.setStyle(X("movingNode")),ie.drawGeometry(a),this.map.render()})}popupMoving(i){p.Ys("#popup-feature-"+this.currentFeatureSelectedId).style("left",()=>i[0]+this.popupWidth+20>this.innerWidth?i[0]-this.popupWidth-15+"px":i[0]+15+"px").style("top",()=>i[1]+this.popupHeight+20>this.innerHeight?i[1]-this.popupHeight-15+"px":i[1]+15+"px").style("display","block")}}M.\u0275fac=function(i){return new(i||M)(e.Y36(K.S),e.Y36(f),e.Y36(P.gz),e.Y36(be.Dx),e.Y36(Ce.L))},M.\u0275cmp=e.Xpm({type:M,selectors:[["app-map-view"]],decls:8,vars:3,consts:[["classes","position-fixed"],["buttonsTemplate",""],["controlersTemplate",""],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["activitiesPopups",""],["title","Centrer","type","button","checked","","autocomplete","off",1,"btn","btn-sm","btn-warning","mx-1",3,"click"],[1,"",3,"icon"],["currentDateFormat","MMMM y",3,"timeLineSpeedSliderEnabled","startDate","endDate","currentDate","stepValue","timelineDataViz","currentDateEvent"],["class","card shadow-lg map-popup border border-3 border-secondary",3,"id",4,"ngFor","ngForOf"],[1,"card","shadow-lg","map-popup","border","border-3","border-secondary",3,"id"],[1,"card-body"],[1,"d-flex","flex-row","justify-content-around","mb-1"],[1,"fw-bolder","small"],[1,"d-flex","flex-row","justify-content-around"],["class","w-25 justify-content-around text-center",4,"ngIf"],[1,"my-auto"],[1,"small"],[1,"me-2","text-danger",3,"icon"],[4,"ngIf","ngIfThen","ngIfElse"],["pastJob",""],["currentJob",""],[1,"w-25","justify-content-around","text-center"],[1,"img-fluid","rounded","mx-auto","shadow","mini-img-thumbnail",3,"src"]],template:function(i,t){if(1&i&&(e.TgZ(0,"set-legend-container",0),e.YNc(1,ze,2,1,"ng-template",null,1,e.W1O),e.YNc(3,Ye,2,6,"ng-template",null,2,e.W1O),e.qZA(),e.YNc(5,Ve,1,0,"ng-container",3),e.YNc(6,We,1,1,"ng-template",null,4,e.W1O)),2&i){const o=e.MAs(7);e.xp6(5),e.Q6J("ngTemplateOutlet",o)("ngTemplateOutletContext",e.DdM(2,He))}},dependencies:[m.sg,m.O5,m.tP,I.BN,Me.b,b,C,m.uU],styles:[".map-popup{position:fixed;display:none;background-color:#f8f8ff;max-width:400px}#map-title{background-color:#f1f1f1c9!important;padding:10px;border-bottom-right-radius:25px;border-bottom-left-radius:25px}#map-title:after{left:-30px;border-top:30px solid salmon;border-left:30px solid transparent;z-index:-10}.mini-img-thumbnail{width:15vw}#legendActivity circle.selected{stroke:#000;stroke-width:4px}\n"],encapsulation:2});const Xe=[{path:"",component:M,data:{title:"Carte des activit\xe9s",page:"map-activities"},outlet:"map-activities"}];class T{}T.\u0275fac=function(i){return new(i||T)},T.\u0275mod=e.oAB({type:T}),T.\u0275inj=e.cJS({imports:[P.Bz.forChild(Xe),P.Bz]});var qe=r(7157);class D{}D.\u0275fac=function(i){return new(i||D)},D.\u0275mod=e.oAB({type:D}),D.\u0275inj=e.cJS({providers:[f],imports:[m.ez,T,I.uH,qe.p,ne.k]})}}]);