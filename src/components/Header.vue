<template>
    <div class="headerContainer">

        <!-- 左侧区域 -->
        <div class="left">

            <!-- 折叠按钮 -->
            <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!-- 折叠按钮 -->   

            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="item in pathList" :key="item.name" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>
            <!-- 面包屑 -->     

        </div>
        <!-- 左侧区域 -->       

        <!-- 右侧区域 -->
        <div class="right">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img src="../assets/bell.jpg" alt="">
                </span>
                <el-dropdown-menu slot="dropdown" >
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
        <!-- 右侧区域 -->

    </div>
</template>

<script>
import Cookie from 'js-cookie'
export default {
    methods:{
        handleMenu(){
            this.$store.commit('CollapseMenu')
        },
        handleCommand(command) {
            if(command === 'logout'){
                // 清除token
                Cookie.remove('token')
                // 清楚menu数据
                Cookie.remove('menu')
                // 跳转回登录页面
                this.$router.push('/login')
            }
      }
    },
    computed:{
        pathList(){
            return this.$store.state.tab.tabList
        }
    }
}
</script>

<style lang="less" scoped>
    .headerContainer{
        // 头部整体区域
        padding: 0 20px;
        background-color: #333;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
            display: flex;
            align-items: center;
            .el-button{
                margin-right: 20px
            }
            span{
                color: #fff;
                font-size: 14px;
                margin-left: 10px;
            }
            /deep/.el-breadcrumb{
                // 面包屑
                .el-breadcrumb__item{
                    .el-breadcrumb__inner{
                        color: #666;
                        font-weight: normal;
                    }
                    &:last-child{
                        .el-breadcrumb__inner{
                            color: #fff;
                        }
                    }
                }
            }
        }
        .el-dropdown{
            // 右侧下拉菜单
            img{
                // 下拉菜单头像区域
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }
        }
    }
</style>