import{v as M,r as D,n as l,i,q as d,e as C,o as N,t as w,p as s,N as f,s as b}from"./index-5e2885e4.js";import{a as _,b as z,c as S,d as F}from"./index-f1112f4d.js";import{g as k}from"./table-13232376.js";import{N as m}from"./Space-d49acb7b.js";import y from"./form-modal-f5e0b51a.js";import P from"./delete-modal-439163d8.js";import{N as T,a as j}from"./DataTable-bb49b036.js";import"./service-d19f0ccd.js";import"./index-0bca5bb9.js";import"./Form-6e61837b.js";import"./FormItem-7f69a4d7.js";import"./format-length-c9d165c6.js";import"./get-53588a31.js";import"./Input-1bbd5e95.js";import"./use-locale-ba0171d5.js";import"./use-merged-state-d459d80e.js";import"./Suffix-9f9d022f.js";import"./Tooltip-5624ecb6.js";import"./Popover-907f9950.js";import"./_baseMap-d2a29d52.js";import"./cssr-7767064c.js";import"./use-compitable-248ca92d.js";import"./next-frame-once-7035a838.js";import"./Icon-b461a67a.js";import"./RadioGroup-92bc79b0.js";import"./Checkbox-2d4945a3.js";import"./Dropdown-8ccd025e.js";import"./create-bbda4d67.js";import"./Select-94feec49.js";import"./Empty-dd1b91e9.js";function q(){const{t}=M.useI18n(),e=D({columns:[],tableData:[],pageNo:l(1),pageSize:l(10),totalPage:l(1),row:{},loading:l(!1),showFormModal:l(!1),showDeleteModal:l(!1),status:l(0)}),u=a=>{a.columns=[...k([{key:"id",title:t("user_manage.id")}]),{title:t("user_manage.username"),key:"name"},{title:t("user_manage.create_time"),key:"createTime"},{title:t("user_manage.update_time"),key:"updateTime"},{title:t("user_manage.operation"),key:"operation",render:o=>i(m,null,{default:()=>[i(d,{text:!0,onClick:()=>p(o)},{default:()=>o.status===1?t("user_manage.enable"):t("user_manage.disable")}),i(d,{text:!0,onClick:()=>g(o)},{default:()=>t("user_manage.edit")}),i(d,{text:!0,onClick:()=>h(o)},{default:()=>t("user_manage.delete")})]})}]},p=a=>{(a.status===1?_:z)(a.id).then(()=>{r({pageSize:e.pageSize,pageNo:e.pageNo})})},g=a=>{e.showFormModal=!0,e.status=1,e.row=a},h=a=>{e.showDeleteModal=!0,e.row=a},c=()=>{e.tableData.length===1&&e.pageNo>1&&--e.pageNo,S(e.row.id).then(()=>{e.showDeleteModal=!1,r({pageSize:e.pageSize,pageNo:e.pageNo})})},r=a=>{e.loading||(e.loading=!0,F({...a}).then(o=>{e.tableData=o.data,e.totalPage=o.data.totalPage,e.loading=!1}))};return{state:e,createColumns:u,getTableData:r,handleConfirmDeleteModal:c}}function v(t){return typeof t=="function"||Object.prototype.toString.call(t)==="[object Object]"&&!b(t)}const me=C({setup(){const{t}=M.useI18n(),{state:e,createColumns:u,getTableData:p,handleConfirmDeleteModal:g}=q(),h=()=>{e.showFormModal=!0,e.status=0,e.row={}},c=()=>{e.showFormModal=!1},r=()=>{e.showFormModal=!1,n()},a=()=>{e.showDeleteModal=!1},o=()=>{e.pageNo=1,n()},n=()=>{p({pageSize:e.pageSize,pageNo:e.pageNo})};return N(()=>{u(e),n()}),{t,...w(e),requestData:n,handleFormModal:h,handleCancelFormModal:c,handleConfirmFormModal:r,handleCancelDeleteModal:a,handleConfirmDeleteModal:g,handlePageSize:o}},render(){return s(m,{vertical:!0},{default:()=>[s(f,{title:this.t("user_manage.user_manage")},{"header-extra":()=>{let t;return s(d,{onClick:this.handleFormModal,type:"success"},v(t=this.t("user_manage.create"))?t:{default:()=>[t]})}}),s(f,null,{default:()=>[s(m,{vertical:!0},{default:()=>[s(T,{loading:this.loading,columns:this.columns,data:this.tableData},null),s(m,{justify:"center"},{default:()=>[s(j,{page:this.pageNo,"onUpdate:page":t=>this.pageNo=t,"page-size":this.pageSize,"onUpdate:page-size":t=>this.pageSize=t,"page-count":this.totalPage,"show-size-picker":!0,"page-sizes":[10,30,50],"show-quick-jumper":!0,onUpdatePage:this.requestData,onUpdatePageSize:this.handlePageSize},null)]})]})]}),s(y,{showModal:this.showFormModal,status:this.status,row:this.row,onCancelModal:this.handleCancelFormModal,onConfirmModal:this.handleConfirmFormModal},null),s(P,{showModal:this.showDeleteModal,row:this.row,onCancelModal:this.handleCancelDeleteModal,onConfirmModal:this.handleConfirmDeleteModal},null)]})}});export{me as default};