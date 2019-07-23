// 用于创建action函数工厂
import {
  INCREMENT,
  DECERMENT
} from "./action-types"


export const increment=(number)=>({type:INCREMENT,number})
export const decrement=(number)=>({type:DECERMENT,number})


