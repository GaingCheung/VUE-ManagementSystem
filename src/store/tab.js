// 让menu数据持久化保存，引入cookie来做缓存
import Cookie from 'js-cookie'
export default {
    mutations:{
        // 修改菜单isCollapse
        CollapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        // 更新面包屑数据
        selectMenu(state, val){
            // 判断添加数据是否为首页，如果是首页则不添加新数据
            if(val.name !== 'home'){
                //判断存放tab的数组里是否存在新获取的数据，如果存在item.name === val.name会返回存在的索引，不存在则返回-1
                const index = state.tabList.findIndex(item => item.name === val.name)
                //不存在
                if(index === -1){
                    state.tabList.push(val)
                }
            }
        },
        //通过tag删除页面
        closeTag(state, item){
            const index = state.tabList.findIndex( val => val.name === item.name)
            state.tabList.splice(index, 1)
        },
        // 设置menu数据
        setMenu(state, val){
            state.menu = val
            // cookie的数据必须是字符串，要进行转换
            Cookie.set('menu', JSON.stringify(val))
        },
        // 根据menu数据动态注册路由
        addMenu(state, router){
            if(!Cookie.get('menu')) return
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            // 对路由进行动态渲染
            const menuArray = []
            menu.forEach( item => {
                // 判断是否有子菜单
                if(item.children){
                    // 如果有子菜单，则对它添加component
                    item.children = item.children.map( val => {
                        val.component = () => import(`../view/${val.url}`)
                        return val
                    } )
                    // 把子菜单放进menuArray里
                    menuArray.push(...item.children)
                }else{
                    // 没有子菜单
                    item.component = () => import(`../view/${item.url}`)
                    menuArray.push(item)
                }
            })
            // 动态添加路由
            menuArray.forEach(item => {
            router.addRoute('Main', item)
            })
        }
    },
    state:{
        //用于控制菜单折叠
        isCollapse: false, 
        //面包屑数据
        tabList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 's-home',
                url: 'Home/Home'
            }
        ],
        // 不同用户的menu数据
        menu: []
    }
}