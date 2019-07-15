import React,{Component} from 'react'
import { Form, Icon, Input, Button} from 'antd';
import logo from './img/logo.png'
 import './login.less'

export default class Login extends Component{
    render(){
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
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
        </Item>
        <Item>
         <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
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