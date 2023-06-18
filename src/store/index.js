import Vue from 'vue'
import Vuex from 'vuex'
// 引入修改菜单折叠模块
import tab from './tab'

Vue.use(Vuex)

// 创建vuex实例
export default new Vuex.Store({
    // 把store分割为小模块modules
    modules:{
        tab
    }
})