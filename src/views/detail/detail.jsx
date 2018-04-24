import React, { Component } from 'react'
import './detail.scss'
import { NavLink } from 'react-router-dom'
import $http from '../../utils/fetch'
import Main from '../../compontents/main'
import Header from '../../compontents/header'
import Footer from '../../compontents/footer'
import getCookie from '../../utils/getCookie'
class Detail extends Component {
  addCar(e, data) {
    console.log(data)
    e.stopPropagation();
    $http.post('/user/addcar', {
      goods_id: data.goods_id,
      goods_info: JSON.stringify(data),
      token: getCookie('token')
    }).then((res) => {
      if (res.code == 1) {
        alert('请登录')
        console.log(this.props)
        this.props.history.push('/login')
      } else {
        alert('添加购物车成功')
      }
    })
  }
  componentDidMount() {
    //this._isMounted = true


  }
  componentWillUnmount() {
    //this._isMounted = false
  }

  render() {
    const { goBack, push } = this.props.history
    const data = JSON.parse(localStorage.detail)
    console.log(data)
    return <div className='app'>
      <Header>
        <i
          onClick={goBack}
          className='iconfont icon-xiangzuo'
        >返回</i>
        <p>
          <b>商品</b>
          <b>详情</b>
        </p>
        <i
          onClick={() => {
            push('/index/home')
          }}
          className='iconfont icon-fonts-shouye home'
        ></i>

      </Header>
      <div className='main'>
        <img src={"http://www.lb717.com" + data.obj_data} alt="" />
        <p>{data.goods_name}</p>
        <p>¥{data.discount_price}</p>
      </div>
      <Footer>
        <NavLink to='/index/car'>
          <i className='iconfont icon-linedesign-20'></i>
          <span>客服</span>
        </NavLink>
        <NavLink to='/index/car'>
          <i className='iconfont icon-xiazai1'></i>
          <span>购物车</span>
        </NavLink>
        <button
          onClick={(e) => {
            this.addCar(e, data)
          }}
        >加入购物车</button>
        <button className="btn">立即购买</button>
      </Footer>


    </div>
  }
}
export default Detail
