import Vue from 'vue'
import Router from 'vue-router'

const News = () => import('../pages/news/news.vue')
const Race = () => import('../pages/race/race.vue')
const Video = () => import('../pages/video/video.vue')
const Data = () => import('../pages/data/data.vue')
const Detail = () => import('../pages/detail/detail.vue')

Vue.use(Router)

export default new Router({
  linkActiveClass:'activeChannel',
  routes: [
    {
      path: '/',
      name: 'index',
      component: News
    },
    {
      path: '/news',
      name: 'news',
      component: News
    },
    {
      path: '/race',
      name: 'race',
      component: Race
    },
    {
      path: '/video',
      name: 'video',
      component: Video
    },
    {
      path: '/data',
      name: 'data',
      component: Data
    },
    {
      path:'/detail',
      name:'detail',
      component:Detail
    }
  ]
})
