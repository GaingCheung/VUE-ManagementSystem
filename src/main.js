import Vue from 'vue'
import App from './App.vue'

//完整引入Element 
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入router
import router from './router'

// 引入store
import store from './store'
// 引入mock
import './api/mock'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
  created(){
    store.commit('addMenu', router)
  }
}).$mount('#app')
