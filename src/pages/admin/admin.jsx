import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
export default class Admin extends Component{
    render(){
        //获取保存的user，如果不存在，直接跳转到登录界面，如果存在直接获取
    //const user =  JSON.parse(localStorage.getItem('user_key')||'{}')
    const user=memoryUtils.user
    console.log(user)
   if(!user._id){
        //获取路由器上的一个方法Redirect,在render中自动跳转到指定地址
          return   <Redirect to='/login'/>
    }
        return(
            <h2>Admin,{user.username}</h2>
        )
    }
}