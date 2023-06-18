// 二次封装axios
import axios from 'axios'

// 创建axios实例对象
const http = axios.create({
    // 通用请求前缀
    baseURL:'/api',
    timeout: 10000 
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 成功
    return config;
  }, function (error) {
    // 失败
    return Promise.reject(error);
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 成功
    return response;
  }, function (error) {
    // 失败
    return Promise.reject(error);
  });

export default http