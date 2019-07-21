import React,{Component} from 'react'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon } from 'antd'



import logo from '../../assets/img/logo.png'
import menuList from '../../config/meunConfig'
import './index.less'
const { SubMenu } = Menu;
 class LeftNav extends Component{
    
     //第二种用map+递归的方式遍历
    //  getMenuNodes=(menuList)=>{
    //   const path=this.props.location.pathname
    //   return menuList.map((item)=>{
        
    //     if(!item.children){
          
    //       return(
    //             <Menu.Item key={item.key}>
    //             <Link to={item.key}>
    //             <Icon type={item.icon} />
    //               <span>{item.title}</span>
    //             </Link>
    //           </Menu.Item>
    //         )
    //     }else{
    //   if(item.children.find(cItem=>path.indexOf(item.key)===0)){
    //         this.openKey=item.key 
    //   }
    //    return(
    //         <SubMenu
    //         key={item.key}
    //         title={
    //           <span>
    //             <Icon type={item.icon} />
    //             <span>{item.title}</span>
    //           </span>
    //         }
    //       >
    //        {this.getMenuNodes(item.children)}
    //       </SubMenu>
    //       )
    //     }
        
          
    //   })
    //  }
     //第三种用reduce+递归的方式遍历
     getMenuNodes2=(menuList)=>{
        const path=this.props.location.pathname
      return menuList.reduce((pre,item)=>{
            if(!item.children){
              pre.push((
                <Menu.Item key={item.key}>
                 <Link to={item.key}>
                <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
              ))
            }else{
              const cItem=item.children.find(cItem=>path.indexOf(cItem.key)===0)
              if(cItem){
                this.openKey=item.key
              }
             pre.push(( 
                   <SubMenu
                    key={item.key}
                    title={
                        <span>
                           <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                      }
                   >
                   {this.getMenuNodes2(item.children)}
                  </SubMenu>
               )) 
             
           
           } 
           return pre
          },[])
       
     }


     //在render第一次执行之前
componentWillMount(){
     this.menuNodes = this.getMenuNodes2(menuList)
}
       render(){
         //获取key
        let selectKey = this.props.location.pathname
            if (selectKey.indexOf('/product')===0) {
                selectKey = '/product'
            }
           return(
            <div className='left-nav'>
                <Link className='left-nav-header' to="/home">
                    <img src={logo} alt="logo"/>
                    <h1>硅谷后台</h1>
                </Link>
       <Menu 
          //默认选中只根据第一次的更新显示
            //defaultSelectedKeys={['/home']}
            //默认选中
            selectedKeys={[selectKey]}
            //默认展开
            defaultOpenKeys={[this.openKey]}
            //展开方式
            mode="inline"
            //主题颜色
            theme="dark"
           >
          {this.menuNodes}
            
        </Menu>
          </div>
           )
       }
}
export default withRouter(LeftNav)

    {/* 第一种简写方式 */}
            {/* <Menu.Item key="/home">
              <Link to='/home'>
                <Icon type="home" />
                <span>首页</span>
              </Link>
            </Menu.Item>
            
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>商品</span>
                </span>
              }
            >
              <Menu.Item key="/category">
                <Link to='/category'>
                  <Icon type="profile" />
                  <span>品类管理</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="/product">
            <Link to='/product'>
                <Icon type="save" />
                <span>商品管理</span>
              </Link>
            </Menu.Item>
            </SubMenu> */}