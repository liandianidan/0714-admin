//品类管理

import React, { Component } from 'react'
import { Card,
    Button,
    Icon,
    Table,
    message,
    Modal,
 } from 'antd'


import LinkButton from '../../components/link-button'
import { reqCategorys,reqAddCategory, reqUpdateCategory } from '../../api';
import AddUpdateForm from './add-update-form';

export default class Category extends Component {


//定义状态
    state={
        loading:false,
       //定义一个空数据数组
       categorys:[],
       showStatus:0,//0:不显示，1：添加，2：修改 
    }
  //表格描述函数  
  initColumus=()=>{
    this.columns = [
        {
          title: '分类名称',
          dataIndex: 'name',
        },
        {
          title: '操作',
          width:300,
           render:(category)=> <LinkButton  onClick={()=>{
               this.setState({showStatus:2})
               this.category=category  //保存当前分类，其他地方可以读取到
            }}> 操作分类 </LinkButton>,
        },
        
      ]
      
}

//执行异步请求
getCategorys = async ()=>{
    //显示loading
    this.setState({loading:true})
    //发送请求
    const resuld = await reqCategorys()
    //隐藏loading
    this.setState({loading:false})
    //判断数据状态
    if(resuld.status===0){
    //获取数据，数据是个数组
    const categorys = resuld.data
    //更新状态
    this.setState({
        categorys
    })
    }else{
    message.error('获取商品信息失败')
    }
}
        //表格描述，只加载一次，所以写在页面即将被挂载里
        componentWillMount(){
            this.initColumus()
        }    
        //发送请求获取数据
        componentDidMount(){
            this.getCategorys()
        }
        //添加修改数据
        handleOk=  ()=>{
            const {showStatus}=this.state
            //进行自定义表单验证
            this.form.validateFields( async (err, values) => {
            if (!err) {
            //表单验证后获取得到数据
            const {categoryName}=values
            let resule
            if(showStatus===1){
            //发送添加数据请求
             resule =  await  reqAddCategory(categoryName)
            }else{
            //获取Id的值
            const categoryId=this.category._id   
            //发送修改请求
             resule = await reqUpdateCategory({categoryName,categoryId})
            }
            //重新修改初始值
            this.form.resetFields()
             this.setState({showStatus:0})
             const ation = showStatus===1?'添加' :'修改'
            //根据返回数据的标识，做不同处理
            if(resule.status===0){
               this.getCategorys() 
               message.success(ation+'分类成功')
            }else{
                message.error(ation+'分类失败')
            }
            
         }
      })
           
  }
        //点击取消关闭弹窗
        handleCancel=()=>{
          //点击取消时修改初始值  
         this.form.resetFields()
           this.setState({
            showStatus:0
           })
        }



    render() {
       const {loading,categorys,showStatus}=this.state
       //获取更新分类名称
       const category=this.category||{}
       //添加按钮
       const extra=(
           //primary主题颜色
           //点击按钮打开对话框
        <Button type='primary' 
        onClick={()=>{
            //清空category的值
            this.category={}
            this.setState({showStatus:1})
        }}
        
        >
            <Icon type='plus'/>
            添加
        </Button>
    )
        return (
            <Card title="品类管理" extra={extra}>
            <Table
             //表格列的描述
              columns={this.columns}
              //数据数组
              dataSource={categorys}
              //是否展示外边框和列边框
              bordered
              //唯一标识
              rowKey='_id'
              //页码信息  defaultPageSize  每页的条数  showQuickJumper快速跳转页面
              pagination={{defaultPageSize: 5, showQuickJumper: true}}
              loading={loading}
            />

       <Modal
          title={showStatus===1?'添加分类':'修改分类'}
          //标识弹框的状态
          visible={showStatus!=0}
          //点击ok添加/修改数据成功
          onOk={this.handleOk}
          //点击Cancel取消添加/修改数据
          onCancel={this.handleCancel}
          
        >
            {/* 将子组件传递过过来的form对象保存到当前组件上，form可以做两件事，表单验证，获取输入的数据 */}
           <AddUpdateForm  setForm={form=>this.form=form}  categoryName={category.name}/>
           
        </Modal>
           </Card>
          
          
         
            
          
          
        )
    }
}


//页面打开
//显示loading
//发送请求
//隐藏loading
//判断是否拿到数据
//更新状态

//添加
//点击添加按钮监听
//显示对话框
//进行表单验证
//表单验证成功后获取输入的数据
//发送添加数据请求
//关闭对话框
//更新状态
//判断添没添加成功


//修改
//点击监听
//修改对话框状态，打开对话框
//获取点击那一项的初始值
//输入要修改的值进行表单验证
//表单验证成功后发送修改请求
//关闭对话框
//更新状态
//修改成功/修改失败