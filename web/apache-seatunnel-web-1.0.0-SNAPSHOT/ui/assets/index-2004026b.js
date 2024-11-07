import{p as y,e as T,n as E,G as H,v as G,r as R,o as $}from"./index-5e2885e4.js";import{G as D,B as j,i as A,g as U,a as L,b as M,c as F,D as J}from"./gForce-f4cb6a07.js";import{N as V,s as x}from"./node-97f48230.js";import{l as q,_ as K}from"./lodash-11edae60.js";import{u as Q}from"./index-5de39f79.js";import{u as X}from"./common-341af126.js";import Y from"./node-setting-8ed1de72.js";import"./debounce-19376a56.js";import"./_baseMap-d2a29d52.js";import"./get-53588a31.js";import"./sql-57bdd75b.js";import"./Tooltip-5624ecb6.js";import"./Popover-907f9950.js";import"./cssr-7767064c.js";import"./format-length-c9d165c6.js";import"./use-merged-state-d459d80e.js";import"./use-compitable-248ca92d.js";import"./next-frame-once-7035a838.js";import"./SettingOutlined-d17049cc.js";import"./EditOutlined-0243f050.js";import"./PlayCircleOutlined-e103aa1f.js";import"./index-2d941bf7.js";import"./service-d19f0ccd.js";import"./node-model-04f38f3f.js";import"./column-width-config-b963bc25.js";import"./split-modal-885ce1d9.js";import"./FormItem-7f69a4d7.js";import"./Input-1bbd5e95.js";import"./use-locale-ba0171d5.js";import"./Suffix-9f9d022f.js";import"./Form-6e61837b.js";import"./Dropdown-8ccd025e.js";import"./Icon-b461a67a.js";import"./create-bbda4d67.js";import"./DeleteOutlined-099c0ef1.js";import"./CopyOutlined-9b4275f0.js";import"./composables-ca7679f2.js";import"./Space-d49acb7b.js";import"./Grid-7fd51304.js";import"./Empty-dd1b91e9.js";import"./DataTable-bb49b036.js";import"./Checkbox-2d4945a3.js";import"./RadioGroup-92bc79b0.js";import"./Select-94feec49.js";import"./configuration-form-6b272f26.js";import"./use-form-structure-b872a9e7.js";import"./index-4e4366ce.js";import"./Tabs-11369ba4.js";import"./Add-c7f60439.js";import"./throttle-c6377e77.js";const N="dag-node",C="dag-edge",B={circle:{r:4,magnet:!0,stroke:"#C2C8D5",strokeWidth:1,fill:"#fff"}},O={in:{position:"left",attrs:B},out:{position:"right",attrs:B}},Z={attrs:{line:{stroke:"#C2C8D5",strokeWidth:1}}};function ee(){return{inherit:"vue-shape",width:150,height:36,component:{render:()=>y(V)}}}function te(r,e){const t=q.debounce(()=>{var s;if(r.value){const l=r.value.offsetWidth,n=r.value.offsetHeight;(s=e.value)==null||s.resize(l,n)}},200);Q(r,t)}function oe(r,e,t){return new D({container:e,scroller:!0,grid:{size:10,visible:!0},connecting:{router:"manhattan",allowBlank:!1,allowLoop:!1,allowNode:!1,snap:!0,createEdge(){var s;return(s=r.value)==null?void 0:s.createEdge({shape:C})},validateConnection(s){var d,u;const{sourceCell:l,targetCell:n}=s;if((n==null?void 0:n.getData().type)==="source")return!1;if((n==null?void 0:n.getData().type)==="sink")return((d=r.value)==null?void 0:d.getConnectedEdges(n).length)<1;if((n==null?void 0:n.getData().type)==="transform"){const g=l==null?void 0:l.getData(),f=n==null?void 0:n.getData();return g.type==="transform"&&g.connectorType==="Copy"&&f.connectorType==="Copy"?!1:!((u=r.value)==null?void 0:u.getConnectedEdges(n)).some(i=>i.getTargetCellId()===n.id)}return!0}},snapline:!0,minimap:{enabled:!0,width:200,height:120,container:t},selecting:{enabled:!0,rubberband:!1,movable:!0,showNodeSelectionBox:!0,showEdgeSelectionBox:!0}})}const se=r=>typeof r=="string";class ne extends j{constructor(e){super(),this.begin=[0,0],this.preventOverlap=!0,this.preventOverlapPadding=10,this.condense=!1,this.sortBy="degree",this.nodeSize=30,this.nodes=[],this.edges=[],this.width=300,this.height=300,this.row=0,this.col=0,this.cellWidth=0,this.cellHeight=0,this.cellUsed={},this.id2manPos={},this.onLayoutEnd=()=>{},this.updateCfg(e)}getDefaultCfg(){return{begin:[0,0],preventOverlap:!0,preventOverlapPadding:10,condense:!1,rows:void 0,cols:void 0,position:void 0,sortBy:"degree",nodeSize:30}}execute(){const e=this,t=e.nodes,s=e.edges,l=t.length,n=e.begin;if(l===0)return e.onLayoutEnd&&e.onLayoutEnd(),{nodes:t,edges:s};if(l===1)return t[0].x=n[0],t[0].y=n[1],e.onLayoutEnd&&e.onLayoutEnd(),{nodes:t,edges:s};const d=[];t.forEach(o=>{d.push(o)});const u={};if(d.forEach((o,i)=>{u[o.id]=i}),(e.sortBy==="degree"||!se(e.sortBy)||d[0][e.sortBy]===void 0)&&(e.sortBy="degree",A(t[0].degree))){const o=U(d.length,u,s);d.forEach((i,a)=>{i.degree=o[a]})}d.sort((o,i)=>i[e.sortBy]-o[e.sortBy]),!e.width&&typeof window<"u"&&(e.width=window.innerWidth),!e.height&&typeof window<"u"&&(e.height=window.innerHeight);const g=e.rows,f=e.cols!=null?e.cols:e.columns;if(e.cells=l,g!=null&&f!=null?(e.rows=g,e.cols=f):g!=null&&f==null?(e.rows=g,e.cols=Math.ceil(e.cells/e.rows)):g==null&&f!=null?(e.cols=f,e.rows=Math.ceil(e.cells/e.cols)):(e.splits=Math.sqrt(e.cells*e.height/e.width),e.rows=Math.round(e.splits),e.cols=Math.round(e.width/e.height*e.splits)),e.cols*e.rows>e.cells){const o=e.small(),i=e.large();(o-1)*i>=e.cells?e.small(o-1):(i-1)*o>=e.cells&&e.large(i-1)}else for(;e.cols*e.rows<e.cells;){const o=e.small(),i=e.large();(i+1)*o>=e.cells?e.large(i+1):e.small(o+1)}e.cellWidth=e.width/e.cols,e.cellHeight=e.height/e.rows,e.condense&&(e.cellWidth=0,e.cellHeight=0),e.preventOverlap&&d.forEach(o=>{(!o.x||!o.y)&&(o.x=0,o.y=0);let i,a;L(o.size)?(i=o.size[0],a=o.size[1]):M(o.size)?(i=o.size,a=o.size):F(o.size)&&(i=o.size.width,a=o.size.height),(i===void 0||a===void 0)&&(L(e.nodeSize)?(i=e.nodeSize[0],a=e.nodeSize[1]):M(e.nodeSize)?(i=e.nodeSize,a=e.nodeSize):(i=30,a=30));const p=e.preventOverlapPadding,w=i+p,v=a+p;e.cellWidth=Math.max(e.cellWidth,w),e.cellHeight=Math.max(e.cellHeight,v)}),e.cellUsed={},e.row=0,e.col=0,e.id2manPos={};for(let o=0;o<d.length;o++){const i=d[o];let a;if(e.position&&(a=e.position(i)),a&&(a.row!==void 0||a.col!==void 0)){const p={row:a.row,col:a.col};if(p.col===void 0)for(p.col=0;e.used(p.row,p.col);)p.col++;else if(p.row===void 0)for(p.row=0;e.used(p.row,p.col);)p.row++;e.id2manPos[i.id]=p,e.use(p.row,p.col)}e.getPos(i)}return e.onLayoutEnd&&e.onLayoutEnd(),{edges:s,nodes:d}}small(e){const t=this;let s;const l=t.rows||5,n=t.cols||5;return e==null?s=Math.min(l,n):Math.min(l,n)===t.rows?t.rows=e:t.cols=e,s}large(e){const t=this;let s;const l=t.rows||5,n=t.cols||5;return e==null?s=Math.max(l,n):Math.max(l,n)===t.rows?t.rows=e:t.cols=e,s}used(e,t){return this.cellUsed[`c-${e}-${t}`]||!1}use(e,t){const s=this;s.cellUsed[`c-${e}-${t}`]=!0}moveToNextCell(){const e=this,t=e.cols||5;e.col++,e.col>=t&&(e.col=0,e.row++)}getPos(e){const t=this,s=t.begin,l=t.cellWidth,n=t.cellHeight;let d,u;const g=t.id2manPos[e.id];if(g)d=g.col*l+l/2+s[0],u=g.row*n+n/2+s[1];else{for(;t.used(t.row,t.col);)t.moveToNextCell();d=t.col*l+l/2+s[0],u=t.row*n+n/2+s[1],t.use(t.row,t.col),t.moveToNextCell()}e.x=d,e.y=u}getType(){return"grid"}}function re(r,e){const t=X(String(new Date().getTime())),s={id:t,...e,zIndex:1,shape:N,ports:{groups:O,items:W(t,e.node)},data:{type:e.node,unsaved:!0,isError:!1,name:e.label,pluginId:t,connectorType:e.node==="transform"?e.label:""}};r.addNode(s)}function ie(r,e,t){r.addNodes(e.map(s=>({shape:N,node:s.type.toLowerCase(),id:s.pluginId,label:s.name,ports:{groups:O,items:W(s.pluginId,s.type.toLowerCase())},data:{...s,isError:!1,type:s.type.toLowerCase()}}))),r.addEdges(t.map(s=>({shape:C,source:{cell:s.inputPluginId,port:s.inputPluginId+"-out-port"},target:{cell:s.targetPluginId,port:s.targetPluginId+"-in-port"}}))),_(r,"dagre")}function le(r){r.resetCells(r.getCells())}function _(r,e="dagre",t,s){let l=null;const n={nodesep:50,padding:50,ranksep:50,type:e};if(e==="grid"&&(n.cols=t,n.rows=s),!r)return;r.cleanSelection(),n.type==="dagre"?l=new J({type:"dagre",rankdir:"LR",align:"UL",ranksepFunc:o=>{const i=r.getOutgoingEdges(o.id);let a=0;return i&&i.length>0&&i.forEach(p=>{const w=r.findViewByCell(p),v=w==null?void 0:w.findAttr("width",K.get(w,["labelSelectors","0","body"],null)),b=v?+v:0;a=Math.max(a,b)}),n.ranksep+a},nodesep:n.nodesep,controlPoints:!0}):n.type==="grid"&&(l=new ne({type:"grid",preventOverlap:!0,preventOverlapPadding:n.padding,sortBy:"_index",rows:n.rows||void 0,cols:n.cols||void 0,nodeSize:220}));const d=r.toJSON(),u=d.cells.filter(o=>o.shape===N).map(o=>({...o,_index:-o.id})),g=d.cells.filter(o=>o.shape===C),f=l==null?void 0:l.layout({nodes:u,edges:g});r.fromJSON(f)}function W(r,e){return e==="source"?[{id:r+"-out-port",group:"out"}]:e==="sink"?[{id:r+"-in-port",group:"in"}]:e==="transform"?[{id:r+"-out-port",group:"out"},{id:r+"-in-port",group:"in"}]:[]}function ae(r,e){if(!r.getRootNodes().every(o=>o.getData().type==="source")){window.$message.error(e("project.synchronization_definition.start_node_tips"));return}if(!r.getLeafNodes().every(o=>o.getData().type==="sink")){window.$message.error(e("project.synchronization_definition.end_node_tips"));return}if(!r.getNodes().every(o=>!o.getData().unsaved)){window.$message.error(e("project.synchronization_definition.save_node_tips"));return}return{edges:r.getEdges().map(o=>{var i,a;return{inputPluginId:(i=o.getSourceCell())==null?void 0:i.getData().pluginId,targetPluginId:(a=o.getTargetCell())==null?void 0:a.getData().pluginId}})}}const it=T({name:"DagCanvas",emits:["drop"],setup(r,e){const t=E();H("graph",t);const s=E(),l=E(),n=E(),{t:d}=G.useI18n(),u=R({nodeInfo:{type:"source",label:"",pluginId:"",transform:""},show:!1});let g="";const f=c=>{c.preventDefault()},o=c=>{e.emit("drop",c)},i=()=>{t.value=oe(t,l.value,n.value)},a=()=>{D.unregisterNode(N),D.registerNode(N,ee())},p=()=>{D.unregisterEdge(C),D.registerEdge(C,Z)},w=()=>{t.value&&t.value.on("cell:dblclick",({cell:c})=>{var I,P,S,k;if(c.isEdge())return;let h=[];const m=(I=t.value)==null?void 0:I.getIncomingEdges(c);if(m!=null&&m.length){const z=m[0].getSourceNode();h=((P=(z==null?void 0:z.getData()).selectTableFields)==null?void 0:P.tableFields)||[]}u.nodeInfo={...c.getData(),type:c.getData().type.toLowerCase(),sourceFields:h,predecessorsNodeId:((S=t.value)==null?void 0:S.getPredecessors(c)).length>0?(k=t.value)==null?void 0:k.getPredecessors(c)[0].id:""},g=c.id,u.show=!0,t.value.lockScroller()})},v=()=>{u.show=!1},b=c=>{var m;u.show=!1;const h=(m=t.value)==null?void 0:m.getCellById(g);h==null||h.replaceData({...c,unsaved:!1,isError:!1,type:c.type.toLowerCase()}),le(t.value)};return te(s,t),e.expose({addNode:c=>{re(t.value,c)},getGraph:()=>t.value,addNodesAndEdges:(c,h)=>{ie(t.value,c,h)},getSelectedCells:()=>{var c;return(c=t.value)==null?void 0:c.getSelectedCells()},removeCell:c=>{var h;return(h=t.value)==null?void 0:h.removeCell(c)},getDagData:()=>ae(t.value,d),layoutDag:(c,h,m)=>_(t.value,c,h,m)}),$(()=>{i(),a(),p(),w()}),()=>y("div",{ref:s,class:x.container,onDrop:o,onDragenter:f,onDragover:f,onDragleave:f},[y("div",{ref:l,class:x["dag-container"]},null),y("div",{ref:n,class:x.minimap},null),u.nodeInfo.type&&y(Y,{show:u.show,nodeInfo:u.nodeInfo,onCancelModal:v,onConfirmModal:b},null)])}});export{it as DagCanvas};
