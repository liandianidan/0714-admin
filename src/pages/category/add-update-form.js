import React, { Component } from 'react'
import { Form,Input } from 'antd'
import propTypes from 'prop-types'
//from内部组件
const Item=Form.Item

 class AddUpdateForm extends Component {
   //声明接收属性的类型
     static propTypes={
         setForm:propTypes.func.isRequired,
         categoryName:propTypes.string
     }
     //将当前子组件的form对象通过函数传给父组件
     componentWillMount(){
          this.props.setForm(this.props.form)

     }
    render() {
        //在小写form身上有个getFieldDecorator函数 ，接收参数标识名称，和配置对象 
        const {getFieldDecorator}=this.props.form
        const {categoryName} =this.props
        return (
            <Form>
                <Item>
                    {
                      getFieldDecorator('categoryName',{

                          initialValue:categoryName||'',
                          //表单验证
                          rules:[
                              {required:true,message:'分类名必须填写'}
                          ]
                      })(
                        <Input type='text' placeholder='请输入品类'/>
                      )  
                    }
                   
                </Item>
            </Form>
        )
    }
}
//创建一个from组件并把组件传给他，组件就有了from组件有的属性了
export default Form.create()(AddUpdateForm)
