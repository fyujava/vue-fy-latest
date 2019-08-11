import Vue from 'vue';
import VueResource from 'vue-resource';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import $ from 'jquery'
const global = require('./config/global');


Vue.use(ElementUI);
Vue.use(VueResource);
Vue.config.productionTip = false;

var getUrlStr = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

router.beforeEach((to, from, next) => {

    let name = "validationId";
    var par = getUrlStr(name);
    if (par != null) {
        let params = {validationId: par};
        $.ajax({
            url: global.baseUrl + '/api/userinfo/getUser',//url路径
            type: 'POST', //GET
            async: false, //或false,是否异步
            data: {//参数
                validationId: par
            },
            timeout: 5000, //超时时间
            dataType: 'json',
            success: function (data) {
                let {username, user} = data;
                localStorage.setItem('ms_username', username);
                localStorage.setItem('username', user);
            }
        })
    }

    const role = localStorage.getItem('ms_username');
    if (!role && to.path !== '/login') {
        //next('/login');
        let baseUrl = global.baseUrl;//后端服务地址8000
        let casUrl = "http://login.taoche.com/casserver";//单点登录服务地址
        window.location.href = casUrl + '/login?service=' + baseUrl + '/login/?'

    } else if (to.meta.permission) {
        // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
        role === 'admin' ? next() : next('/403');
    } else {
        // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
        if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
            Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
                confirmButtonText: '确定'
            });
        } else {
            next();
        }
    }

    });

new Vue({
    router,
  // render: h => h(api_list),
}).$mount('#app');
