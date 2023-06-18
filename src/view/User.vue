<template>
  <div class="user">

    <div class="commonHeader">

      <!-- 新增按钮 -->
      <el-button type="primary" @click="addHandle">+ 新增</el-button>
      <!-- 新增按钮 -->

      <!-- 搜索区域 -->
      <el-form :inline="true" :model="searchName" class="demo-form-inline">
        <el-form-item >
          <el-input v-model="searchName.name" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 搜索区域 -->
    
      <!-- 弹窗 -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="45%" :before-close="handleClose">
    
        <!-- 用户表单填写表单 -->
        <el-form ref="form" :model="form" label-width="80px" :inline="true" :rules="rules">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model="form.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.birth" value-format="yyyy-MM-DD"></el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
          </el-form-item>
        </el-form>
        <!-- 用户表单填写表单 -->
    
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </span>

      </el-dialog>
      <!-- 弹窗 -->

    </div>

    <div class="commonTable">
      <!-- 用户数据表格 -->
      <el-table :data="tableData" style="width: 100%" height="90%" stripe="true">
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sex === 1? '男': '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期">
        </el-table-column>
        <el-table-column prop="addr" label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户数据表格 -->
    
      <!-- 分页 -->
      <el-pagination layout="prev, pager, next" :total="dataNumber" @current-change="handleChangePage">
      </el-pagination>
      <!-- 分页 -->
    </div>

  </div>
</template>

<script>
// 导入获取数据api接口
import { getUser, createUser, updateUser, deleteUser } from '../api/index'
export default {
  data() {
      return {
        // 控制弹窗是否可见
        dialogVisible: false,
        // 表单数据
        form: {
          name: '',
          age: '',
          sex: '',
          birth: '',
          addr: ''
        },
        // 用于验证表单填写
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ],
          sex: [
            { required: true, message: '请选择性别', trigger: 'change' }
          ],
          birth: [
            { required: true, message: '请选择出生日期', trigger: 'change' }
          ],
          addr: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        },
        // 用户数据表格
        tableData:[],
        // 用于标记弹窗是由什么按钮触发的，0表示新增的弹窗，1表示编辑的弹窗
        modalType: 0,
        // 用于存储数据总条数
        dataNumber: 0,
        // 用于传递当前页码给getUser
        pageData:{
          page: 1,
          limit: 10
        },
        // 搜索名字
        searchName: {
          name:''
        }
      }
    },
  methods:{
    // 提交表单时验证表填写是否正确决定是否关闭弹窗
    submit(){
        this.$refs.form.validate((valid) => {

          // valid返回表单验证结果，通过则为true，否则为false
          if(valid){
            // 判断是编辑弹窗还是新增弹窗
            if(this.modalType === 0){
              // 新增弹窗
              createUser(this.form).then(() => {
                // 重新获取列表数据
                this.getList()
              })
            }else{
              // 编辑弹窗
              updateUser(this.form).then( () => {
                this.getList()
              })
            }
            // 关闭弹窗
            this.dialogVisible = false
            // 清空弹窗数据
            this.$refs.form.resetFields()
          }
        })
    },
    // 点击关闭按钮时触发该函数用于清除表单数据
    handleClose(){
      this.dialogVisible = false
      this.$refs.form.resetFields()
    },
    // 用户数据表格的编辑操作
    handleEdit(row){
      // 跳出弹窗
      this.dialogVisible = true
      this.modalType = 1
      // 弹窗内容回显，用深拷贝复制，否则会直接修改源数据
      this.form = JSON.parse(JSON.stringify(row))
    },
    // 用户数据表格的删除操作
    handleDelete(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteUser({ id:row.id }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 封装获取列表数据函数
    getList(){
      getUser({ params: {...this.searchName, ...this.pageData} }).then(({ data }) => {
        this.tableData = data.list
        this.dataNumber = data.count || 0
    })
    },
    // 点击新增按钮跳出新增弹窗
    addHandle(){
      this.dialogVisible = true
      this.modalType = 0
    },
    // 点击页码获取当前页码
    handleChangePage(val){
      this.pageData.page = val
      this.getList()
    },
    // 名字查询事件
    onSubmit(){
      this.getList()
    }
  },
  mounted() {
    // 获取用户表格数据
    this.getList()
  }
}
</script>

<style lang="less" scoped>
  .user{
    height: 90%;
    .commonHeader{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .commonTable{
      position: relative;
      height: calc(100% - 62px);
      .el-pagination{
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }
</style>