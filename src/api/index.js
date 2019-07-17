import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

const  BASE='';
//请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})
//发送jsonp请求获取天气数据
export  const reqWeather=(city)=>{
  const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`

  return new Promise((resolve,reject)=>{
     jsonp(url,{},(error,data)=>{
       if(!error && data.error===0){
           const {dayPictureUrl,weather} = data.results[0].weather_data[0]
           
           resolve({dayPictureUrl,weather})
       }else{
           message.error('获取天气信息失败')
       }
     })
  
})
}
//发送GET请求获取品类分类数据
export const reqCategorys=()=>ajax.get(BASE+'manage/category/list')
//发送添加分类请求
export const reqAddCategory=(categoryName)=>ajax.post(BASE+'/manage/category/add',{categoryName})
//发送修改分类请求
export const reqUpdateCategory=(categoryName,categoryId)=>ajax.post(BASE+'/manage/category/update',{
  categoryName,
  categoryId
})

// export function reqLogin (username,password){
//    return  ajax ({
//        method:'post',
//        url:BASE+'/',
//        data:{
//            username,
//            password
//        }
//    })
// }


// //模拟接收请求
// const use='admin'
// const pas='admin'
// resLogin(use,pas).then((result)=>{
//     console.log('成功了'+result)
// },(error)=>{
//     console.log('失败了'+error.message)
// })