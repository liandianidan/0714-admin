// // 用于管理数据



import {INCREMENT,DECERMENT} from './action-types'
//reducer真正管理状态数据的函数。根据老的状态，和action标记，更新新的状态
export default function Counter(state=0,action){
     //用switch  case语句进行对比
    switch (action.type) {
        case INCREMENT:
            return state+action.number ; 
        case DECERMENT:
            return state-action.number ;       
      
        default:
            return state 
      }

}

