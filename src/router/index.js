// 路由
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import titles from './titles'
import native from './../common/native.js'

// 首页
const Home = () => import('@/pages/Home')
// 平台详情页
const PlatformDetail = () => import('@/pages/platform/PlatformDetail')
// 平台简介页
const PlatformSummary = () => import('./../pages/platform/platformSummary.vue')
//风控简介页
const RiskController = () => import('./../pages/platform/riskController.vue')
// 晒单
const Share = () => import('./../pages/share.vue')
// 返现
const MyCashBack = () => import('@/pages/cashBack/myCashBack.vue')
// 返现详情页
const CashBackDetail = () => import('@/pages/cashBack/cashBackDetail.vue')
// 我的晒单页
const MyShare = () => import('@/pages/share/myShare.vue')
// 说明页
const Msg = () => import('@/pages/Msg')
// 投资引导页
const InvestGuide = () => import('./../pages/investGuide.vue')

let router  = new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },{
      path:'/platformDetail',
      name:"platformDetail",
      component:PlatformDetail
    },{
      path:'/platform/platformSummary',
      name:'platformSummary',
      component:PlatformSummary
    },{
      path:'/platform/riskController',
      name:'riskController',
      component:RiskController
    },{
      path:'/share',
      name:'share',
      component:Share
    },{
      path:'/myShare',
      name:'myShare',
      component:MyShare
    },{
      path:'/msg/:id',
      name:'msg',
      component:Msg
    },{
      path:'/postDetail',
      name:'myCashBack',
      component:MyCashBack
    },{
      path:'/cashBack/cashBackDetail',
      name:'cashBackDetail',
      component:CashBackDetail
    },{
      path:'/investGuide',
      name:'investGuide',
      component:InvestGuide
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

router.beforeResolve((to,from,next)=>{
  comm.setTitle(titles[to.name])
  next()
})

router.afterEach((to,from) => {
  if(native.isApp){
    native.action('removeLocalSharedBtn')
  }
  if (window._hmt) {
    _hmt.push(['_trackPageview', to.path]);
  }
})

export default router

