import React, { Component } from 'react'
import './setting.scss'
import Header from '../../compontents/header'
import $http from '../../utils/fetch.js'
class Setting extends Component {
  loginOut() {

  }
  render() {
    const { goBack } = this.props.history
    return (

      <div className='app'>
        <Header>
          <i
            onClick={goBack}
            className='iconfont icon-xiangzuo'
          ></i>
          <h2>设置</h2>
          <i></i>
        </Header>
        <button

          className='btn'>
          退出登录

        </button>
      </div>
    )


  }

}
export default Setting