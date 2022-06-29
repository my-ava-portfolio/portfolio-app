"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[304],{9304:(ct,w,g)=>{g.r(w),g.d(w,{MapActivitiesModule:()=>nt});var _=g(9808),b=g(9444),A=g(9560),y=g(8407),r=g(799),d=g(2397),t=g(5e3),Z=g(9947),T=g(7579),P=g(520);let k=(()=>{class s{constructor(e){this.http=e,this.apiUrlActivitiesGeoData=d.JW+"activities_geodata",this.ErrorapiUrlActivitiesGeoDataApiFound=new T.x,this.activitiesGeoData=new T.x,this.dataToMap=new T.x,this.dateNotified=new T.x,this.timelineBuild=new T.x,this.activitiesGeoDataToMap=new T.x,this.tripsGeoDataToMap=new T.x}pullActivitiesGeoData(){this.http.get(this.apiUrlActivitiesGeoData).subscribe({complete:()=>{},error:e=>{this.ErrorapiUrlActivitiesGeoDataApiFound.next(e.error.message)},next:e=>{this.activitiesGeoData.next(e)}})}pullDataToMap(e){this.dataToMap.next(e)}pullActivitiesGeoDataToMap(e){this.activitiesGeoDataToMap.next(e)}pullTripsGeoDataToMap(e){this.tripsGeoDataToMap.next(e)}}return s.\u0275fac=function(e){return new(e||s)(t.LFG(P.eN))},s.\u0275prov=t.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})();var Y=g(2313),$=g(3686);function O(s,o){if(1&s&&(t.O4$(),t._UZ(0,"circle")),2&s){const e=o.$implicit,i=t.oxw();t.Tol(e.class),t.uIk("r",i.activityTypesLegendData.circleR)("cx",i.activityTypesLegendData.circleCxPos)("cy",e.cy)}}function z(s,o){if(1&s&&(t.O4$(),t.TgZ(0,"text"),t._uU(1),t.qZA()),2&s){const e=o.$implicit,i=t.oxw();t.Tol(e.class+" label"),t.uIk("x",i.activityTypesLegendData.textXPos)("y",e.cy)("font-size",i.fontSize),t.xp6(1),t.hij("",e.label," ")}}function F(s,o){if(1&s&&(t.O4$(),t._UZ(0,"circle",8)),2&s){const e=o.$implicit,i=t.oxw();t.uIk("r",e)("cx",i.activityMonthLegendData.circleCxPos)("cy",e)}}function N(s,o){if(1&s&&(t.O4$(),t.TgZ(0,"text",9),t._uU(1),t.qZA()),2&s){const e=o.$implicit,i=t.oxw();t.uIk("x",i.activityMonthLegendData.textXPos)("y",2*e)("font-size",i.fontSize),t.xp6(1),t.hij("",e," mois ")}}function R(s,o){if(1&s&&(t.O4$(),t._UZ(0,"line",10)),2&s){const e=o.$implicit;t.uIk("y1",2*e+2)("y2",2*e+2)}}function E(s,o){if(1&s&&(t.O4$(),t._UZ(0,"line")),2&s){const e=o.$implicit;t.Tol(e.classLine),t.uIk("x1",e.x1)("x2",e.x2)("y1",e.y1)("y2",e.y2)}}function U(s,o){if(1&s&&(t.O4$(),t.TgZ(0,"circle"),t._uU(1,"> "),t.qZA()),2&s){const e=o.$implicit;t.Tol(e.classMarker),t.uIk("r",e.r)("cx",e.y2/2)("cy",e.y2/2)}}function J(s,o){if(1&s&&(t.O4$(),t.TgZ(0,"text"),t._uU(1),t.qZA()),2&s){const e=o.$implicit,i=t.oxw();t.Tol(e.classMarkerText),t.uIk("x",e.y2/2)("y",e.y2/2)("font-size",i.movesLineLegendData.markerFontSize),t.xp6(1),t.hij("",e.markerIcon," ")}}function B(s,o){if(1&s&&(t.O4$(),t.TgZ(0,"text",9),t._uU(1),t.qZA()),2&s){const e=o.$implicit,i=t.oxw();t.uIk("x",i.movesLineLegendData.textXPos)("y",e.y2/2)("font-size",i.fontSize),t.xp6(1),t.hij("",e.label," ")}}let V=(()=>{class s{constructor(){this.svgActivitiesPointsLayerId=d.QT,this.svgTripIdPrefix=d.m_,this.legendActivities=d.vH,this.sliderBarId=d.Cu,this.widthLegendElement=200,this.heightLegendElement=140,this.heightMoveLegendElement=60,this.tagIcon=d.yK,this.fontSize="19px",this.activityMonthLegendData={circleMonthR:[40,20,10],circleCxPos:50,textXPos:120},this.activityTypesLegendData={circleR:18,circleCxPos:20,textXPos:50,circleJobs:[{cy:25,class:"education",label:"Formations"},{cy:70,class:"job",label:"Entreprises"},{cy:115,class:"volunteer",label:"B\xe9n\xe9volat"}]},this.movesLineLegendData={textXPos:50,markerFontSize:"12px",moves:[{x1:0,x2:45,y1:0,y2:45,r:12,classLine:"train-line",classMarker:"train-marker",classMarkerText:"train-marker-text",markerIcon:d.eH,label:"Train"}]}}ngOnInit(){}ngAfterViewInit(){this.interactWithActivitiesLegend(),this.interactWithMovesLegend()}interactWithActivitiesLegend(){r.td_("#"+this.legendActivities+" circle").style("cursor","pointer").on("click",(e,i)=>{const a=r.Ys(e.currentTarget);a.classed("disabled",!a.classed("disabled"));const n=this.activityTypesLegendData.circleJobs.filter(c=>a.classed(c.class));if(1===n.length){const c=r.td_("#"+this.svgActivitiesPointsLayerId+" ."+n[0].class);c.classed("invisible",!c.classed("invisible"));const l=r.td_("#"+this.sliderBarId+" ."+n[0].class);l.classed("invisible",!l.classed("invisible"))}else console.log("error")})}interactWithMovesLegend(){this.movesLineLegendData.moves.forEach(e=>{r.td_("."+e.classMarker).style("cursor","pointer").on("click",(i,a)=>{const n=r.Ys(i.currentTarget);n.classed("disabled",!n.classed("disabled"));const c=r.td_("[id^="+this.svgTripIdPrefix+"]");c.classed("invisible",!c.classed("invisible"))})})}}return s.\u0275fac=function(e){return new(e||s)},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-theme-legend"]],decls:25,vars:13,consts:[["id","theme-legend",1,"row","py-2","mt-auto","justify-content-center"],[1,"col-4","col-lg-4"],[1,"col-lg-12"],[3,"id"],[3,"class",4,"ngFor","ngForOf"],["class","activity-months",4,"ngFor","ngForOf"],["class","label",4,"ngFor","ngForOf"],["x1","50","x2","115","class","line-dot",4,"ngFor","ngForOf"],[1,"activity-months"],[1,"label"],["x1","50","x2","115",1,"line-dot"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h6"),t._uU(3,"Activit\xe9s"),t.qZA(),t.TgZ(4,"div",2),t.O4$(),t.TgZ(5,"svg",3),t.YNc(6,O,1,5,"circle",4),t.YNc(7,z,2,6,"text",4),t.qZA()()(),t.kcU(),t.TgZ(8,"div",1)(9,"h6"),t._uU(10,"Dur\xe9e"),t.qZA(),t.TgZ(11,"div",2),t.O4$(),t.TgZ(12,"svg"),t.YNc(13,F,1,3,"circle",5),t.YNc(14,N,2,4,"text",6),t.YNc(15,R,1,2,"line",7),t.qZA()()(),t.kcU(),t.TgZ(16,"div",1)(17,"h6"),t._uU(18,"D\xe9placements"),t.qZA(),t.TgZ(19,"div",2),t.O4$(),t.TgZ(20,"svg"),t.YNc(21,E,1,6,"line",4),t.YNc(22,U,2,5,"circle",4),t.YNc(23,J,2,6,"text",4),t.YNc(24,B,2,4,"text",6),t.qZA()()()()),2&e&&(t.xp6(5),t.Q6J("id",i.legendActivities),t.uIk("viewBox","0 0 "+i.widthLegendElement+" "+i.heightLegendElement),t.xp6(1),t.Q6J("ngForOf",i.activityTypesLegendData.circleJobs),t.xp6(1),t.Q6J("ngForOf",i.activityTypesLegendData.circleJobs),t.xp6(5),t.uIk("viewBox","0 0 "+i.widthLegendElement+" "+i.heightLegendElement),t.xp6(1),t.Q6J("ngForOf",i.activityMonthLegendData.circleMonthR),t.xp6(1),t.Q6J("ngForOf",i.activityMonthLegendData.circleMonthR),t.xp6(1),t.Q6J("ngForOf",i.activityMonthLegendData.circleMonthR),t.xp6(5),t.uIk("viewBox","0 0 "+i.widthLegendElement+" "+i.heightMoveLegendElement),t.xp6(1),t.Q6J("ngForOf",i.movesLineLegendData.moves),t.xp6(1),t.Q6J("ngForOf",i.movesLineLegendData.moves),t.xp6(1),t.Q6J("ngForOf",i.movesLineLegendData.moves),t.xp6(1),t.Q6J("ngForOf",i.movesLineLegendData.moves))},directives:[_.sg],styles:[".label[_ngcontent-%COMP%]{text-anchor:start;dominant-baseline:middle}svg[_ngcontent-%COMP%]{width:9em}@media (max-width: 576px){svg[_ngcontent-%COMP%]{width:6em}}"]}),s})(),G=(()=>{class s{constructor(e){this.dataService=e,this.backwardIcon=d.Gq,this.forwardIcon=d.cn,this.tagIcon=d.yK,this.legendActivities=d.vH,this.sliderBarId="#"+d.Cu,this.margin={top:10,right:15,bottom:0,left:15},this.width=600,this.height=90,this.fontSize="14px",this.sliderNodesSize=5,this.endDate=d.cQ,this.currentYear=d.VK,this.selectedDatePosition=0,this.maxDatePosition=this.width-this.margin.left-this.margin.right,this.currentCountNodes=0,this.svgTripIdPrefix=d.m_,this.pullGeoDataSubscription=this.dataService.activitiesGeoData.subscribe(i=>{this.geoTripsData=i.trips_data,this.dataService.pullTripsGeoDataToMap(i.trips_data),this.geoActivitiesData=i.activities_geojson;const a=new Date(i.start_date);if(a.setMonth(a.getMonth()-1),this.startDate=a,this.buildTimeline(String(this.currentYear)),void 0!==this.currentActivityIdSelected){const n=r.Ys("#slider-bar #location_"+this.currentActivityIdSelected);this.sliderEventCircleBounceRepeat(n)}})}ngOnInit(){this.dataService.pullActivitiesGeoData()}ngOnDestroy(){this.pullGeoDataSubscription.unsubscribe()}parseTime(e){return r.Z1g("%Y-%m-%d")(e)}formatDate(e){return r.i$Z("%b %Y")(e)}formatDateToYearString(e){return r.i$Z("%Y")(e)}formatDateToString(e){return r.i$Z("%Y-%m-%d")(e)}startTimeLine(){const e=r.Ys("#play-button");"Pause"===e.html()?(clearInterval(this.timer),e.text("Continue")):(e.html(),this.timer=setInterval(this.step.bind(this),100),e.html("Pause"))}resetTimeLine(){r.Ys("#play-button").html("Start"),this.sliderDate=this.startDate,this.update(this.startDate),this.selectedDatePosition=0,clearInterval(this.timer)}forwardTimeLine(){r.Ys("#play-button").html("Play"),this.sliderDate=this.startDate,this.update(this.endDate),this.selectedDatePosition=0,clearInterval(this.timer)}updateTrips(e){this.geoTripsData.forEach(i=>{const n=i.end_date,c=this.parseTime(i.start_date),l=this.parseTime(n),h=r.td_("[id^="+this.svgTripIdPrefix+i.name+"]");null!==c&&null!==l&&h.style("visibility",e>=c&&e<l?"visible":"hidden")})}update(e){this.updateTrips(e);const i=this.geoActivitiesData.features.filter(a=>{const n=this.parseTime(a.properties.start_date);return null!==n&&n>=this.startDate&&n<e});i.length!==this.currentCountNodes&&(this.dataService.pullActivitiesGeoDataToMap(i),this.displaySliderNodes(i)),this.currentCountNodes=i.length,r.Ys("#trace").attr("x2",this.dateRange(e)),r.Ys("#handle").attr("cx",this.dateRange(e)),this.sliderDate=e}step(){this.update(this.dateRange.invert(this.selectedDatePosition)),this.selectedDatePosition=this.selectedDatePosition+this.maxDatePosition/151,this.selectedDatePosition>this.maxDatePosition&&(this.selectedDatePosition=0,clearInterval(this.timer),r.Ys("#play-button").text("Play"))}_initDateRange(){this.dateRange=r.Xf().domain([this.startDate,this.endDate]).range([0,this.maxDatePosition]).clamp(!0)}buildTimeline(e){const i=r.Ys(this.sliderBarId),a=r.Ys("#play-button");this._initDateRange();const n=i.append("g").attr("class","slider-bar").attr("transform","translate("+this.margin.left+","+this.height/2+")");n.append("line").attr("class","track").attr("x1",this.dateRange.range()[0]).attr("x2",this.dateRange.range()[1]).select((u,m,D)=>D[m].parentNode.appendChild(D[m].cloneNode(!0))).attr("class","track-inset").select((u,m,D)=>D[m].parentNode.appendChild(D[m].cloneNode(!0))).attr("class","track-overlay").call(r.ohM().on("drag start",u=>{a.text("Pause"),a.dispatch("click"),this.selectedDatePosition=u.x,this.update(this.dateRange.invert(this.selectedDatePosition)),r.Ys("#slider-bar .events").selectAll("circle").style("pointer-events","none")}).on("end",()=>{this.mapContainer.dragging.enable(),r.Ys("#slider-bar .events").selectAll("circle").style("pointer-events","all"),this.dateRange.invert(this.selectedDatePosition).toTimeString()===this.endDate.toTimeString()||this.dateRange.invert(this.selectedDatePosition).toTimeString()===this.startDate.toTimeString()?a.text("Play"):a.text("Continue")})),n.insert("g",".track-overlay").attr("class","ticks").attr("transform","translate(0,21)").selectAll("text").data(this.dateRange.ticks(10)).enter().append("text").attr("x",this.dateRange).attr("y",0).style("font-size",this.fontSize).attr("text-anchor","middle").text(u=>this.formatDateToYearString(u)),n.insert("g",".track-overlay").attr("class","ticks-line").attr("transform","translate(0,-6)").selectAll("line").data(this.dateRange.ticks(10)).enter().append("line").attr("x1",this.dateRange).attr("x2",this.dateRange).attr("y1",0).attr("y2",12).style("stroke","grey").style("stroke-width","2px"),n.insert("g",".track-overlay").attr("class","trace-events").selectAll("circle").data(this.geoActivitiesData.features).enter().append("circle").attr("class",u=>{const m=this.parseTime(u.properties.start_date);return null!==m&&m>=this.startDate?"trace":""}).attr("r",u=>{const m=this.parseTime(u.properties.start_date);return null!==m&&m>=this.startDate?4:2}).attr("cx",u=>{const m=this.parseTime(u.properties.start_date);return null===m?"":m>=this.startDate?this.dateRange(m):void 0}),n.insert("line",".track-overlay").attr("id","trace").attr("x1",this.dateRange(this.startDate)),n.insert("circle",".track-overlay").attr("id","handle").attr("r",10),n.append("g").attr("class","events"),this.sliderDate=this.endDate,this.update(this.endDate)}displaySliderNodes(e){const i=r.Ys("#slider-bar .events").selectAll("circle").data(e,a=>a.properties.id);i.enter().append("circle").attr("id",a=>"location_"+a.properties.id).attr("class",a=>{const n=r.td_("#"+this.legendActivities+" circle."+a.properties.type);return n.size()>0&&n.classed("disabled")?"invisible activityPoint "+a.properties.type:"activityPoint "+a.properties.type}).attr("r",this.sliderNodesSize).attr("cursor","pointer").attr("cx",a=>this.dateRange(this.parseTime(a.properties.start_date))).on("mouseover",(a,n)=>{n.properties.id!==this.currentActivityIdSelected&&this.BounceMapActivityCircle(n,4),this.interactionWithEventNode(a.currentTarget,n),r.Ys("#popup-feature-"+n.properties.id).style("display","block").style("right","1em").style("top","5em")}).on("mouseout",(a,n)=>{n.properties.id!==this.currentActivityIdSelected&&this.BounceMapActivityCircle(n,2),this.interactionWithEventNode(a.currentTarget,n),r.Ys("#popup-feature-"+n.properties.id).style("display","none").style("right","unset").style("right","unset")}),i.exit().remove()}interactionWithEventNode(e,i){const a=r.Ys(e);a.classed("selected",!a.classed("selected"));const n=r.Ys("#theme-legend ."+i.properties.type);n.classed("selected",!n.classed("selected"));const c=r.Ys("#svgActivitiesLayer #node_location_"+i.properties.id+" circle");c.classed("selected",!c.classed("selected"))}BounceMapActivityCircle(e,i){const a=r.Ys("#svgActivitiesLayer #node_location_"+e.properties.id+" circle");this.circleBouncer(a,i)}circleBouncer(e,i){e.transition().duration(1e3).ease(r.Az_).attr("r",a=>a.properties.months*i)}sliderEventCircleBounceRepeat(e){e.transition().duration(1e3).ease(r.Az_).attr("r",2*this.sliderNodesSize).transition().duration(500).ease(r.Nyw).attr("r",this.sliderNodesSize).on("end",this.sliderEventCircleBounceRepeat.bind(this,e))}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(k))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-time-legend"]],inputs:{currentActivityIdSelected:"currentActivityIdSelected",mapContainer:"mapContainer"},decls:18,vars:7,consts:[["id","theme-legend",1,"d-flex","flex-column","flex-lg-row","mt-auto","py-2","justify-content-center"],[1,""],["id","slider-bar"],[1,"text-center","px-5"],[1,"d-flex","flex-column","justify-content-center"],["id","slider-value"],["id","start-button","role","button",1,"btn","btn-dark","btn-sm",3,"click"],[3,"icon"],["id","play-button","role","button",1,"btn","btn-dark","mx-2",3,"click"],["id","end-button","role","button",1,"btn","btn-dark","btn-sm",3,"click"]],template:function(e,i){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"h6"),t._uU(3,"Barre Temporelle"),t.qZA(),t.O4$(),t._UZ(4,"svg",2),t.qZA(),t.kcU(),t.TgZ(5,"div",3)(6,"div",4)(7,"div",1)(8,"h5",5),t._uU(9),t.ALo(10,"date"),t.qZA()(),t.TgZ(11,"div",1)(12,"a",6),t.NdJ("click",function(){return i.resetTimeLine()}),t._UZ(13,"fa-icon",7),t.qZA(),t.TgZ(14,"a",8),t.NdJ("click",function(){return i.startTimeLine()}),t._uU(15,"Play"),t.qZA(),t.TgZ(16,"a",9),t.NdJ("click",function(){return i.forwardTimeLine()}),t._UZ(17,"fa-icon",7),t.qZA()()()()()),2&e&&(t.xp6(4),t.uIk("viewBox","0 0 "+i.width+" "+i.height),t.xp6(5),t.Oqu(t.xi3(10,4,i.sliderDate,"MMMM y")),t.xp6(4),t.Q6J("icon",i.backwardIcon),t.xp6(4),t.Q6J("icon",i.forwardIcon))},directives:[b.BN],pipes:[_.uU],styles:[".events circle{stroke-width:1px;opacity:1;stroke:#f8f8ff}.trace-events circle.trace{fill:#686868;opacity:.7;stroke:#f8f8ff;stroke-width:3px;stroke-opacity:1}.ticks{font-size:10px}.track,.track-inset,.track-overlay{stroke-linecap:round}.track{stroke:#000;stroke-opacity:.3;stroke-width:13px}.track-inset{stroke:#dcdcdc;stroke-width:11px}.track-overlay{pointer-events:stroke;stroke-width:50px;stroke:transparent;cursor:pointer}#handle{fill:#fff;stroke:#000;stroke-opacity:.5;stroke-width:1.25px}svg #trace{stroke:#6c6c6c;stroke-width:4}#play-button{width:90px}circle.preselected{stroke:#000!important;stroke-width:2px!important}#slider-bar{width:33em}@media (max-width: 576px){#slider-bar{width:20em}}\n"],encapsulation:2}),s})();function j(s,o){1&s&&t.GkF(0)}function Q(s,o){1&s&&t._UZ(0,"div")}function W(s,o){if(1&s&&(t.TgZ(0,"div",18),t._UZ(1,"img",19),t.qZA()),2&s){const e=t.oxw().$implicit,i=t.oxw(2);t.xp6(1),t.Q6J("src",i.apiImgUrl+e.properties.img_activity,t.LSH)}}function q(s,o){1&s&&t._UZ(0,"div")}function H(s,o){if(1&s&&(t.TgZ(0,"div",13),t._uU(1),t.ALo(2,"date"),t.ALo(3,"date"),t.qZA()),2&s){const e=t.oxw().$implicit;t.xp6(1),t.AsE("Du ",t.xi3(2,2,e.properties.start_date,"MM-yyyy")," au ",t.xi3(3,5,e.properties.end_date,"MM-yyyy"),"")}}function X(s,o){if(1&s&&(t.TgZ(0,"div",13),t._uU(1),t.ALo(2,"date"),t.qZA()),2&s){const e=t.oxw().$implicit;t.xp6(1),t.hij("Du ",t.xi3(2,1,e.properties.start_date,"MM-yyyy")," \xe0 aujourd'hui")}}function K(s,o){if(1&s&&(t.TgZ(0,"div",5)(1,"div",6)(2,"div",7)(3,"div",8)(4,"h5",9),t._uU(5),t.qZA()()(),t.TgZ(6,"div",7),t.YNc(7,Q,1,0,"div",10),t.YNc(8,W,2,1,"ng-template",null,11,t.W1O),t.TgZ(10,"div",12)(11,"h6",9),t._uU(12),t.qZA(),t.TgZ(13,"span",13),t._UZ(14,"fa-icon",14),t._uU(15),t.qZA(),t.YNc(16,q,1,0,"div",15),t.YNc(17,H,4,8,"ng-template",null,16,t.W1O),t.YNc(19,X,3,4,"ng-template",null,17,t.W1O),t.qZA()()()()),2&s){const e=o.$implicit,i=t.MAs(9),a=t.MAs(18),n=t.MAs(20),c=t.oxw(2);t.Q6J("id","popup-feature-"+e.properties.id),t.xp6(5),t.Oqu(e.properties.title),t.xp6(2),t.Q6J("ngIf","null"!==e.properties.img_activity)("ngIfThen",i),t.xp6(5),t.Oqu(e.properties.name),t.xp6(2),t.Q6J("icon",c.locationIcon),t.xp6(1),t.hij(" ",e.properties.location," "),t.xp6(1),t.Q6J("ngIf","InProgress"===e.properties.status)("ngIfThen",n)("ngIfElse",a)}}function tt(s,o){if(1&s&&t.YNc(0,K,21,10,"div",4),2&s){const e=t.oxw();t.Q6J("ngForOf",e.geoFeaturesData)}}const et=function(){return{}},it=[{path:"",component:(()=>{class s{constructor(e,i,a,n,c){this.mapService=e,this.dataService=i,this.activatedRoute=a,this.titleService=n,this.controlerService=c,this.imageProfile=d.tz,this.experiencesRoute=d.I_.route,this.educationRoute=d.QD.route,this.svgTripIdPrefix=d.m_,this.legendActivities=d.vH,this.trainIconUnicode=d.eH,this.currentDate=d.VK,this.isLegendDisplayed=!0,this.maxZoomValue=9,this.ZoomActivityValue=12,this.apiImgUrl=d.VH,this.locationIcon=d.pk,this.tagIcon=d.yK,this.centerIcon=d.HI,this.helpIcon=d.mv,this.helpPopup="Voici une cartographie spatio-temporelles de mes exp\xe9riences",this.popupWidth=330,this.popupHeight=190,this.svgActivitiesLayerId=d.QT,this.circleOpacity=.7,this.circleStroke="ghostwhite",this.circleWidth="2.5px",this.zoomEventSubscription=this.mapService.zoomEvent.subscribe(l=>{this.zoomFromDataBounds(this.geoFeaturesData)}),this.mapContainerSubscription=this.mapService.mapContainer.subscribe(l=>{this.mapContainer=l,this.initActivitiesSvgLayer()}),this.pullActivitiesGeoDataToMapSubscription=this.dataService.activitiesGeoDataToMap.subscribe(l=>{this.geoFeaturesData=l,this.activitiesMapping(l),this.zoomInitDone||(null!==this.fragment?this.zoomFromActivityId(this.geoFeaturesData,this.fragment):this.zoomFromDataBounds(l),this.zoomInitDone=!0)}),this.pullTripsGeoDataToMapSubscription=this.dataService.tripsGeoDataToMap.subscribe(l=>{l.forEach(h=>{let v=Object.create(h.geojson_data);v=v.slice().reverse(),this.computeAnimatePointsOnLine(h.geojson_data,h.name),this.computeAnimatePointsOnLine(v,`${h.name}_reverted`)})}),this.routeSubscription=this.activatedRoute.fragment.subscribe(l=>{null===l?this.fragment=null:(this.fragment=l,this.fragmentValue=this.fragment)})}ngOnInit(){this.mapService.getMapContainer(),this.sendResumeSubMenus(),this.zoomInitDone=!1,this.innerWidth=window.innerWidth,this.innerHeight=window.innerHeight}sendResumeSubMenus(){this.controlerService.pullSubMenus([]),this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title),this.titleService.setTitle(this.activatedRoute.snapshot.data.title)}ngOnDestroy(){this.mapContainerSubscription.unsubscribe(),this.pullActivitiesGeoDataToMapSubscription.unsubscribe(),this.pullTripsGeoDataToMapSubscription.unsubscribe(),this.zoomEventSubscription.unsubscribe(),this.routeSubscription.unsubscribe(),r.Ys(`#${this.svgActivitiesLayerId}`).remove(),r.td_(`[id^=${this.svgTripIdPrefix}]`).remove(),this.mapService.resetMapView()}zoomOnData(){void 0!==this.geoFeaturesData&&this.zoomFromDataBounds(this.geoFeaturesData)}showHideLegend(){this.isLegendDisplayed=!this.isLegendDisplayed}zoomFromDataBounds(e){this.mapContainer.fitBounds(y.geoJSON(e).getBounds(),{maxZoom:this.maxZoomValue})}zoomFromActivityId(e,i){const a=e.filter(n=>n.properties.id===i);1===a.length&&(this.mapContainer.setView([a[0].geometry.coordinates[1],a[0].geometry.coordinates[0]],this.ZoomActivityValue),this.bounceRepeat(`#node_location_${i} circle`))}initActivitiesSvgLayer(){const e=y.svg().addTo(this.mapContainer);r.Ys(e._container).attr("id",this.svgActivitiesLayerId).attr("pointer-events","auto").select("g").attr("class","leaflet-zoom-hide").attr("id","activities-container")}activitiesMapping(e){const a=r.Ys("#activities-container").selectAll(".activityPoint").data(e,n=>n.properties.id);a.enter().append("a").attr("xlink:href",n=>{const c=n.properties.id,l=n.properties.type;return"education"===l?`#${this.educationRoute}#${c}`:"job"==l||"volunteer"==l?`#${this.experiencesRoute}#${c}`:"#none"}).attr("id",n=>"node_location_"+n.properties.id).attr("class",n=>{const c=r.td_(`#${this.legendActivities} circle.${n.properties.type}`);return c.size()>0&&c.classed("disabled")?`invisible activityPoint ${n.properties.type}`:"activityPoint "+n.properties.type}).attr("cursor","pointer").append("circle").style("opacity",this.circleOpacity).style("stroke",this.circleStroke).style("stroke-width",this.circleWidth).attr("class",n=>n.properties.type).on("mouseover",(n,c)=>{const l=r.Ys(n.currentTarget);l.classed("selected",!l.classed("selected"));const h=r.Ys(`#slider-bar #location_${c.properties.id}`);h.classed("selected",!h.classed("selected"));const v=r.Ys(`#theme-legend .${c.properties.type}`);v.classed("selected",!v.classed("selected"))}).on("mousemove",(n,c)=>{this.adaptActivityPopup(c.properties.id,n)}).on("mouseout",(n,c)=>{this.disableActivityPopup(c.properties.id);const l=r.Ys(n.currentTarget);l.classed("selected",!l.classed("selected"));const h=r.Ys(`#slider-bar #location_${c.properties.id}`);h.classed("selected",!h.classed("selected"));const v=r.Ys(`#theme-legend .${c.properties.id}`);v.classed("selected",!v.classed("selected"))}),r.td_(".activityPoint circle").transition().attr("r",n=>2*n.properties.months),a.exit().remove(),this.mapContainer.on("moveend",this.reset.bind(this)),this.reset()}reset(){r.Ys("#"+this.svgActivitiesLayerId).selectAll("circle").attr("transform",e=>{const n=this.mapContainer.latLngToLayerPoint(new y.LatLng(e.geometry.coordinates[1],e.geometry.coordinates[0]));return`translate(${n.x},${n.y})`})}applyLatLngToLayer(e){return this.mapContainer.latLngToLayerPoint(new y.LatLng(e.geometry.coordinates[1],e.geometry.coordinates[0]))}adaptActivityPopup(e,i){r.Ys("#popup-feature-"+e).style("display","block").style("z-index","1").style("left",()=>i.x+this.popupWidth+20>this.innerWidth?i.x-this.popupWidth-15+"px":i.x+15+"px").style("top",()=>i.y+this.popupHeight+20>this.innerHeight?i.y-this.popupHeight-15+"px":i.y+15+"px")}disableActivityPopup(e){r.Ys(`#popup-feature-${e}`).style("z-index","unset").style("display","none").style("left","unset").style("top","unset")}bounceRepeat(e){r.Ys(e).transition().duration(1e3).ease(r.Az_).attr("r",i=>4*i.properties.months).transition().duration(500).ease(r.Nyw).attr("r",i=>i.properties.months).on("end",this.bounceRepeat.bind(this,e))}computeAnimatePointsOnLine(e,i){const a=e,n=p=>this.mapContainer.latLngToLayerPoint(new y.LatLng(p.geometry.coordinates[1],p.geometry.coordinates[0]));a.forEach(p=>{p.LatLng=new y.LatLng(p.geometry.coordinates[1],p.geometry.coordinates[0])});const c=y.svg().addTo(this.mapContainer),h=r.Ys(c._container).attr("id",this.svgTripIdPrefix+i).append("g").attr("class",`leaflet-zoom-hide path_${i}`),v=r.jvg().x(p=>n(p).x).y(p=>n(p).y),u=h.selectAll(`.lineConnect_${i}`).data([a]).enter().append("path").attr("class",`train-line lineConnect_${i}`).style("fill","none").style("opacity","unset").style("stroke","black").style("stroke-width","3px").style("overflow","overlay"),m=h.append("circle").attr("r",11).attr("id",`marker_${i}`).attr("class",`train-marker travelMarker_${i}`),D=h.append("text").text(this.trainIconUnicode).attr("id",`markerText_${i}`).attr("class",`train-marker-text travelMarkerText_${i}`),at=h.selectAll("circle").data(a).enter().append("circle").attr("class",`waypoints_${i}`).style("opacity","0"),M=()=>{m.attr("transform",()=>{const x=this.mapContainer.latLngToLayerPoint(new y.LatLng(a[0].geometry.coordinates[1],a[0].geometry.coordinates[0]));return`translate(${x.x},${x.y})`}),D.attr("transform",()=>{const x=this.mapContainer.latLngToLayerPoint(new y.LatLng(a[0].geometry.coordinates[1],a[0].geometry.coordinates[0]));return`translate(${x.x},${x.y})`}),u.attr("d",v),at.attr("transform",p=>{const L=this.mapContainer.latLngToLayerPoint(new y.LatLng(a[0].geometry.coordinates[1],a[0].geometry.coordinates[0]));return`translate(${L.x},${L.y})`})};function rt(){return p=>{const f=u.node().getTotalLength(),x=r.ITZ(`0,${f}`,`${f},${f}`),L=r.Ys("#marker_"+i),ot=r.Ys("#markerText_"+i),S=u.node().getPointAtLength(p*f),I=`translate(${S.x},${S.y})`;return L.attr("transform",I),ot.attr("transform",I),x(p)}}this.mapContainer.on("moveend",M),M(),function C(){u.transition().duration(7500).attrTween("stroke-dasharray",rt).on("end",p=>{r.Ys(p.currentTarget).call(C),u.style("stroke-dasharray","0")})}()}}return s.\u0275fac=function(e){return new(e||s)(t.Y36(Z.S),t.Y36(k),t.Y36(A.gz),t.Y36(Y.Dx),t.Y36($.L))},s.\u0275cmp=t.Xpm({type:s,selectors:[["app-map-view"]],decls:6,vars:5,consts:[[1,"d-flex","flex-column","flex-xl-row","justify-content-around","align-items-center"],[3,"currentActivityIdSelected","mapContainer"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["activitiesPopups",""],["class","col-md-4 item card shadow map-popup",3,"id",4,"ngFor","ngForOf"],[1,"col-md-4","item","card","shadow","map-popup",3,"id"],[1,"card-body"],[1,"row","justify-content-around"],[1,"col-lg-12","mb-1"],[1,"fw-bolder","small"],[4,"ngIf","ngIfThen"],["ImgActivity",""],[1,"col-8","my-auto"],[1,"small"],[1,"me-2","text-danger",3,"icon"],[4,"ngIf","ngIfThen","ngIfElse"],["pastJob",""],["currentJob",""],[1,"col-4","my-auto","justify-content-around","text-center"],[1,"img-fluid","rounded","mx-auto","d-block","shadow","mini-img-thumbnail",3,"src"]],template:function(e,i){if(1&e&&(t.TgZ(0,"div",0),t._UZ(1,"app-theme-legend")(2,"app-time-legend",1),t.qZA(),t.YNc(3,j,1,0,"ng-container",2),t.YNc(4,tt,1,1,"ng-template",null,3,t.W1O)),2&e){const a=t.MAs(5);t.xp6(2),t.Q6J("currentActivityIdSelected",i.fragmentValue)("mapContainer",i.mapContainer),t.xp6(1),t.Q6J("ngTemplateOutlet",a)("ngTemplateOutletContext",t.DdM(4,et))}},directives:[V,G,_.tP,_.sg,_.O5,b.BN],pipes:[_.uU],styles:['.map-popup{position:fixed;display:none;background-color:#f8f8ff;max-width:400px}#map-title{background-color:#f1f1f1c9!important;padding:10px;border-bottom-right-radius:25px;border-bottom-left-radius:25px}#map-title:after{left:-30px;border-top:30px solid salmon;border-left:30px solid transparent;z-index:-10}.mini-img-thumbnail{width:15vw}.train-line{stroke:#000;stroke-width:3px}.train-marker{fill:#ff0;stroke:#000;stroke-width:3px;color:#000}.train-marker-text{font-family:"Font Awesome 5 Free";font-weight:900;color:#000;text-anchor:middle;dominant-baseline:middle;pointer-events:none}\n'],encapsulation:2}),s})(),data:{title:"Carte des activit\xe9s",page:"map-activities"},outlet:"map-activities"}];let st=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({imports:[[A.Bz.forChild(it)],A.Bz]}),s})(),nt=(()=>{class s{}return s.\u0275fac=function(e){return new(e||s)},s.\u0275mod=t.oAB({type:s}),s.\u0275inj=t.cJS({providers:[k],imports:[[_.ez,st,b.uH]]}),s})()}}]);