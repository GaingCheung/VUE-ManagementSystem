## 通过vue-cli搭建项目

## 引入完整Element

## vue-router配置
1. 安装vue-router
2. 创建router文件夹，在里面的index进行路由配置
3. 在index里导入Vue和VueRouter，通过vue.use()安装路由功能
4. 创建路由组件，通过import将组件引入进来
5. 定义路由，通过数组routes对组件和路由进行映射
6. 创建router实例，传入routes配置
7. 将router挂载到main.js里的根节点上
8. 最后在App.vue中定义路由出口，将路由匹配到的组件渲染出来
### router的具体配置
由于页面的header和aside固定不变，所以可以使用嵌套路由
把header和aside放在main里作为主路由，再在里面定义不同页面组件作为子路由

## 页面整体布局搭建
通过element-ui中的Container布局容器组件进行页面的整体布局，包括aside, header, main

## 侧边栏的引入
### 创建Aside侧边栏组件
通过NavMenu导航菜单组件实现侧边栏，把侧边栏的数据渲染到页面上
把侧边栏数据分为有子菜单和没有子菜单，然后分别遍历后渲染到页面上
注意：为了后期页面跳转的实现，要为每一个菜单选项绑定一个index属性，表示唯一标志
### Aside侧边栏样式布局实现
### Aside侧边栏点击路由跳转实现
通过$router.push实现跳转
注意：由于router限制不能重复跳转，所以需要对跳转添加容错逻辑（即当前页面路由与要跳转的页面路由不一致的时候才允许跳转）

## header的引入
### 创建header头部组件并进行样式布局
1. header总体分为左右部分实现
2. 其中左侧里的折叠按钮通过Button按钮组件实现，右侧头像退出按钮通过Dropdown下拉菜单组件实现
### 通过vuex实现点击按钮展开折叠左侧aisde
1. 在tabs里定义控制菜单状态的state和控制菜单状态变更的mutation
2. 在header当点击按钮时调用mutation
3. 在aside里调用控制菜单状态的state控制展开折叠
### 完善aside和header样式，使得折叠时候header填满空位、aside标题变为后台
1. 用三元表达式通过看折叠状态决定标题
2. aside宽度改为auto自适应

## 首页home的实现
1. 通过layout布局组件实现内容的左右响应式布局
### 左侧
1. 通过Card 卡片组件实现每个小单元块移入鼠标出现阴影的效果
2. 通过Table 表格组件实现左下行表格数据显示（把表头名称放在对象里通过v-for遍历渲染到表中）
### 右侧
1. 通过card卡片组件实现订单状况
2. 请求后端数据实现折线图、柱状图和饼图（具体请求步骤看下方axios和mock）
#### 通过ECharts实现图表
1. 安装并在home.vue引入echarts
2. 处理数据获得图表的x轴、y轴、图例和具体数据从而画出图表

## 发起axios请求后端数据
### 二次封装axios
1. 创建axios实例对象
2. 添加请求拦截器和响应拦截器
3. 在api/index里封装axios请求函数

## mock模拟后端数据
1. 在mock.js文件里定义mock请求拦截，其中拦截成功后的处理逻辑再另外封装到mockServeData里的home.js中

## 路由跳转和面包屑、tag的实现
1. 通过Breadcrumb 面包屑组件实现面包屑结构，通过tag标签组件实现tag
2. 在store里定义面包屑和tag的相关state和mutation
3. 在aside中点击菜单栏时获取被点击选项数据并传给mutation，在mutation里实行判断是否要往state里添加新数据
4. 面包屑和tag获取state里的数据进行渲染
### tag点击跳转和点击删除详细功能实现
1. 点击跳转直接使用$router.push功能
2. 点击删除时调用写在mutation里的删除功能
3. 实现删除功能后高亮的跳转

## 用户管理页面实现
1. 利用Dialog 对话框组件实现新增的弹窗并利用Form 表单组件实现弹窗内部布局
2. 通过添加rules对象实现表单认证，在确认的提交函数中通过fomr的validate函数验证提交结果
### 用户管理页面具体用户数据实现
1. 在mockServeData里的user.js实现用户数据模拟
2. 在mock.js定义请求拦截
3. 在/api/index.js封装axios请求函数
### 把请求回来的数据进行渲染
1. 通过Table 表格组件实现基本样式（其中性别和操作需要通过自定义模板实现）
2. 对上面的新增弹窗进行复用，使得新增和编辑共用一个弹窗，调用新增和更新接口实现功能
3. 使用 Message Box弹框组件实现删除的消息确认
4. 使用Pagination分页组件实现分页效果
### 实现搜索功能
1. 通过form表单组件实现
2. 创建searchName存储要搜索的名字，在发起axios请求时传入searchName

## 登陆页面和权限管理的实现
1. 通过form表单实现登录页面样式
### 登录权限管理实现
1. 在mock定义登录拦截生成对应token和请求菜单数据，并在/api/index.js中封装axios请求函数
2. 调用axios请求，用cookie存储请求回来的token，成功登陆后cookie中就会存放着该用户的token
3. 设置全局前置守卫，判断token情况实现路由跳转
4. 退出功能实现，清除token，跳转到login
### 菜单权限管理
1. 获取请求回来的菜单数据存入store，把aside里写死的menu数据替换成store里的动态数据
2. 由于store里的数据存在浏览器的内存中，所以刷新页面就不存在了，所以要把menu数据存放在cookie中
3. 对获取到的menu数据遍历动态生成路由
4. 解决刷新白屏问题：由于路由注册是在登录时完成的，但页面刷新时整个vue实例会重新初始化，但没有再次注册路由，所以要在vue实例初始化时调用注册路由事件

用户名：admin / xiaoxiao
密码：admin /   xiaoxiao


## 项目搭建
### 项目模块搭建
全局引入element-ui

### 脚手架搭建配置
通过vue-cli搭建项目脚手架
关闭eslint校验

### 组件初始化
搭建Aside组件
搭建Header组件

### 路由初始化
创建组件，引入组件，把组件和路由形成映射

### vuex初始化
创建store
