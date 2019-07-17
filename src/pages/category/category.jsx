//品类管理
import React, { Component } from 'react'
import { Card,
    Button,
    Icon,
    Table,
    message,
    Modal,
    From,
    Input
 } from 'antd'


import LinkButton from '../../components/link-button'
import { reqCategorys,reqAddCategory } from '../../api';
import AddUpdateForm from './add-update-form';





 


export default class Category extends Component {



    state={
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
           render:(address)=> <LinkButton > 操作分类 </LinkButton>,
        },
        
      ]
      
}

//执行异步请求
getCategorys = async ()=>{
    const resuld = await reqCategorys()
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
            //进行自定义表单验证
            this.form.validateFields( async (err, values) => {
                if (!err) {
            //表单验证后获取得到数据
            const {categoryName}=values
             //发送添加数据请求
             const resule =  await  reqAddCategory(categoryName)
             this.setState({showStatus:0})
            //根据返回数据的标识，做不同处理
            if(resule.status===0){
               this.getCategorys() 
               message.success('添加分类成功')
            }else{
                message.error('添加分类失败')
            }
            
         }
      })
           
  }
        //点击取消关闭弹窗
        handleCancel=()=>{
           this.setState({
            showStatus:0
           })
        }



    render() {
       const {categorys,showStatus}=this.state
       
       //添加按钮
       const extra=(
        <Button type='primary' onClick={()=>{this.setState({showStatus:1})}}>
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
              rowKey='_id'
              pagination={{defaultPageSize: 5, showQuickJumper: true}}
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
           <AddUpdateForm  setForm={form=>this.form=form}/>
           
        </Modal>
           </Card>
          
          
         
            
          
          
        )
    }
}
