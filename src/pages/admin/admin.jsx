import React,{Component} from 'react'
import {Redirect,Switch,Route} from 'react-router-dom'
import { Layout } from 'antd'



import memoryUtils from '../../utils/memoryUtils'

import LeftNav from '../../components/left-nav'
import Header from '../../components/header'
import Home from '../home/home'
import Category from '../category/category'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'


const { Footer, Sider, Content } = Layout;



export default class Admin extends Component{
    render(){
        //获取保存的user，如果不存在，直接跳转到登录界面，如果存在直接获取
    //const user =  JSON.parse(localStorage.getItem('user_key')||'{}')
    const user=memoryUtils.user
   if(!user._id){
        //获取路由器上的一个方法Redirect,在render中自动跳转到指定地址
          return   <Redirect to='/login'/>
    }
        return(
            <Layout  style={{height:'100%'}}>
            <Sider style={{color:'red'}}>
                <LeftNav/>
             </Sider>
            <Layout>
              <Header/>
              <Content style={{backgroundColor:'#fff',margin:'20px'}}>
            {/* 写路由组件 */}
            <Switch>
             <Route path='/home' component={Home}/>
             <Route path='/category' component={Category}/>
             <Route path='/product' component={Product}/>
              <Route path='/role' component={Role}/>
              <Route path='/user' component={User}/>
              <Route path='/charts/bar' component={Bar}/>
              <Route path='/charts/line' component={Line}/>
              <Route path='/charts/pie' component={Pie}/>
              <Redirect to='/category'/>
              
              
            </Switch>
           
             </Content>
              <Footer style={{textAlign:'center',color:'#ccc'}}>推荐使用谷歌浏览器，可以获得更佳页面操作</Footer>
            </Layout>
          </Layout>
        )
    }
}