import React,{Component} from 'react'
import { Select,Button } from 'antd';


export default  class App extends Component {

    state={
        count:1
    }
    // increment=()=>{
    //    //先获取到option的值
    //    const number=this.refs.numberSelect.value*1
    //    //更新状态
    //    this.setState({
    //        count:this.state.count+number
    //    })
    // }
    increment = () => {
        const number = this.refs.numberSelect.value * 1
        console.log(number)
        this.setState({
          count: this.state.count + number
        })
      }
    decrement=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
        //更新状态
        this.setState({
            count:this.state.count-number
        })
     }
     incrementIfOdd=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
        const count =this.state.count
        if(count%2===1){
            //更新状态
            this.setState({
                count:count+number
            })
        }
       
     }
     incrementAsync=()=>{
        //先获取到option的值
        const number=this.refs.numberSelect.value*1
       
        setTimeout(()=>{
            //更新状态
            this.setState({
                count:this.state.count+number
            })
        },1000)
        
       
     }

    render(){
        const {count}=this.state
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