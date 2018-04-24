import React, { Component } from 'react'
import './addaddress.scss'
import Header from '../../compontents/header'
import $http from '../../utils/fetch.js'
class Setting extends Component {

  render() {
    const { goBack, push } = this.props.history
    return (

      <div className='app'>
        <Header>
          <i
            onClick={goBack}
            className='iconfont icon-xiangzuo'
          ></i>
          <h2>收货人</h2>
          <i
            onClick={() => {
              push('/index/home')
            }}
            className='iconfont icon-fonts-shouye home'
          ></i>
        </Header>
        <button
          className='btn'>
          保存
        </button>
      </div>
    )


  }

}
export default Setting