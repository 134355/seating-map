import axios from 'axios';
// import env from '../config/env';
import storage from './storage';
import router from '../router';
import iView from 'iview'


let util = {

};
util.title = function(title) {
    title = title ? title + ' - 夜乐' : '夜乐商家后台';
    window.document.title = title;
};

const ajaxUrl = BROWSER_ENV === 'development' ?
    // 'http://apizza.cc/mock/3bec46997c278b6203fe5883230d07c5/v1/':
    'v1/' :
    BROWSER_ENV === 'production' ?
    'v2/' :
    'http://debug.url.com';

var baseAjax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000,
    headers:{
        'X-Token': storage.get('token')||''
    },
    responseType:'json'
});

//每次请求时 更新header里的token
// Object.defineProperty(util, "ajax", {
//     get: function(){
//         baseAjax.defaults.headers['X-Token'] = storage.get('token')||'';
//         return baseAjax;
//     }
// });
util.ajax = baseAjax;
//顶部loadingbar
iView.LoadingBar.config({
    height: 5
});
var loadingBar  = baseAjax.interceptors.request.use(function (config) {
    //每次请求时 更新header里的token
    config.headers['X-Token'] = storage.get('token')||'';
    
    iView.LoadingBar.start();
    return config;
},function(err) {
    return Promise.reject(err);
});

//状态码及错误处理
var errHandler = baseAjax.interceptors.response.use(function (ret) {
    iView.LoadingBar.finish();
    var status = ret.status;
    if(status === 401){
         router.push('/login');
    }
    if(status === 403){
        iView.Message.warning('无操作权限，请联系管理员');
    }
    return ret;
}, function (err) {
    iView.LoadingBar.error();
    iView.Message.error('服务器错误~');
    // 对响应错误做点什么
    console.log(err);
    return Promise.reject(err);
});


export default util;