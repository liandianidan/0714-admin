import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Modal } from 'antd'

import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {formateDate} from '../../utils/dateUtils'
import { reqWeather } from '../../api';
import menuList from '../../config/meunConfig'
import LinkBotton from '../../components/link-button'
 class Header extends Component {
     state={
         time:formateDate(Date.now()),
         dayPictureUrl:'',
         weather:''
     }
   //点击退出按钮实现的功能
    logout=()=>{
        //弹框
         Modal.confirm({
          content: '是否确认退出',
              onOk:()=> {
                console.log('OK');
               //删除文件中的用户名、密码
                storageUtils.removeUser()
                //删除内存中的用户名、密码
                memoryUtils.user={}
                //跳转到登录页面
                this.props.history.replace('/login')
              },
              onCancel() {
                console.log('Cancel');
               
              },
            
          })
    }
    //获取跳转的标题
    getTitle=()=>{
      let title=''
      //获取相对的路径
      const path=this.props.location.pathname
      //遍历数据并把当前遍历路由赋值给每一项的唯一值
      menuList.forEach((item)=>{
        if(item.key===path){
             title=item.title
        }else if(item.children){
            const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                if(cItem){
                    title=cItem.title
                }
        }

      })
      return title
    }
    //发送jsonp获取天气的函数
    getWeather=async()=>{
    const {dayPictureUrl,weather}=await reqWeather('北京')
 
    //更新状态
    this.setState({
        dayPictureUrl,
        weather
    })
    }
    //获取当前时间
    componentDidMount(){
      this.intervalId=setInterval(()=>{
         this.setState({
            time:formateDate(Date.now())
         })
      },1000)
    //发送jsonp请求获取天气数据
      this.getWeather()
    }
    componentWillUnmount(){
       clearInterval(this.intervalId)
    }
    //发送jsonp请求获取天气数据
  
    render() {
        //读取内存中的用户名
        const {username} = memoryUtils.user
       //读取状态里的时间,天气图片,天气信息
       const {time,dayPictureUrl,weather}=this.state
       let title = this.getTitle()
        return (
          //样式
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkBotton onClick={this.logout}>退出</LinkBotton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>
                    <span>{title}</span>
                    </div>
                    <div className='header-bottom-right'>
                    <span>{time}</span>
                    <img src={dayPictureUrl} alt="logo"/>
                    <span>{weather}</span>
                    
                    </div>
                    
                </div>
            </div>
        )
    }
}
export default withRouter(Header)

















