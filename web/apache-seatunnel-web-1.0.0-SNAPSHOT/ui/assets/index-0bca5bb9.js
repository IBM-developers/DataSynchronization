import{e as c,v as f,p as t,N as d,bF as m,q as s,y as u}from"./index-5e2885e4.js";import{N as p}from"./Space-d49acb7b.js";const y={show:{type:Boolean,default:!1},title:{type:String,required:!0},cancelText:{type:String},cancelShow:{type:Boolean,default:!0},confirmText:{type:String},confirmClassName:{type:String,default:""},cancelClassName:{type:String,default:""},confirmDisabled:{type:Boolean,default:!1},confirmLoading:{type:Boolean,default:!1}},S=c({name:"Modal",props:y,emits:["cancel","confirm"],setup(a,e){const{t:o}=f.useI18n();return{t:o,onCancel:()=>{e.emit("cancel")},onConfirm:()=>{e.emit("confirm")}}},render(){const{$slots:a,t:e,onCancel:o,onConfirm:n,confirmDisabled:l,confirmLoading:i}=this;return t(u,{show:this.show,"onUpdate:show":r=>this.show=r,"mask-closable":!1,style:{width:"600px"}},{default:()=>[t(d,{title:this.title,contentStyle:{overflowY:"auto"}},{default:()=>m(a,"default"),footer:()=>t(p,{justify:"end"},{default:()=>[this.cancelShow&&t(s,{quaternary:!0,size:"small",onClick:o},{default:()=>[this.cancelText||e("modal.cancel")]}),t(s,{size:"small",onClick:n,disabled:l,loading:i,type:"primary"},{default:()=>[this.confirmText||e("modal.confirm")]})]})})]})}});export{S as M};