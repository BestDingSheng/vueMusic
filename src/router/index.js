import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Singer from '@/components/Singer'
import banner from '@/components/banner'
import Body from '@/components/Body'

import raking from '@/components/raking'
import search from '@/components/search'
import TopList from '@/components/toplist.vue'
// import playinfo from '@/componets/playinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: '首页',
      component: Body,
      mate: { keepAlive: true }
    },
    {path:'/',
      redirect:'/home',
      mate: { keepAlive: true }
    },
    {
      path:'/raking',
      name:'排行榜',
      component:raking,
      mate: { keepAlive: false }
    },
    {
      path:'/search',
      name:'sousuop',
      component:search,
      mate: { keepAlive: false }
    },
    {name:'toplist',
      path:'/toplist/:topid',
      component:TopList,
      mate: { keepAlive: false }
    }


  ]
})
