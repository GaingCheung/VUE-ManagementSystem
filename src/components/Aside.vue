<template>
    <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" default-active="1-4-1"
        class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
        <h3>{{ isCollapse ? '后台' : '通用后台管理系统' }}</h3>

        <!-- 遍历没有子菜单选项，生成侧边栏 -->
        <el-menu-item v-for="item in noChildren" :key="item.name" :index="item.name" @click="clickMenu(item)">
            <i :class="`el-icon-${item.icon}`"></i>
            <span slot="title">{{ item.label }}</span>
        </el-menu-item>
        <!-- 遍历没有子菜单选项，生成侧边栏 -->

        <!-- 遍历有子菜单选项 -->
        <el-submenu :index="item.label" v-for="item in hasChildren" :key="item.label">
            <template slot="title">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </template>
            <!-- 子菜单 -->
            <el-menu-item-group v-for="value in item.children" :key="value.name">
                <el-menu-item @click="clickMenu(value)" :index="value.name">{{ value.label }}</el-menu-item>
            </el-menu-item-group>
            <!-- 子菜单 -->
        </el-submenu>
        <!-- 遍历有子菜单选项 -->

    </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}
.el-menu{
    height: 100vh;
    border-right: 0;
    h3{
        font-size: 16px;
        text-align: center;
        color: #fff;
        line-height: 48px;
        font-weight: 400;
    }
}
</style>

<script>
import Cookie from 'js-cookie'
export default {
    data() {
        return {};
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        // 点击菜单实现路由跳转
        clickMenu(item){
            // 当页面路由与要跳转的路由不一致时才实现跳转
            if(this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')){
                this.$router.push(item.path)
                // 调用store里的mutation实现面包屑和tag添加数据功能
                this.$store.commit('selectMenu', item)
            }
        }
    },
    computed:{
        // 没有子菜单 
        noChildren() {
            return this.menuData.filter(item => !item.children)
        },
        // 有子菜单
        hasChildren() {
            return this.menuData.filter(item => item.children)
        },
        // 获取菜单折叠展开状态
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        // 获取不同用户的动态menu
        menuData(){
            // 判断是存在缓存中还是存在store中
            return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu
        }
    }
}
</script>