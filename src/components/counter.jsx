// 应用根组件
import React,{Component} from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import {increment,decrement} from '../redux/actions'

//UI组件，只负责显示页面，没有任何逻辑
 class Counter extends Component {
     //声明
     static propTypes = {
        store: PropTypes.object.isRequired
      }
    
      increment = () => {
        const number = this.refs.numberSelect.value * 1
        this.props.store.dispatch(increment(number))
      }
  
      decrement=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
        //更新状态
        this.props.store.dispatch(decrement(number))
     }
    


     incrementIfOdd=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
        const count =this.props.store.getState()
      
        if(count%2===1){
            //更新状态
            this.props.store.dispatch(increment(number))
        }
       
     }
     incrementAsync=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
       
        setTimeout(()=>{
            //更新状态
            this.props.store.dispatch(increment(number))
        },1000)
     }
    render(){
        const count = this.props.store.getState()
        return(
            <div>
                <p>当前数字为{count}</p>
                <select style={{marginLeft:30}} ref="numberSelect">
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                </select>
                &nbsp;
                <Button type='primary' onClick={this.increment}>+</Button> &nbsp;
                <Button type='primary' onClick={this.decrement}>-</Button> &nbsp;
                <Button type='primary' onClick={this.incrementIfOdd}>increment if odd</Button> &nbsp;
                <Button type='primary' onClick={this.incrementAsync}>increment async</Button>
            </div>
            
        )
    }

}
export default Counter
