// 用于创建action函数工厂
import {
  INCREMENT,
  DECERMENT
} from "./action-types"

//创建增加的工厂函数
export const increment=(number)=>({type:INCREMENT,number})
//创建减少的工厂函数
export const decrement=(number)=>({type:DECERMENT,number})


//创建异步的action
//redux 本身不支持异步
//异步action是一个函数，传一个dispatch函数
//执行异步代码
//分发一个同步action函数
export function  incrementAsync (number) {
        return  dispatch => {
          setTimeout(()=>{
             dispatch(increment(number))
          },1000)
          
        }
}

