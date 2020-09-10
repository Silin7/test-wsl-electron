import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/styleSheet/index.scss'
import "../src/styleSheet/animate/animate.min.css"

// Vue.prototype.$calssInfo = calssInfo


Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
