"use strict";(self.webpackChunkportfolio=self.webpackChunkportfolio||[]).push([[607],{2607:(et,X,l)=>{l.r(X),l.d(X,{MapGtfsViewerModule:()=>Xe});var I=l(4755),N=l(9129),O=l(7292),V=l(109),F=l(7392),P=l(5044),k=l(6785);!function se(){const o=new Date;o.setHours(0,0,0,0)}();const K="gtfs",z="rgb(255, 0, 0)",H="rgb(153, 76, 0)",Y="rgb(102, 178, 255)",A="white",Z=1.5,ae=new V.ZP({image:new F.Z({radius:4,fill:new P.Z({color:z}),stroke:new k.Z({color:A,width:Z})})}),le=new V.ZP({image:new F.Z({radius:4,fill:new P.Z({color:H}),stroke:new k.Z({color:A,width:Z})})}),ce=new V.ZP({image:new F.Z({radius:4,fill:new P.Z({color:Y}),stroke:new k.Z({color:A,width:Z})})}),ue=new V.ZP({image:new F.Z({radius:4,fill:new P.Z({color:"black"}),stroke:new k.Z({color:A,width:Z})})});function he(o){return"0"===o.get("route_type")?le:"1"===o.get("route_type")?ce:"2"===o.get("route_type")?ae:ue}var ge=l(3171),me=l(187),fe=l(9988),ve=l(2121),x=l(521),U=l(8587),f=l(483),h=l(760),q=l(6003);const ye=class xe extends ve.Z{constructor(n){super(n),this.image_=null}getImage(){return this.image_?this.image_.getImage():null}prepareFrame(n){const t=n.layerStatesArray[n.layerIndex],i=n.pixelRatio,r=n.viewState,a=r.resolution,s=this.getLayer().getSource(),c=n.viewHints;let u=n.extent;if(void 0!==t.extent&&(u=(0,h.Ed)(u,(0,q.dY)(t.extent,r.projection))),!c[U.Z.ANIMATING]&&!c[U.Z.INTERACTING]&&!(0,h.xb)(u))if(s){const d=s.getImage(u,a,i,r.projection);d&&(this.loadImage(d)?this.image_=d:d.getState()===x.Z.EMPTY&&(this.image_=null))}else this.image_=null;return!!this.image_}getData(n){const t=this.frameState;if(!t)return null;const i=this.getLayer(),r=(0,f.nn)(t.pixelToCoordinateTransform,n.slice()),a=i.getExtent();if(a&&!(0,h.b8)(a,r))return null;const s=this.image_.getExtent(),c=this.image_.getImage(),u=(0,h.dz)(s),p=Math.floor(c.width*((r[0]-s[0])/u));if(p<0||p>=c.width)return null;const d=(0,h.Cr)(s),m=Math.floor(c.height*((s[3]-r[1])/d));return m<0||m>=c.height?null:this.getImageData(c,p,m)}renderFrame(n,t){const i=this.image_,r=i.getExtent(),a=i.getResolution(),[s,c]=Array.isArray(a)?a:[a,a],u=i.getPixelRatio(),p=n.layerStatesArray[n.layerIndex],d=n.pixelRatio,m=n.viewState,G=m.center,b=m.resolution,_=d*s/(b*u),y=d*c/(b*u),w=n.extent,T=m.resolution,Ke=m.rotation,C=Math.round((0,h.dz)(w)/T*d),L=Math.round((0,h.Cr)(w)/T*d);(0,f.qC)(this.pixelTransform,n.size[0]/2,n.size[1]/2,1/d,1/d,Ke,-C/2,-L/2),(0,f.nb)(this.inversePixelTransform,this.pixelTransform);const J=(0,f.BB)(this.pixelTransform);this.useContainer(t,J,this.getBackground(n));const g=this.context,D=g.canvas;D.width!=C||D.height!=L?(D.width=C,D.height=L):this.containerReused||g.clearRect(0,0,C,L);let $=!1,Q=!0;if(p.extent){const E=(0,q.dY)(p.extent,m.projection);Q=(0,h.kK)(E,n.extent),$=Q&&!(0,h.r4)(E,n.extent),$&&this.clipUnrotated(g,n,E)}const R=i.getImage(),B=(0,f.qC)(this.tempTransform,C/2,L/2,_,y,0,u*(r[0]-G[0])/s,u*(G[1]-r[3])/c);this.renderedResolution=c*d/u;const ie=R.width*B[0],oe=R.height*B[3];if(this.getLayer().getSource().getInterpolate()||(g.imageSmoothingEnabled=!1),this.preRender(g,n),Q&&ie>=.5&&oe>=.5){const E=B[4],qe=B[5],W=p.opacity;let re;1!==W&&(re=g.globalAlpha,g.globalAlpha=W),g.drawImage(R,0,0,+R.width,+R.height,E,qe,ie,oe),1!==W&&(g.globalAlpha=re)}return this.postRender(g,n),$&&g.restore(),g.imageSmoothingEnabled=!0,J!==D.style.transform&&(D.style.transform=J),this.container}};var be=l(5695),we=l(9972),Te=l(3641);const Ae=class De extends Te.ZP{constructor(n,t,i,r,a){super(n,t,i,void 0!==a?x.Z.IDLE:x.Z.LOADED),this.loader_=void 0!==a?a:null,this.canvas_=r,this.error_=null}getError(){return this.error_}handleLoad_(n){n?(this.error_=n,this.state=x.Z.ERROR):this.state=x.Z.LOADED,this.changed()}load(){this.state==x.Z.IDLE&&(this.state=x.Z.LOADING,this.changed(),this.loader_(this.handleLoad_.bind(this)))}getImage(){return this.canvas_}};var Ze=l(2402);const Ce=class Me extends ye{constructor(n){super(n),this.vectorRenderer_=new be.Z(n),this.layerImageRatio_=n.getImageRatio(),this.coordinateToVectorPixelTransform_=(0,f.Ue)(),this.renderedPixelToCoordinateTransform_=null}disposeInternal(){this.vectorRenderer_.dispose(),super.disposeInternal()}getFeatures(n){if(!this.vectorRenderer_)return Promise.resolve([]);const t=(0,f.nn)(this.coordinateToVectorPixelTransform_,(0,f.nn)(this.renderedPixelToCoordinateTransform_,n.slice()));return this.vectorRenderer_.getFeatures(t)}handleFontsChanged(){this.vectorRenderer_.handleFontsChanged()}prepareFrame(n){const t=n.pixelRatio,i=n.viewState,r=i.resolution,a=n.viewHints,s=this.vectorRenderer_;let c=n.extent;1!==this.layerImageRatio_&&(c=c.slice(0),(0,h.H9)(c,this.layerImageRatio_));const u=(0,h.dz)(c)/r,p=(0,h.Cr)(c)/r;if(!a[U.Z.ANIMATING]&&!a[U.Z.INTERACTING]&&!(0,h.xb)(c)){s.useContainer(null,null);const d=s.context,G=Object.assign({},n.layerStatesArray[n.layerIndex],{opacity:1}),b=Object.assign({},n,{declutterTree:new Ze(9),extent:c,size:[u,p],viewState:Object.assign({},n.viewState,{rotation:0}),layerStatesArray:[G],layerIndex:0});let _=!0;const y=new Ae(c,r,t,d.canvas,function(w){s.prepareFrame(b)&&s.replayGroupChanged&&(s.clipping=!1,s.renderFrame(b,null)&&(s.renderDeclutter(b),_=!1),w())});y.addEventListener(we.Z.CHANGE,()=>{if(y.getState()!==x.Z.LOADED)return;this.image_=_?null:y;const w=y.getPixelRatio(),T=function Se(o){return Array.isArray(o)?Math.min(...o):o}(y.getResolution())*t/w;this.renderedResolution=T,this.coordinateToVectorPixelTransform_=(0,f.qC)(this.coordinateToVectorPixelTransform_,u/2,p/2,1/T,-1/T,0,-i.center[0],-i.center[1])}),y.load()}return this.image_&&(this.renderedPixelToCoordinateTransform_=n.pixelToCoordinateTransform.slice()),!!this.image_}preRender(){}postRender(){}renderDeclutter(){}forEachFeatureAtCoordinate(n,t,i,r,a){return this.vectorRenderer_?this.vectorRenderer_.forEachFeatureAtCoordinate(n,t,i,r,a):super.forEachFeatureAtCoordinate(n,t,i,r,a)}},Re=class Le extends fe.Z{constructor(n){n=n||{};const t=Object.assign({},n);delete t.imageRatio,super(t),this.imageRatio_=void 0!==n.imageRatio?n.imageRatio:1}getImageRatio(){return this.imageRatio_}createRenderer(){return new Ce(this)}};var ee=l(5947),Ee=l(5625),M=l(7963),Ie=l(6597),Ve=l(3324),e=l(2223),Fe=l(9751),v=l(7579),Pe=l(2340),ke=l(3144);let te=(()=>{class o{constructor(t){this.http=t,this.cache=Fe.y,this.gtfsViewerApiUrl=Pe.N.gtfsViewerApiUrl,this.mapContainer=new v.x,this.screenMapBound=new v.x,this.availableAreas=new v.x,this.availableRouteTypes=new v.x,this.routeLongName=new v.x,this.ErrorapiUrlDataApiFound=new v.x,this.GeoData=new v.x,this.rangeDateData=new v.x,this.GeoDataToMap=new v.x}pullGeoData(t,i,r){const a=Math.floor(i.getTime()/1e3);this.http.get(this.gtfsViewerApiUrl+t.toLowerCase()+"/moving_nodes?date="+a+"&bounds="+r).subscribe({complete:()=>{},error:s=>{this.ErrorapiUrlDataApiFound.next(s.error.message)},next:s=>{this.GeoData.next(s)}})}pullRangeDateData(t){this.http.get(this.gtfsViewerApiUrl+t.toLowerCase()+"/range_dates").subscribe({complete:()=>{},error:i=>{this.ErrorapiUrlDataApiFound.next(i.error.message)},next:i=>{this.rangeDateData.next(i)}})}pullAvailableAreas(){this.http.get(this.gtfsViewerApiUrl+"existing_study_areas").subscribe({complete:()=>{},error:t=>{this.ErrorapiUrlDataApiFound.next(t.error.message)},next:t=>{this.availableAreas.next(t)}})}pullAvailableRouteTypes(t){this.http.get(this.gtfsViewerApiUrl+t.toLowerCase()+"/route_types").subscribe({complete:()=>{},error:i=>{this.ErrorapiUrlDataApiFound.next(i.error.message)},next:i=>{this.availableRouteTypes.next(i)}})}pullRouteLongName(t,i){this.http.get(this.gtfsViewerApiUrl+t.toLowerCase()+"/route_long_name?id="+i).subscribe({complete:()=>{},error:r=>{this.ErrorapiUrlDataApiFound.next(r.error.message)},next:r=>{this.routeLongName.next(r)}})}pullGeoDataToMap(t){this.GeoDataToMap.next(t)}}return o.\u0275fac=function(t){return new(t||o)(e.LFG(ke.eN))},o.\u0275prov=e.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();var Ue=l(9947),Ge=l(3686),_e=l(485),ne=l(4519),j=l(6600),Be=l(2921);function Ne(o,n){if(1&o){const t=e.EpF();e.ynx(0),e.TgZ(1,"h6",11),e._uU(2,"Vitesse"),e.qZA(),e.TgZ(3,"div",12)(4,"div",13),e._uU(5,"-"),e.qZA(),e.TgZ(6,"div",14)(7,"input",15),e.NdJ("change",function(r){e.CHM(t);const a=e.oxw();return e.KtG(a.updateStepValue(r))}),e.qZA()(),e.TgZ(8,"div",13),e._uU(9,"+"),e.qZA()(),e.BQk()}if(2&o){const t=e.oxw();e.xp6(7),e.Q6J("min",t.minStepValue)("max",t.maxStepValue)("step",t.minStepValue)("value",t.stepValue)}}let Oe=(()=>{class o extends Be.g{constructor(){super(),this.sliderHandleTimeStyle=[{from:0,to:7,font_unicode:"\uf186",color:"#4575b4",stroke:"white",description:"La nuit",brightness:60},{from:7,to:11,font_unicode:"\uf185",color:"#fdae61",stroke:"black",description:"Le matin"},{from:11,to:14,font_unicode:"\uf185",color:"#d73027",stroke:"black",description:"Le milieu de journ\xe9e"},{from:14,to:19,font_unicode:"\uf185",color:"#fdae61",stroke:"black",description:"L'apr\xe8s midi"},{from:19,to:24,font_unicode:"\uf186",color:"#4575b4",stroke:"white",description:"Le soir"}]}ngOnDestroy(){this.setMapTileBrightness()}update(t){super.update(t),this.updateHandleTimelineStyleFromTime(t)}updateHandleTimelineStyleFromTime(t){let i=t.getHours(),r=this.sliderHandleTimeStyle.filter(a=>i>=a.from&&i<a.to)[0];M.Ys("#handle-timeline").style("fill",r.color).style("stroke",r.stroke).style("stroke-width","1px"),this.setMapTileBrightness(i)}setMapTileBrightness(t){M.td_(".ol-layer").style("filter",typeof t<"u"?`brightness(${this.brightnessValuesAtEachHours[t]})`:"unset")}}return o.\u0275fac=function(t){return new(t||o)},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-time-legend"]],features:[e.qOj],decls:18,vars:9,consts:[[1,"d-flex","flex-xl-row","flex-column"],[1,"badge","text-bg-secondary"],[1,"d-flex","flex-row","justify-content-center"],[3,"id"],[1,"d-flex","flex-column","justify-content-center","m-2"],[1,"d-flex","flex-row","justify-content-center","align-items-center"],["id","start-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[3,"icon"],["id","play-button","role","button",1,"btn","btn-dark","mx-2",3,"click"],["id","end-button","role","button",1,"btn","btn-sm","btn-dark",3,"click"],[4,"ngIf"],[1,"mt-3"],[1,"d-flex","flex-row","align-self-center"],[1,"fw-bold"],[1,"px-1"],["id","speed-slider","type","range",1,"form-range",3,"min","max","step","value","change"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"set-section-container")(2,"h6"),e._uU(3,"Barre Temporelle"),e.qZA(),e.TgZ(4,"div",1),e._uU(5),e.ALo(6,"date"),e.qZA(),e.TgZ(7,"div",2),e.O4$(),e._UZ(8,"svg",3),e.qZA()(),e.kcU(),e.TgZ(9,"div",4)(10,"div",5)(11,"a",6),e.NdJ("click",function(){return i.resetTimeLine()}),e._UZ(12,"fa-icon",7),e.qZA(),e.TgZ(13,"a",8),e.NdJ("click",function(){return i.startTimeLine()}),e._uU(14,"Play"),e.qZA(),e.TgZ(15,"a",9),e.NdJ("click",function(){return i.forwardTimeLine()}),e._UZ(16,"fa-icon",7),e.qZA()(),e.YNc(17,Ne,10,4,"ng-container",10),e.qZA()()),2&t&&(e.xp6(5),e.Oqu(e.xi3(6,6,i.currentDate,i.currentDateFormat)),e.xp6(3),e.Q6J("id",i.timeLineId),e.uIk("viewBox","0 10 "+i.width+" "+i.height),e.xp6(4),e.Q6J("icon",i.backwardIcon),e.xp6(4),e.Q6J("icon",i.forwardIcon),e.xp6(1),e.Q6J("ngIf",i.timeLineSpeedSliderEnabled))},dependencies:[I.O5,N.BN,j.d,I.uU],styles:['.ticks{font-weight:700}.track,.track-inset,.track-overlay{stroke-linecap:round}.track{stroke:#000;stroke-opacity:.3;stroke-width:13px}.track-inset{stroke:#dcdcdc;stroke-width:11px}.track-overlay{pointer-events:stroke;stroke-width:50px;stroke:transparent;cursor:pointer}#handle-timeline{fill:#fff;stroke:#000;stroke-opacity:.5;stroke-width:1.25px}svg #trace{stroke:#6c6c6c;stroke-width:4}#play-button{width:90px}circle.preselected{stroke:#000!important;stroke-width:2px!important}#timeline-slider{width:33em}@media (max-width: 576px){#timeline-slider{width:20em}}#speed-slider{transform:rotate(180deg)}.marker-fontawesome{font-family:"Font Awesome 5 Free";text-anchor:middle;dominant-baseline:middle;pointer-events:none}\n'],encapsulation:2}),o})();function ze(o,n){if(1&o){const t=e.EpF();e.TgZ(0,"button",14),e.NdJ("click",function(){e.CHM(t);const r=e.oxw();return e.KtG(r.zoomOnData())}),e._UZ(1,"fa-icon",15),e.qZA()}if(2&o){const t=e.oxw();e.xp6(1),e.Q6J("icon",t.centerIcon)}}function He(o,n){if(1&o){const t=e.EpF();e.ynx(0),e.TgZ(1,"set-button-content",21),e.NdJ("click",function(){const a=e.CHM(t).$implicit,s=e.oxw(2);return e.KtG(s.updateData(a))}),e._uU(2),e.qZA(),e.BQk()}if(2&o){const t=n.$implicit,i=e.oxw(2);e.xp6(1),e.Q6J("classes",i.currentArea===t?"btn-sm btn-warning fw-bold":"btn-sm btn-warning"),e.xp6(1),e.hij("",t.charAt(0).toUpperCase()+t.slice(1)," ")}}function Ye(o,n){if(1&o&&(e.O4$(),e.TgZ(0,"g"),e._UZ(1,"circle"),e.TgZ(2,"text",22),e._uU(3),e.qZA()()),2&o){const t=n.$implicit,i=e.oxw(2);e.xp6(1),e.uIk("r",i.routeTypesLegendData.circleR)("cx",i.routeTypesLegendData.circleCxPos)("cy",t.cy)("fill",t.color)("stroke",t.strokeColor),e.xp6(1),e.uIk("x",i.routeTypesLegendData.textXPos)("y",t.cy)("font-size",i.routeTypesLegendData.fontSize),e.xp6(1),e.hij("",t.label," ")}}function je(o,n){if(1&o){const t=e.EpF();e.TgZ(0,"div",16)(1,"set-section-container")(2,"h6"),e._uU(3,"GTFS"),e.qZA(),e.TgZ(4,"div",17),e.YNc(5,He,3,2,"ng-container",18),e.qZA()(),e.TgZ(6,"set-section-container")(7,"h6"),e._uU(8,"Modes de transport"),e.qZA(),e.O4$(),e.TgZ(9,"svg",19),e.YNc(10,Ye,4,9,"g",18),e.qZA()()(),e.kcU(),e.TgZ(11,"set-section-container")(12,"app-time-legend",20),e.NdJ("currentDateEvent",function(r){e.CHM(t);const a=e.oxw();return e.KtG(a.getCurrentDate(r))}),e.qZA()()}if(2&o){const t=e.oxw();e.xp6(5),e.Q6J("ngForOf",t.availableArea),e.xp6(4),e.uIk("viewBox","0 0 "+t.widthLegendElement+" "+t.heightLegendElement),e.xp6(1),e.Q6J("ngForOf",t.routeTypesLegendData.features),e.xp6(2),e.Q6J("timeLineSpeedSliderEnabled",!0)("startDate",t.startDate)("endDate",t.endDate)("currentDate",t.currentDate)("stepValue",t.currentstepValue)}}const Je=[{path:"",component:(()=>{class o{constructor(t,i,r,a){this.dataService=t,this.mapService=i,this.activatedRoute=r,this.controlerService=a,this.dataCached={},this.centerIcon=Ee.H,this.input_data=[{area:"lyon",default_step_value:4e3,zoom:12,source:"M\xe9tropole de Lyon"},{area:"ter",default_step_value:1500,zoom:6,source:"SNCF"},{area:"toulouse",default_step_value:4e3,zoom:12,source:"Toulouse m\xe9tropole"}],this.widthLegendElement=100,this.heightLegendElement=80,this.heightMoveLegendElement=60,this.routeTypesLegendData={circleR:8,circleCxPos:20,fontSize:"12px",circleStrokeColor:A,circleStrokeWidth:Z,textXPos:35,features:[{dataValue:0,cy:22,label:"Tram",color:H},{dataValue:1,cy:44,label:"M\xe9tro",color:Y},{dataValue:2,cy:66,label:"Train",color:z}]},this.stopPopupDiv=".stopPopup",this.previousArea=null,this.currentArea=this.input_data[1].area,this.currentstepValue=this.input_data[1].default_step_value,this.currentZoomValue=this.input_data[1].zoom,this.currentAttributionValue=this.input_data[1].source,this.currentRouteTypes=[],this.popupWidth=100,this.popupHeight=100,this.zoomEventSubscription=this.mapService.zoomEvent.subscribe(s=>{this.mapService.zoomToExtent(this.gtfsLayer.getSource().getExtent(),this.currentZoomValue)}),this.mapSubscription=this.mapService.map.subscribe(s=>{this.map=s}),this.screenMapBoundSubscription=this.mapService.screenMapBound.subscribe(s=>{this.dataBoundingBox=s[4326],void 0!==this.currentDate&&this.dataService.pullGeoData(this.currentArea,this.currentDate,this.dataBoundingBox)}),this.pullGeoDataToMapSubscription=this.dataService.GeoDataToMap.subscribe(s=>{null!==s&&this.refreshSourceLayer(s),this.previousArea!==this.currentArea&&(this.mapService.sendZoomAction(),this.previousArea=this.currentArea)}),this.pullAvailableRouteTypeSubscription=this.dataService.availableRouteTypes.subscribe(s=>{this.currentRouteTypes=s}),this.pullBoundingBoxDataSubscription=this.dataService.rangeDateData.subscribe(s=>{this.dataBoundingBox=s.DataBounds,this.startDate=this.secsToDate(s.StartDate),this.endDate=this.secsToDate(s.EndDate);const c=new Date;let u=new Date(`${this.startDate.getFullYear()}-${this.startDate.getMonth()+1}-${this.startDate.getDate()} ${c.getHours()}:${c.getMinutes()}:${c.getSeconds()}`);this.currentDate=u<this.startDate?this.startDate:u}),this.pullGeoDataSubscription=this.dataService.GeoData.subscribe(s=>{this.dataService.pullGeoDataToMap(s)}),this.pullAvailableAreasSubscription=this.dataService.availableAreas.subscribe(s=>{this.availableArea=s}),this.dataService.routeLongName.subscribe(s=>{M.Ys(this.stopPopupDiv+" .card-header").html("Ligne : "+s)})}ngOnInit(){this.dataService.pullAvailableAreas(),this.sendResumeSubMenus(),this.mapService.setMapEvent("mapBounds"),this.mapService.changeMapInteractionStatus(!0),this.mapService.getMap(),this.buildGtfsLayer(K),this.updateData(this.currentArea),this.innerWidth=window.innerWidth,this.innerHeight=window.innerHeight}secsToDate(t){return new Date(1e3*t)}getCurrentDate(t){this.currentDate=t,this.dataService.pullGeoData(this.currentArea,this.currentDate,this.dataBoundingBox)}sendResumeSubMenus(){this.controlerService.pullSubMenus([]),this.controlerService.pullTitlePage(this.activatedRoute.snapshot.data.title)}ngOnDestroy(){this.mapService.unsetMapEvent("mapBounds"),this.mapSubscription.unsubscribe(),this.pullGeoDataToMapSubscription.unsubscribe(),this.pullBoundingBoxDataSubscription.unsubscribe(),this.pullGeoDataSubscription.unsubscribe(),this.zoomEventSubscription.unsubscribe(),this.screenMapBoundSubscription.unsubscribe(),this.pullAvailableAreasSubscription.unsubscribe(),this.pullAvailableRouteTypeSubscription.unsubscribe(),this.mapService.removeLayerByName(K),this.mapService.changeMapInteractionStatus(!1),this.mapService.resetMapView()}zoomOnData(){this.mapService.sendZoomAction()}parseTime(t){return new Date(t)}updateData(t){const i=this.input_data.filter(r=>r.area===t);this.currentArea=t,this.dataService.pullRangeDateData(this.currentArea),this.currentstepValue=i[0].default_step_value,this.currentZoomValue=i[0].zoom,this.currentAttributionValue=i[0].source}buildGtfsLayer(t){this.gtfsLayer=new Re({source:new ee.Z({features:[]}),style:he}),this.gtfsLayer.set("name",t),this.map.addLayer(this.gtfsLayer);let i=new Ve.Z({condition:Ie.MJ,multi:!1,layers:[this.gtfsLayer]});const r=M.Ys(this.stopPopupDiv);i.on("select",a=>{const s=a.selected;if(1===a.deselected.length&&(this.mapService.unsetMapEvent("mapCoords"),r.classed("d-none",!r.classed("d-none"))),1===s.length){let u=s[0];this.mapService.setMapEvent("mapCoords"),r.style("z-index","1").classed("d-none",!r.classed("d-none")),r.select(".card-header").style("background-color",function de(o){return"0"===o.get("route_type")?H:"1"===o.get("route_type")?Y:"2"===o.get("route_type")?z:"grey"}(u)),r.select(".mode .value").html(function pe(o){return"0"===o.get("route_type")?"Tramway":"1"===o.get("route_type")?"M\xe9tro":"2"===o.get("route_type")?"Train":"Inconnu"}(u));const p=u.getGeometry().getCoordinates();r.select(".position-x .value").html(p[0]),r.select(".position-y .value").html(p[1]),this.dataService.pullRouteLongName(this.currentArea,u.get("route_id")),this.popupMoving(a.mapBrowserEvent.pixel)}}),this.map.addInteraction(i)}refreshSourceLayer(t){let i=new ee.Z({features:[],attributions:this.currentAttributionValue}),r=[];t.forEach((a,s)=>{let c=new ge.Z({geometry:new me.Z([a.X,a.Y]).transform("EPSG:4326","EPSG:3857"),route_type:String(a.RouteType),route_id:a.RouteId});r.push(c)}),i.addFeatures(r),this.gtfsLayer.setSource(i)}popupMoving(t){M.Ys(this.stopPopupDiv).style("left",()=>t[0]+this.popupWidth+20>this.innerWidth?t[0]-this.popupWidth-15+"px":t[0]+15+"px").style("top",()=>t[1]+this.popupHeight+20>this.innerHeight?t[1]-this.popupHeight-15+"px":t[1]+15+"px").style("display","block")}}return o.\u0275fac=function(t){return new(t||o)(e.Y36(te),e.Y36(Ue.S),e.Y36(O.gz),e.Y36(Ge.L))},o.\u0275cmp=e.Xpm({type:o,selectors:[["app-map-view"]],decls:24,vars:0,consts:[["classes","position-fixed"],["buttonsTemplate",""],["controlersTemplate",""],[1,"stopPopup","card","position-absolute","shadow-lg","rounded","d-none"],[1,"card-header","fw-bold","line-name"],[1,"card-body"],[1,"mode","d-flex","flex-row"],[1,"small","fw-bold","pe-1"],[1,"small","value"],[1,"position","d-flex","flex-row"],[1,"ps-1","d-flex","flex-column","ps-2"],[1,"position-x","d-flex","flex-row"],[1,"small","pe-1"],[1,"position-y","d-flex","flex-row"],["title","Centrer","type","button","checked","","autocomplete","off",1,"btn","btn-sm","btn-warning","mx-1",3,"click"],[1,"",3,"icon"],[1,"d-flex","flex-row","justify-content-around"],[1,"d-flex","flex-xl-row","flex-column"],[4,"ngFor","ngForOf"],["id","routeTypeLegend"],["timelineDateFormat","hour",3,"timeLineSpeedSliderEnabled","startDate","endDate","currentDate","stepValue","currentDateEvent"],[3,"classes","click"],[1,"label"]],template:function(t,i){1&t&&(e.TgZ(0,"set-legend-container",0),e.YNc(1,ze,2,1,"ng-template",null,1,e.W1O),e.YNc(3,je,13,8,"ng-template",null,2,e.W1O),e.qZA(),e.TgZ(5,"div",3),e._UZ(6,"div",4),e.TgZ(7,"div",5)(8,"div",6)(9,"span",7),e._uU(10,"Mode :"),e.qZA(),e._UZ(11,"span",8),e.qZA(),e.TgZ(12,"div",9)(13,"span",7),e._uU(14,"Position :"),e.qZA()(),e.TgZ(15,"div",10)(16,"div",11)(17,"span",12),e._uU(18,"X :"),e.qZA(),e._UZ(19,"span",8),e.qZA(),e.TgZ(20,"div",13)(21,"span",12),e._uU(22,"Y :"),e.qZA(),e._UZ(23,"span",8),e.qZA()()()())},dependencies:[I.sg,N.BN,_e.C,ne.b,j.d,Oe],styles:['.legend-content[_ngcontent-%COMP%]{color:"#FFFFF";background-color:#f5f5f5;box-shadow:0 -5px 20px #00000080}.legend-title[_ngcontent-%COMP%]{color:"#FFFFF";background-color:#f5f5f5}.map-popup[_ngcontent-%COMP%]{position:absolute;visibility:hidden;background-color:#f8f8ff;width:350px}svg[_ngcontent-%COMP%]{width:7em}.label[_ngcontent-%COMP%]{text-anchor:start;dominant-baseline:middle}']}),o})(),data:{title:"GTFS viewer",page:"map-gtfs-viewer"},outlet:"map-gtfs-viewer"}];let $e=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({imports:[O.Bz.forChild(Je),O.Bz]}),o})();var Qe=l(9387),We=l(7157);let Xe=(()=>{class o{}return o.\u0275fac=function(t){return new(t||o)},o.\u0275mod=e.oAB({type:o}),o.\u0275inj=e.cJS({providers:[te],imports:[I.ez,$e,N.uH,Qe.k,We.p,ne.b,j.d]}),o})()}}]);