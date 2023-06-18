import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import user from './mockServeData/user'
import permission from './mockServeData/permission'

// 定义mock请求拦截，get请求可以省略，第二个参数是拦截成功后的处理逻辑
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// 定义用户列表数据请求拦截
Mock.mock('/api/user/add', 'post', user.createUser)
Mock.mock('/api/user/edit', 'post', user.updateUser)
Mock.mock('/api/user/del', 'post', user.deleteUser)
Mock.mock(/api\/user\/getUser/, user.getUserList)

// 定义登录拦截
Mock.mock(/api\/permission\/getMenu/, 'post', permission.getMenu)