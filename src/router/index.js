import Vue from 'vue'
import VueRouter from 'vue-router'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

// 引入路由组件
import Home from '../view/Home'
import User from '../view/User'
import Main from '../view/Main'
import Mall from '../view/Mall'
import PageOne from '../view/PageOne'
import PageTwo from '../view/PageTwo'
import Login from '../view/Login'

// 将路由与组件进行映射
const routes = [
    // 主路由
    {
        path:'/',
        component: Main,
        redirect: '/home',
        name: 'Main',
        children: [
            // 子路由
            // {path: 'home', component: Home},
            // {path: 'user', component: User},
            // {path: 'mall', component: Mall},
            // {path: 'page1', component: PageOne},
            // {path: 'page2', component: PageTwo},
        ]
    },
    // login路由
    {
        path:'/login',
        component: Login,
    }
]

// 创建router实例
const router = new VueRouter({
    routes
})

// 添加全局前置守卫
router.beforeEach((to, from, next) => {
    // 判断token是否存在
    const token = Cookie.get('token')
    if(!token && to.path !== '/login'){
        // token不存在且当前不在登录页面,用户未登录，应该跳转至登录页面
         next({ path:'/login' })
    }else if(token && to.path === '/login'){
        // token存在且当前页面是首页，跳转至首页
        next({ path:'/home' })
    }else{
        next()
    }
  })

// 将router实例对外进行暴露
export default router