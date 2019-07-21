import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';

const  BASE='';
//请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})
//发送jsonp请求获取天气数据
export  const reqWeather=(city)=>{
  const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//因为返回值需要是promise对象，所以new一个promise实例
  return new Promise((resolve,reject)=>{
    //发送jsonp请求 
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
export const reqCategorys=()=>ajax(BASE+'/manage/category/list')
//发送添加分类请求
export const reqAddCategory=(categoryName)=>ajax.post(BASE+'/manage/category/add',{categoryName})
//发送修改分类请求
export const reqUpdateCategory=({categoryName,categoryId})=>ajax.post(BASE+'/manage/category/update',{
  categoryName,
  categoryId
})

//根据分类ID获取分类
export const reqCategory =(categoryId)=>ajax.get(BASE+'/manage/category/info',{
          params:{
            categoryId
          }
})





//发送获取商品信息的请求接口   pageNum当页数据，pageSize每页显示几条
//get 请求携带的参数   
//可以在路由后面写？拼接   问号后面的参数成为querg参数可以通过配置对象指定
//还可以写配置对象   params参数  携带参数例如：login/admin/123  看似像路由其实是携带参数。
//根据定义路由时有没有加冒号来区别是否是路由login/:a/:b
export const reqPrsducts = (pageNum,pageSize)=>ajax.get(BASE+'manage/product/list',{
         //配置对象
         params:{
          pageNum,
          pageSize
         }
})
// 根据Name/Desc(名称和描述)搜索产品分页列表
export const reqSearchProducts=(
         { pageNum,
          pageSize,
          searchName,
          searchType
         }
)=>ajax.get(BASE+'/manage/product/search',{
 params:{
          pageNum,
          pageSize,
         [searchType]:searchName    //[searchType]:是一个可变的参数，属性productName（名字），productDesc（描述）
        }
})
//上架下架请求接口
export const reqUpdateStatus=(productId,status)=>ajax(BASE+'/manage/product/updateStatus',{
       method:'POST',
       data:{
         productId,
         status
       }
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