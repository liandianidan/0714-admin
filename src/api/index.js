import ajax from './ajax'


const  BASE='';
//请求登录
export const reqLogin = (username, password) =>  ajax.post(BASE + '/login', {username, password})






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