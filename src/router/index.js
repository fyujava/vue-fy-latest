import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../components/api_list/list.vue'], resolve),
        meta: {title: 'ttttt'}
    },
    {
      path: '/login',
      component: resolve => require(['../components/api_list/list.vue'], resolve),
        meta: {title: 'indexxxxx'}
    },
    // {
    //   path: '/login',
    //   component: resolve => require(['../components/page/Login.vue'], resolve)
    // },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

