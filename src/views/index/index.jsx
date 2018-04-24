import React, { Component } from 'react'
import './index.scss'
import Footer from '../../compontents/footer'
import { NavLink } from 'react-router-dom'
import $http from '../../utils/fetch'
import RouterWarp from '../../compontents/routerWrap'
class Index extends Component {
  constructor() {
    super()
    this.state = {
      nav: [
        {
          name: '首页',
          path: '/index/home',
          icon: 'iconfont icon-fonts-shouye'
        },
        {
          name: '分类',
          path: '/index/classify',
          icon: 'iconfont icon-classify'
        },
        {
          name: '社区',
          path: '/index/shequ',
          icon: 'iconfont icon-shequ'
        },
        {
          name: '购物车',
          path: '/index/car',
          icon: 'iconfont icon-xiazai1'
        },
        {
          name: '我的',
          path: '/index/mine',
          icon: 'iconfont icon-wode'
        },
      ]
    }
  }

  render() {
    const { routers } = this.props
    const { nav } = this.state
    const { push } = this.props.history
    return (
      <div className='wrap'>

        <RouterWarp routers={routers}></RouterWarp>
        <Footer>
          {
            nav.map((item, index) => {
              return (
                <NavLink activeClassName='active' key={index} to={item.path}>
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </NavLink>

              )
            })
          }
        </Footer>

      </div>

    )
  }
}
export default Index
