import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router,Route, Redirect, Switch } from 'react-router-dom'
import App from './src/app.jsx'
import {Provider} from 'react-redux'
import store from './src/store'
import './static/iconfont/iconfont.css'
import './static/css/reset.css'
import './src/utils/fontSet.js'
import RouterWarp from './src/compontents/routerWrap'
ReactDOM.render(
  <Provider store={store}>
   <Router>
  <App/>
</Router>
</Provider>, document.getElementById('root'))