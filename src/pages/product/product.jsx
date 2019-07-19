import React, { Component } from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductDetail from './detail'
import ProductAddUpdate from './add-update'
import './product.less'
export default class Product extends Component {
    render() {
        return (
           <Switch>
               {/* 写在前面要加exact={true} 不加就是模糊匹配   如果不加就要放到到最后 */}
               <Route  exact={true} path='/product' component={ProductHome}/>
               <Route  path='/product/detail' component={ProductDetail}/>
               <Route  path='/product/addupdate' component={ProductAddUpdate}/>
              {/* 精准路由 */}
               <Redirect to='/product'/>
           </Switch>
        )
    }
}
