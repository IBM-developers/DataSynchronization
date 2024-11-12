import{m as k,p as r,e as D,v as z,n as x,o as j,N as _}from"./index-5e2885e4.js";import{G as v,D as E}from"./gForce-f4cb6a07.js";import{l as M,_ as S}from"./lodash-11edae60.js";import{u as P}from"./index-5de39f79.js";import{a as T,b as L}from"./index-15d582a6.js";import{u as C}from"./common-341af126.js";import{a as $}from"./index-2d941bf7.js";import J from"./node-6e8da2d8.js";import{a as I,N as V}from"./Grid-7fd51304.js";import{N as A}from"./Space-d49acb7b.js";import"./debounce-19376a56.js";import"./_baseMap-d2a29d52.js";import"./get-53588a31.js";import"./service-d19f0ccd.js";import"./SettingOutlined-d17049cc.js";import"./EditOutlined-0243f050.js";import"./PlayCircleOutlined-e103aa1f.js";import"./next-frame-once-7035a838.js";const y="dag-node",w="dag-edge";function G(o,n,c){return new v({container:n,scroller:!0,grid:{size:10,visible:!0},connecting:{allowBlank:!1,allowLoop:!1,createEdge(){var a;return(a=o.value)==null?void 0:a.createEdge({shape:w})}},minimap:{enabled:!0,width:200,height:120,container:c}})}function R(o,n){const c=M.debounce(()=>{var a;if(o.value){const e=o.value.offsetWidth,t=o.value.offsetHeight;(a=n.value)==null||a.resize(e,t)}},200);P(o,c)}const O=!1,X=20;function q(o){o.on("node:change:position",({node:n,options:c})=>{if(c.skipParentHandler||O)return;const a=n.getChildren();a&&a.length&&n.prop("originPosition",n.getPosition());const e=n.getParent();if(e&&e.isNode()){let t=e.prop("originSize");t==null&&(t=e.getSize(),e.prop("originSize",t));let s=e.prop("originPosition");s==null&&(s=e.getPosition(),e.prop("originPosition",s));let l=s.x,i=s.y,f=s.x+t.width,d=s.y+t.height,g=!1;const p=e.getChildren();p&&p.forEach(h=>{const u=h.getBBox().inflate(X),b=u.getCorner();u.x<l&&(l=u.x,g=!0),u.y<i&&(i=u.y,g=!0),b.x>f&&(f=b.x,g=!0),b.y>d&&(d=b.y,g=!0)}),g&&e.prop({position:{x:l,y:i},size:{width:f-l,height:d-i}},{skipParentHandler:!0})}})}function B(){return{attrs:{line:{stroke:"#C2C8D5",strokeWidth:1}}}}const N={failed:{fill:"#ffced7",stroke:"#ffa8b7"},running:{fill:"#ceebff",stroke:"#b0deff"},finished:{fill:"#ceffee",stroke:"#a8ffe0"},canceled:{fill:"#d5d5d5",stroke:"#b6b6b6"}};function H(o,n,c,a){for(const e in n){const t=o.addNode({x:40,y:40,width:360,height:160,zIndex:1,attrs:{body:String(n[e].status.toLowerCase())==="failed"?N.running:N[n[e].status.toLowerCase()]}});t.addTools({name:"button",args:{markup:[{tagName:"text",textContent:`pipeline#${n[e].pipelineId}`,attrs:{fill:"#333333","font-size":14,"text-anchor":"center",stroke:"black"}},{tagName:"text",textContent:`${a("project.synchronization_instance.state")}: ${n[e].status}`,attrs:{fill:"#868686","font-size":12,"text-anchor":"start",x:"7em"}},{tagName:"text",textContent:`${a("project.synchronization_instance.read")} ${n[e].readRowCount}${a("project.synchronization_instance.line")}/${a("project.synchronization_instance.write")} ${n[e].writeRowCount}${a("project.synchronization_instance.line")}`,attrs:{fill:"#868686","font-size":12,"text-anchor":"start",x:"20em"}}],x:0,y:0,offset:{x:0,y:-18}}}),n[e].child.forEach(s=>{t.addChild(o.addNode({id:s.id,shape:y,zIndex:10,data:{name:s.label}}))})}c.forEach(e=>{o.addEdge({shape:w,source:{cell:e.source},target:{cell:e.target},id:e.id})})}const U=(o,n)=>{if(n.children&&n.children.length){const c=n.children;let a=Number.MAX_VALUE,e=0,t=Number.MAX_VALUE,s=0;o.filter(l=>c.includes(l.id)).map(l=>{a=Math.min(a,l.x),e=Math.max(e,l.x),t=Math.min(t,l.y),s=Math.max(s,l.y)}),n.x=a-20,n.y=t-20,n.size={width:e-a+200,height:s-t+80}}},W=o=>{const n={nodesep:50,padding:50,ranksep:30};if(!o)return;o.cleanSelection();const c=new E({type:"dagre",rankdir:"LR",align:"UL",ranksepFunc:i=>{const f=o.getOutgoingEdges(i.id);let d=0;return f&&f.length>0&&f.forEach(g=>{const p=o.findViewByCell(g),h=p==null?void 0:p.findAttr("width",S.get(p,["labelSelectors","0","body"],null)),u=h?+h:0;d=Math.max(d,u)}),n.ranksep+d},nodesep:n.nodesep,controlPoints:!0}),a=o.toJSON(),e=a.cells.filter(i=>i.shape==="rect").map(i=>({...i,_index:-i.id})),t=a.cells.filter(i=>i.shape===y).map(i=>({...i,_index:-i.id})),s=a.cells.filter(i=>i.shape===w),l=c==null?void 0:c.layout({nodes:[...t,...e],edges:s});l.nodes.map(i=>U(t,i)),o.fromJSON(l)};function Y(o){const n=k();return{getJobConfig:async()=>await $(n.params.taskCode),getJobDag:async e=>{const t=await T({jobInstanceId:n.query.jobInstanceId}),s=await L({jobInstanceId:n.query.jobInstanceId});if(Object.keys(t).length<1||s.length<1)return!1;const l={nodes:{},edges:[]};for(const i in t.vertexInfoMap)t.vertexInfoMap[i].id=C(String(new Date().getTime()));for(const i in t.pipelineEdges)t.pipelineEdges[i].forEach(f=>{l.edges.push({id:C(String(new Date().getTime())),source:t.vertexInfoMap[f.inputVertexId].id,target:t.vertexInfoMap[f.targetVertexId].id})});s.forEach(i=>{const f=t.pipelineEdges[i.pipelineId].map(d=>[d.inputVertexId,d.targetVertexId]).flat(2);l.nodes["group-"+i.pipelineId]={...i,child:f.map(d=>({id:t.vertexInfoMap[d].id,label:t.vertexInfoMap[d].connectorType,nodeType:t.vertexInfoMap[d].type,vertexId:t.vertexInfoMap[d].vertexId}))}}),H(e,l.nodes,l.edges,o),W(e)}}}const F="_container_fw2vw_32",K="_minimap_fw2vw_40",m={"right-panel":"_right-panel_fw2vw_17","left-panel":"_left-panel_fw2vw_25","workflow-dag":"_workflow-dag_fw2vw_28",container:F,"dag-container":"_dag-container_fw2vw_36",minimap:K};function Q(){return{inherit:"vue-shape",width:150,height:36,component:{render:()=>r(J)}}}const xe=D({name:"TaskDefinition",setup(){const{t:o}=z.useI18n(),n=x(),c=x(),a=x(),e=x({}),t=x(),{getJobConfig:s,getJobDag:l}=Y(o),i=()=>{t.value=G(t,c.value,a.value)};R(n,t);const f=()=>{v.unregisterNode(y),v.registerNode(y,Q())},d=()=>{v.unregisterEdge(w),v.registerEdge(w,B())},g=()=>{const p=e.value.env,h=[];for(const u in p)h.push({label:String(u),value:p[u]});return h};return j(async()=>{i(),f(),d(),q(t.value),e.value=await s()||{},await l(t.value)}),{t:o,container:n,"dag-container":c,"minimap-container":a,formatData:g,jobConfig:e}},render(){return r(V,{"x-gap":"12"},{default:()=>[r(I,{span:"20"},{default:()=>[r(_,{class:m["left-panel"]},{default:()=>[r("div",{class:m["workflow-dag"]},[r("div",{ref:"container",class:m.container},[r("div",{ref:"dag-container",class:m["dag-container"]},null),r("div",{ref:"minimap-container",class:m.minimap},null)])])]})]}),r(I,{span:"4"},{default:()=>[r(_,{class:m["right-panel"]},{default:()=>[r(A,{vertical:!0},{default:()=>[r("div",null,[r("h4",null,[this.t("project.synchronization_instance.task_name")]),r("p",null,[this.jobConfig.name])]),r("div",null,[r("h4",null,[this.t("project.synchronization_instance.description")]),r("p",null,[this.jobConfig.description])]),r("div",null,[r("h4",null,[this.t("project.synchronization_instance.engine")]),r("p",null,[this.jobConfig.engine])]),this.formatData().map(o=>r("div",null,[r("h4",null,[o.label]),r("p",null,[o.value])]))]})]})]})]})}});export{xe as TaskDefinition};