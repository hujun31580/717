import React, { Component } from 'react'
import './address.scss'
import Header from '../../compontents/header'
import $http from '../../utils/fetch.js'
class Address extends Component {
  loginOut(){
    
  }
  render() {
    const { goBack,push } = this.props.history
    return (

      <div className='app'>
        <Header>
          <i
            onClick={goBack}
            className='iconfont icon-xiangzuo'
          ></i>
          <h2>收货地址</h2>
          <i
          onClick={() => {
            push('/index/home')
          }}
          className='iconfont icon-fonts-shouye home'
        ></i>
        </Header>
        <button 
        onClick={() => {
            push('/addaddress')
          }}
        className='btn'>
         十  新增加地址
        </button>
      </div>
    )


  }

}
export default Address