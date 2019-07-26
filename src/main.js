import Vue from 'vue'
import api_list from './components/api_list/list.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  render: h => h(api_list),
}).$mount('#app')
