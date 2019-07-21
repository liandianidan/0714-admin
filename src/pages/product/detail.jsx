// //商品详情路由组件
import React, { Component } from 'react'
import {
    Card,
    List,
    Icon,
} from 'antd'
import {Redirect} from 'react-router-dom'
import LinkButton from '../../components/link-button'
import memoryUtils from '../../utils/memoryUtils'
import {BASE_URL} from '../../utils/constUtils'
import {reqCategory} from '../../api/index'
const Item=List.Item
export default class ProductDetail extends Component {
    state={
        categoryName:'',
    }
    getCategory= async (categoryId)=>{
        //发送请求
      const result= await reqCategory(categoryId)
      if(result.status===0){
         const {categoryName} = result.data.name
         this.setState({categoryName}) 
      }
    }
    componentWillMount(){
        //从内存中获取product
        const product=memoryUtils.product
        if(product._id){
            //发送请求函数
            this.getCategory(product.categoryId)
        }
        
    }
    render() {
        const {categoryName}=this.state
        //从内存中获取product
        const product=memoryUtils.product
        //判断product里有没有值或者里面有没有_id的属性，不过没有就进if判断
        if(!product || !product._id){
           return <Redirect to='/product'/>
        }
        const title=(
            <span>
                <LinkButton  onClick={()=>this.props.history.push('/product')}>
                   <Icon type='arrow-left'/>
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            //布局
            <Card  title={title} className="detail">
                <List>
                    <Item>
                        <span className="detail-left">商品名称:</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品描述:</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品价格:</span>
                        <span>{product.price}元</span>
                    </Item>
                    <Item>
                        <span className="detail-left">所属分类:</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="detail-left">商品图片:</span>
                        <span>
                            {/* 根据标签的数组，生成数据的数组 */}
                            {
                              product.imgs.map(img=><img className='detail-img' key={img} src={BASE_URL+img} alt=""/>)  
                            }
                            
                            
                        </span>
                        
                    </Item>
                    <Item>
                        <span className="detail-left">商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                    </Item>
                </List>

            </Card>
        )
    }
}





