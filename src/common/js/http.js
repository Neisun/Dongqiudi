// 专门用来配置axios的基础配置
import axios from 'axios'
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 100000
// 配置拦截器
// Add a request interceptor
axios.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function(response) {
    // Do something with response data
    return response;
}, function(error) {
    // Do something with response error
    return Promise.reject(error);
});

//   配置完成之后暴露模块
export default axios