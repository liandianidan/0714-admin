import React, { Component } from 'react'
import { 
    Card,
    Icon,
    Form,
    Input,
    Button,
    Select
 } from 'antd'
import {reqCategorys} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import LinkButton from '../../components/link-button'
const Item = Form.Item
const Option = Select.Option
 class ProductAddUpdate extends Component {
     //定义状态存储分类信息
     state={
         categorys:[]
     }
     //定义发送请求函数
     getCategorys= async ()=>{
     const result =  await reqCategorys()
     if(result.status===0){
        const categorys=result.data
        //更新状态
        this.setState({
            categorys
        })
     }
     }
    //进行价格统一验证
    validatePrice=(rule,value,callback)=>{
        if(value===''){
            callback()
            callback('商品价格必须指定')
        }else if(value * 1 <=0){
            callback('商品价格必须大于0')
        }else{
            callback()
        }
    }
    // //进行提交的回调函数
        handleSubmit=(event)=>{
            //阻止默认行为
            event.preventDefault()
            //进行表单的统一验证
            this.props.form.validateFields((err,values)=>{
                
                if(!err){
                    const {name, desc, price, categoryId}=values
                    console.log('发送请求',name, desc, price, categoryId)
                }
            })
        }

     //获取修改页面的所有列表值
     componentWillMount(){
         //从内存中获取product
         this.product=memoryUtils.product
         //强制转换成布尔值  ！！product 先把转换成自身对应的布尔值，在进行取反
         this.isUpdate=!!this.product._id

     }  
     //发送获取列表的请求   
     componentDidMount(){
         this.getCategorys()
     }
    render() {
        const {getFieldDecorator}=this.props.form
        const {categorys}=this.state
        //从this中获取
        const {product,isUpdate} = this
        //设置form中Item的所有布局
        const formItemLayout={
            //左侧标题
            labelCol:{span:2},
            //右侧标题
            wrapperCol:{span:8}
        }
        const title=(
            //goBack 退回
            <span>
                <LinkButton onClick={()=>this.props.history.goBack('/product')}>
                    <Icon type='arrow-left'/>
                </LinkButton>
                <span>{isUpdate?'修改商品':'添加商品'}</span>
            </span>
            
        )
        return (
           <Card title={title}>
               <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                  <Item label="商品名称">
                        {getFieldDecorator('name', {
                            //初始值
                            initialValue:product.name,
                            rules: [{ required: true, message: '必须输入商品名称!' }],
                        })(<Input  placeholder='商品名称' />)}
        
                  </Item>
                  <Item label="商品描述">
                        {getFieldDecorator('desc', {
                              //初始值
                             initialValue:product.desc,
                             rules: [
                                { required: true, message: '必须输入商品描述!' }
                              ],
                        })(<Input  placeholder='商品描述' />)}
        
                  </Item>
                  <Item label="商品价格">
                        {getFieldDecorator('price', {
                             //初始值
                             initialValue:product.price,
                            rules: [
                                { required: true, message: '必须输入商品价格!' },
                                //validator  验证器 
                                {validator:this.validatePrice}
                            ],
                            //placeholder 占位符   
                        })(<Input  type='number' placeholder='商品价格' addonAfter='元'/>)}
        
                  </Item>
                  <Item label="所属分类">
                        {getFieldDecorator('categoryId', {
                             //初始值
                             initialValue:product.categoryId,
                             rules: [{ required: true, message: '必须指定分类产品!' }],
                        })(
                            <Select >
                                <Option value=''>未选择</Option>
                                {
                                    categorys.map(item=><Option value={item._id} key={item._id}>{item.name}</Option>)
                                }
                            </Select>
                        )}
        
                  </Item>
                  <Item label="商品图片">
                        <div>商品图片</div>
                  </Item>
                  <Item label="商品详情">
                       <div>商品详情</div>
                  </Item>
                  <Item>
                      {/* button里写 htmlType="submit" 属性代表这是一个提交按钮*/}
                  <Button type="primary" htmlType="submit">
                        提交
                  </Button>
        
                  </Item>
               </Form>
           </Card>
        )
    }
}
export default Form.create()(ProductAddUpdate)