// // redux的核心库，用来管理start和reducer
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducer from './reducer'
import {composeWithDevTools} from 'redux-devtools-extension'
//applyMiddleware 异步中间件，thunk  支持异步
//composeWithDevTools  调试工具
//创建一个store对象
// const store= createStore(reducer)
//  export default store
//reducer  
export default  createStore(reducer,composeWithDevTools(applyMiddleware(thunk)))







