<template>
    <div>
        <!-- 使用element-ui搭建页面整体布局 -->
        <el-container>

            <!-- 侧边栏 -->
            <el-aside width="auto">
                <Aside></Aside>
            </el-aside>
            <!-- 侧边栏 -->

            <el-container>

                <!-- header -->
                <el-header>
                    <Header></Header>
                </el-header>
                <!-- header -->

                <!-- tag -->
                <Tag></Tag>
                <!-- tag -->

                <el-main>
                    <!-- 子路由出口 -->
                    <!-- 路由匹配到的组件将渲染在这里 -->
                    <router-view></router-view>
                </el-main>
                
            </el-container>

        </el-container>
        <!-- 使用element-ui搭建页面整体布局 -->
    </div>
</template>

<script>
// 引入组件
import Aside from '../components/Aside.vue'
import Header from '../components/Header.vue'
import Tag from '../components/Tag.vue'
export default {
    components:{
        Aside,
        Header,
        Tag
    }
}
</script>

<style lang="less" scoped>
    .el-header{
        padding: 0;
    }
</style>