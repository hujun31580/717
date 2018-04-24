import React, { Component } from 'react'
import './mine.scss'
import Header from '../../compontents/header'
import $http from '../../utils/fetch'
import Goods from '../../compontents/goods'
import Main from '../../compontents/main'
class Mine extends Component {
  constructor() {
    super()
    this.state = {
      goodlist: []
    }
  }
  componentDidMount() {
    $http.post('/mall/index/getGoodsChannel', { channel_id: 7 })
      .then((data) => {
        this.setState({
          goodlist: JSON.parse(data).data.data
        })
      })

  }
  render() {
    const { push } = this.props.history
    return <Main>
      <Header>
        <i
          onClick={
            () => {
              push('/setting')
            }

          }
          className='iconfont icon-shezhi'
        ></i>
        <h2>我的717商城</h2>
        <i></i>
      </Header>
      <div className='main mine'>
        <div className='user'>
          <img src={require('../../../static/images/logo.jpg')} alt="" />
          <p>drisgigifdkjxck</p>

        </div>
        <ul>
          <li>
            <span>我的社区</span>
            <i className='iconfont icon-jiantouyou'></i>
          </li>
          <li>
            <span>账户余额</span>
            <i className='iconfont icon-jiantouyou'></i>
          </li>
          <li
            onClick={
              () => {
                push('/address')
              }
            }
          >
            <span
            >地址管理</span>
            <i className='iconfont icon-jiantouyou'></i>
          </li>
        </ul>
        <h3 style={{ fontSize: ".32rem", marginTop: '.2rem', borderTop: '3px solid #eee', textAlign: 'center' }}>热门推荐</h3>
        <div className='list'>
          {
            this.state.goodlist.map((item, index) => {
              return <Goods item={item} key={index}></Goods>
            })
          }
        </div>

      </div>
    </Main>
  }
}
export default Mine