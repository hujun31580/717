import React, { Component } from 'react'
import './login.scss'
import $http from '../../utils/fetch.js'
class Login extends Component {
  constructor() {
    super()
    this.state = {
      phoneInfo: false,
    }
  }
  login() {
    $http.post('/user/login', {
      name: this.refs.nameDom.value,
      psw: this.refs.pswDom.value,
    }
    ).then((res) => {
      if (res.code == 0) {
        document.cookie = 'token=' + res.token
        this.props.history.push('/index/home')

      } else {
        console.log(res)
        alert('登录失败')
      }
    })
  }
  testName() {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    const phonenumber = this.refs.nameDom.value
    if (reg.test(phonenumber)) {
      this.setState({
        phoneInfo: false
      })
    } else {
      this.setState({
        phoneInfo: true
      })
    }
  }
  render() {
    const { goBack, push } = this.props.history
    return <div className='register'>
      <header>
        <i
          onClick={goBack}
          className='iconfont icon-xiangzuo'></i>
        <span>会员登录</span>
        <span className='active' onClick={() => {
          push('/register')
        }}>注册</span>
      </header>
      <section>
        <p>
          <i className='iconfont icon-wode'></i>
          {this.state.phoneInfo ? <span>输入正确的手机格式</span> : ''}
          <input
            ref='nameDom'
            type="number"
            placeholder='请输入你的手机号'
            onInput={() => {
              this.testName()
            }}
          />
        </p>
        <p>
          <i className='iconfont icon-mima'></i>
          <input
            ref='pswDom'
            type="password"
            placeholder='请输入你的密码'
          />
        </p>
      </section>
      <button
        onClick={() => {
          this.login()
        }}
      >立即登录</button>
    </div>
  }
}
export default Login