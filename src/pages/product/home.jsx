//商品管理
import React, { Component } from 'react'
import {
    Card,
    Select,
    Input,
    Button,
    Icon,
    Table,
    message,
} from 'antd'
import LinkButton from '../../components/link-button'
import { reqPrsducts, reqSearchProducts, reqUpdateStatus } from '../../api'
import {PAGE_NUM} from '../../utils/constUtils'
import memoryUtils from '../../utils/memoryUtils'


const Option=Select.Option
export default class Home extends Component {
    state={
        loading:true,  //loading显示的状态
        products:[],  //商品列表
        total:0 ,  //商品总数
        searchName:'',
        searchType:'productName'
    }
    //商品列表展示的函数
    initColumns=()=>{
        this.columns=[
            {
                title: '商品名称',
                dataIndex: 'name',
              },
              {
                title: '商品描述',
                dataIndex: 'desc',
              },
              {
                title: '价格',
                dataIndex: 'price',
                render:(price)=>'￥'+price
              },
              {
                title: '状态',
                //dataIndex: 'status',
                render:({status,_id})=>{
                     let btnText='下架' 
                     let text='在售'
                     if(status===2){
                        btnText='上架'
                        text='已下架'
                     }
                    return(
                        <span>
                            <Button type='primary' onClick={()=>this.UpdateStatus(_id,status)}>{btnText}</Button>
                            <span>{text}</span>
                        </span>
                    )
                }
              },
              {
              title: '操作',
              render:(product)=>(
                  <span>
                      <LinkButton onClick={()=>{
                                        //在内存中保存product
                                        memoryUtils.product=product 
                                        this.props.history.push('/product/detail')
                                        }}>详情</LinkButton>
                       <LinkButton onClick={() => {
                                        // 在内存中保存product
                                        memoryUtils.product = product
                                        this.props.history.push('/product/addupdate')
                                        }}>修改</LinkButton>
                </span>
              )
            
              },
        ]
    }
    //上架下架切换请求函数
    UpdateStatus= async (productId,status)=>{
        console.log(productId,status)
        //由于传过来的status一开始是没有更新的值，所以要判断一下改变状态
        status=status===1? 2 : 1
        const result= await reqUpdateStatus(productId,status)
        console.log(result)
        //判断回来数据的状态
        if(result.status===0){
            message.success('商品信息更新成功')
           //更新当前页的商品信息
           this.getProducts(this.pageNum)
        }
    }
    //发请求的函数
    getProducts= async (pageNum)=>{
            this.pageNum=pageNum
            //获取状态
            const {searchName,searchType}=this.state   
            //判断searchName有没有值，有值就是发送搜索请求
            let result
        if(searchName){
            //发送搜索请求
            result = await reqSearchProducts({pageNum,pageSize:PAGE_NUM,searchName,searchType})
        }else{
            //发送数据请求
            result=await reqPrsducts(pageNum,PAGE_NUM)
    }
    
    //更新状态修改loading状态
     this.setState({
        loading:false
    })
     //判断是否拿到数据
     if(result.status===0){
            //获取到需要的数据
            const {total,list}=result.data
            //更新状态
            this.setState({
                products:list,
                total,
            })
     }
     
     
    }
    //商品描述
    componentWillMount() {
        this.initColumns()
    }
    //发送请求
    componentDidMount(){
        this.getProducts(1)
    }
    render() {
        const {total,loading,products,searchType,searchName}=this.state
         const title=(
        <span>
        <Select  
        style={{width:200}} 
        value={searchType}
        onChange={(value)=>this.setState({searchType:value})}
         >
          <Option value='productName'>按名称搜索</Option>
          <Option value='productDesc'>按描述搜索</Option>
        </Select>
        <Input 
        placeholder='关键字' 
        style={{width:300,margin:'0 15px'}}
        value={searchName}
        //获取input输入框里的值
        onChange={event=>this.setState({searchName:event.target.value})}
        />
        <Button type='primary' onClick={()=>{this.getProducts(1)}}>
            <Icon type='plus'/>
            搜索
        </Button>
        </span>
     )
        
    
     const extra=(
      <Button type='primary'  onClick={()=>{
          memoryUtils.product = {}
          this.props.history.push('/product/addupdate')
          }}>
          <Icon type='plus'/>
          <span>添加</span>
      </Button>
     )
     
        return (
            <Card title={title} extra={extra} style={{ width: '100%' }}>
             <Table
                //有没有边框
                bordered={true}
                //唯一值，用来标识的，不写浏览器会报错
                rowKey='_id'
                loading={loading}
                //列的状态
                columns={this.columns}
                //获取的数据
                dataSource={products}
                //dafaultPageSize每页显示几天数据
                //showQuickJumper快速跳转页码
                //onChange 当跳转到下一页时，发请求获取下一页展示的信息
                pagination={{total,defaultPageSize:PAGE_NUM,showQuickJumper:true,onChange:this.getProducts}}
                current = {this.pageNum}
           />,
          </Card>
        )
    }
}
//定义状态
//定义导商品描述数组
//在状态里定义商品列表
//定义请求接口
//发送请求
//获取第一页显示
//取出数据
//更新状态




