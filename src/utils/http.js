import axios from 'axios';
import Qs from "qs";
import {baseUrl,getcookie,safeKeyRefresh} from '@/common/js/index'
import {message as Message} from 'antd';
import {delCookie} from '@/utils/cookies'
const instance = axios.create({
    //超时时间
    timeout: 3000,
    //响应前处理
    transformResponse: (responseData) => {
        // const {error_info} = JSON.parse(responseData);
        // if (error_info.errno !== 1) Message.error(error_info.error);
        return responseData;
    },
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded',
    }
})

//请求拦截器
instance.interceptors.request.use((config) => {
    config.baseURL = baseUrl()
    return config
  }, (err) => {
    Message.error({message: '请求超时!'})
    return Promise.reject('err')
  })
//响应拦截
instance.interceptors.response.use(function (response) {
    const {status, data, statusText} = response;
    if (status === 200) {
        if(JSON.parse(response.data).error_info.errno===102){
            delCookie('login-personal-token')
            location.href = 'http://' + location.hostname+'/login'
        }
        return JSON.parse(response.data);
    } else if (status === 401) {
        //跳转登录
    } else {
        Message.error(`${status}-${statusText}`);
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
export default {
    get: (url, params, option) => {
        return instance.get(url, Object.assign({
            params
        },  option));
    },
    post: ( urls,params) => {
        if(urls!=='/edu/refresh-safe-key'){
            safeKeyRefresh()
        }
        let paramss = Object.assign({},getcookie(),params,{actionUrl:baseUrl()+urls})
        let CrossDomainUrl ="https://api.usercenter.3ttech.cn/agent.php"
        return instance.post(CrossDomainUrl, Qs.stringify(paramss));
    },
    delete: (url, params, option) => {
        return instance.delete(url, Object.assign({
            params
        }, option));
    }
}