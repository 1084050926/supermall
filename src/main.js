import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import fastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false

// 安装toast插件
Vue.use(toast)
// 使用懒加载组件
Vue.use(VueLazyLoad)
// 通过Vue原型创建$bus事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app')

// 处理移动端延迟300毫秒点击

fastClick.attach(document.body)
