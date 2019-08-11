import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);


export default new Router({
    routes:[
        {
            path: '/',
            component: resolve => require(['../components/api_list/list.vue'], resolve)
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve),
            meta: {title: '404'}
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve),
            meta: {title: '403'}
        }

    ]

})

// const router = new Router({
//     routes:[
//         {
//           path: '/404',
//           component: resolve => require(['../components/page/404.vue'], resolve),
//           meta: {title: '404'}
//         },
//         {
//           path: '/403',
//           component: resolve => require(['../components/page/403.vue'], resolve),
//           meta: {title: '403'}
//         }
//     ]
// })