import React, { Component } from 'react'
import './App.scss'
import {Route, Redirect, Switch } from 'react-router-dom'
import routers from './router/router'
import Err from './views/err'
import RouterWarp from './compontents/routerWrap'
class App extends Component {
  render() {
    return (
      <Switch>
        <Redirect exact from='/' to='/index/home'></Redirect>
        <RouterWarp routers={routers}></RouterWarp>
      </Switch>
    )

  }
}
export default App