import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
import Login  from './pages/login/login'
import Admin from './pages/admin/admin'

export default  class App extends Component {
    render(){
        return(
     <HashRouter>
        <Switch> 
            <Route path='/' component={Login}></Route>
            <Route path='/admin' component={Admin}></Route>
          </Switch>
         
   </HashRouter>
         

          
        )
    }

}