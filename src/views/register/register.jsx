import React, { Component } from 'react'
import $http from '../../utils/fetch.js'
import {T} from 'react-toast-mobile'
import './register.scss'
class Register extends Component {
  constructor() {
      super()
      this.state={
        phoneInfo:false,
        pswInfo:false
      }
  }
  changeValue() {
    console.log(this.refs.nameDom.value)
    $http.post('/user/register', {
      name: this.refs.nameDom.value,
      psw: this.refs.pswDom.value,
    }
    ).then((res) => {
      if (res.code == 0) {
        T.alert('注册成功')
        this.props.history.push('/login')
      }
    })
  }
  test() {
    const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    const phonenumber = this.refs.nameDom.value
    if (reg.test(phonenumber)) {
        this.setState({
          phoneInfo:false
        })
    }else{
      this.setState({
        phoneInfo:true
      })
    }
  }
  testPsw() {
    const reg = /^[0-9a-zA-Z!@#$%^&*]{8,20}$/
    const phonePsw = this.refs.pswDom.value
    if (reg.test(phonePsw)) {
      this.setState({
        pswInfo: false
      })
    } else {
      this.setState({
        pswInfo: true
      })
    }
  }
  render() {
    const { goBack, push } = this.props.history
    return <div className='register'>
      <header>
        <i
          onClick={goBack}
          className='iconfont icon-xiangzuo'
        ></i>
        <span>注册会员</span>
        <span
          onClick={() => {
            push('/login')
          }}
          className='active'
        >登录</span>
      </header>
      <section>
        <p>
          <i className='iconfont icon-wode'></i>
          {this.state.phoneInfo?<span>输入正确的手机格式</span>:''} 
          <input 
          onInput={() => {
            this.test()
          }} ref='nameDom' type="number" placeholder='请输入你的手机号' />
        </p>
        <p>
          <i className='iconfont icon-mima'></i>
          {this.state.pswInfo?<span>字母数字以及特殊字符组成并且必须为8-20位之间</span>:''}
          <input 
          onInput={() => {
              this.testPsw()
            }}
          ref='pswDom' 
          type="password" 
          placeholder='请输入你的密码' 
          />
        </p>
      </section>
      <button
        onClick={() => {
          this.changeValue()
        }}
      >确定</button>
    </div>
  }
}
export default Register