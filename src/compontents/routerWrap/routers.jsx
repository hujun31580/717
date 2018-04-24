import React, { Component } from 'react'
import { Route,Redirect } from 'react-router-dom'
import getCookie from '../../utils/getCookie'
class RouterWarp extends Component {
  render() {
    const { routers } = this.props
    return routers.map((item, index) => {
      return <Route key={index} path={item.path} render={(location) => {
        return item.authorization&&!getCookie('token')?
        <Redirect to='/login'></Redirect>:
        <item.compontent {...location} routers={item.children}></item.compontent>
      }}></Route>
    })
  }
}
export default RouterWarp