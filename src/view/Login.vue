<template>

    <div class="login">

    <!-- 登录界面表单 -->
    <el-form ref="form" label-width="70px" :model="form" :rules="rules" :inline="true">
        <h3 class="title">系统登录</h3>
        <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
    <!-- 登录界面表单 -->

    </div>
</template>

<script>
import Mock from 'mockjs'
import Cookie from 'js-cookie' 
import { getMenu } from '../api'
export default {
    data(){
        return{ 
            // 用户登录表单数据
            form: {
                username: '',
                password: ''
            },
            // 验证用户填写表单
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur'}
                ]
            }
        }
    },
    methods:{
        // 提交登录函数
        onSubmit(){
            // 校验表格数据
            this.$refs.form.validate( (valid) => {
                if(valid){
                    // 校验通过，传入表单数据
                    getMenu(this.form).then( ({ data }) => {
                        // 判断输入密码是否正确
                        if(data.code === 20000){
                            // 输入密码正确,将token信息存入cookie中
                            Cookie.set('token', data.data.token)
                            // 获取不同用户的menu数据存入store中
                            this.$store.commit('setMenu', data.data.menu)
                            // 将router传递到store中进行动态渲染
                            this.$store.commit('addMenu', this.$router)
                            // 跳转至首页
                            this.$router.push('/home')
                        }else{
                            this.$message.error(data.data.message);
                        }
                    })
                }
            } )
        }
    }
}
</script>

<style lang="less" scoped>
    .el-form{
        width: 350px;
        border: 1px solid #eaeaea;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 15px;
        box-shadow: 0 0 25px #cac6c6;
        box-sizing: border-box;
        .title{
            margin-bottom: 40px;
            text-align: center;
            color: #505458;
        }
        .el-input{
            width: 198px;
        }
        .el-button{
            margin-left: 102px;
            margin-top: 10px;
        }
    }
</style>