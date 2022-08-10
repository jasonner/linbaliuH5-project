import Vue from 'vue'
import Router from 'vue-router'
import addDetail from "@/view/addDetail.vue";
import recordDetail from "@/view/recordDetail.vue";
import editDetail from "@/view/editDetail.vue";
import recordList from "@/view/recordList.vue";
Vue.use(Router)
export const constantRouterMap =[
    {
        path:'/',
        name:'首页',
        redirect:'/addDetail',
        menuShow:false
    },
    {
        path:'/addDetail',
        name:'首页',
        component: addDetail,
        menuShow:false
    },
    {
        path:'/editDetail',
        name:'重新编辑页',
        component: editDetail,
        menuShow:false
    },
    {
        path:'/recordDetail',
        name:'详情页',
        component: recordDetail,
        menuShow:false
    },
    {
        path:'/recordList',
        name:'金象页',
        component: recordList,
        menuShow:false
    },
    {
        path: "*",
        redirect: "/addDetail"
    }
]

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
 
export default new Router({
    routes: constantRouterMap
})