import React,{Component} from 'react'
 import { Redirect } from 'react-router-dom'
import { Form, Icon, Input, Button,message} from 'antd';
import logo from '../../assets/img/logo.png'
import './login.less'
//分别暴露
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'
import  memoryUtils  from '../../utils/memoryUtils'


 
 class Login extends Component{
  handleSubmit = e => {
    e.preventDefault();
    //取出输入相关的数据
    // const form = this.props.form;
    // const values = form.getFieldsValue
    // const username = form.getFieldValue('username')
    // const password = form.getFieldValue('password')
    // console.log(values,username,password)
  //对表单所有的字段进行统一验证
  this.props.form.validateFields(async (err,{username,password})=>{
     if(!err){
        //  alert(`登录发送ajax请求，username=${username},password=${password}`)
      //调用函数传参，并返回一个promise对象
      const  result= await reqLogin(username,password)
      console.log(result)
        if(result.status===0){
          //获取数据,将user信息保存到local中
          const user=result.data
         // localStorage.setItem('user_key',JSON.stringify(user))
          storageUtils.saveUser(user)
         //保存到内存中
         memoryUtils.user=user
             //跳转页面
             this.props.history.replace('/')
             message.success('登陆成功')
        }else{
           message.error(result.msg)
           
        }
     }else{

     }
  })
  

  }

  //自定义校验方式
  validatePwd = (rule, value, callback) => {
      value=value.trim();
      if(!value){
          callback('密码不能为空')
      }else if(value.length<4){
          callback('密码不能小于4位数')
      }else if(value.length>12){
          callback('密码不能大于12位数')
      }else if(!/^[a-zA-Z0-9]+$/.test(value)){
          callback('密码必须是英文，数组或下划线组成')
      }else{
          callback()
      }
  }
    render(){
      //获取保存的user，如果存在，直接跳转到管理界面，如果不存在直接重新登录
    //const user =  JSON.parse(localStorage.getItem('user_key')||'{}')
    const user = memoryUtils.user
    if(user._id){
         //获取路由器上的一个方法Redirect,在render中自动跳转到指定地址
           return   <Redirect to='/'/>
     }
      //获取到form上的一个方法          
      const { getFieldDecorator } = this.props.form;
        const Item=Form.Item;
        return(
            <div className='login'>
              <div className='login-header'>
              <img src={logo} alt=""/>
                <h1>后台管理系统</h1>
              </div>
              <div className='login-content'>
              <h2>用户登录</h2>
          
          
         <Form onSubmit={this.handleSubmit} className="login-form">
         <Item>
           {getFieldDecorator('username',{
             rules:[
                   {required:true,whitespace:true,message:'用户名不能为空'},
                   {min:4,message:'用户名不能小于4位'},
                   {max:12,message:'用户名不能大于12位'},
                   {pattern:/^[a-zA-Z0-9]+$/,message:'必须是英文，数字，下划线组成'}

           ]})(
            
            <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="用户名"
          />
              
           )}
           </Item>
        <Item>
          {
            getFieldDecorator('password',{
              initialValue:'',
               rules:[
                 {validator:this.validatePwd}
               ]  
            })(
              <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />
            
            )
          }
         
        </Item>
        <Item>
         <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Item>
      </Form>
      </div>
   </div>
  )
      
}
}

//调用form把组件传入，并返回一个新组件。新组件上有form属性
const  WrapperForm = Form.create()(Login);
export default  WrapperForm