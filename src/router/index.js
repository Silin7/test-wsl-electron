import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/homePage.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'homePage', component: homePage }, 
  { path: "/404", name: "404", component: () => import('@/views/notFound/404.vue') },
  { path: '/homePage', name: 'homePage', component: () => import('@/views/homePage.vue') },
  // 开始点名
  { path: '/beginsPage', name: 'beginsPage', component: () => import('@/views/rollCallBegins/beginsPage.vue') },
  { path: '/inputInformation', name: 'inputInformation', component: () => import('@/views/studentInformation/inputInformation.vue') },
  // 重定向404，此处需特别注意置于最底部 
  { path: "*", redirect: "/404" }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
