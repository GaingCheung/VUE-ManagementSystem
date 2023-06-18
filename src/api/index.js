import http from '../utils/request'

// 请求首页数据
export const getData = () => {
    return http.get('/home/getData')
}
// 请求获取users页用户数据
export const getUser = (params) => {
    console.log(params)
    // 返回用户列表
    return http.get('/user/getUser', params)
}
export const createUser = (data) => {
    return http.post('/user/add', data)
}
export const updateUser = (data) => {
    return http.post('/user/edit', data)
}
export const deleteUser = (data) => {
    return http.post('/user/del', data)
}
export const getMenu = (data) => {
    return http.post('permission/getMenu', data)
}
