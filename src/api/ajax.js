import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
//在发请求之前拦截，并把post请求的json对象转换为urlencoded形式
axios.interceptors.request.use(function(config){
    //获取config里的两个参数,请求方式和请求参数
    const {method,data} = config
  
    //判断是否是post的请求方式，数据是否是对象形式
    if(method.toLowerCase() ==='post' && typeof data==='object'){
        //把json对象转换为urlencoded形式的编码，并赋值给config，发送请求出去
          config.data=qs.stringify(data)
       
    }
    return config
    
})

//在请求返回之后拦截请求，并把错误信息拦截下来
axios.interceptors.response.use(function(response){
   
     return response.data
},function(error){
    message.error('请求出错 ' + error.message)
     return new  Promise(()=>{})
})
export default  axios;