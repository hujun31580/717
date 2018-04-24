import React, { Component } from 'react'
import './home.scss'
import Swiper from '../../compontents/swiperComponent'
import $http from '../../utils/fetch.js'
import Main from '../../compontents/main'
import Header from '../../compontents/header'
import getCookie from '../../utils/getCookie'
import Toast from 'react-toast-mobile'
import Goods from '../../compontents/goods'
class Home extends Component {
  constructor() {
    super()
    this.state = {
      flag: true,
      id: 2,
      goodlist: []
    }
  }
  scrolling() {
    if (this.state.flag) {
      let scrollTop = this.refs.scroll.scrollTop
      let clientHeight = this.refs.scroll.offsetHeight
      let domHeight = this.refs.dom.offsetHeight
      if (domHeight - (scrollTop + clientHeight) < 50) {
        this.setState({
          flag: false
        })
        console.log(1234)
        $http.post('/mall/index/getGoodsChannel', { channel_id: this.state.id })
          .then((data) => {
            this.setState({
              goodlist: this.state.goodlist.concat(JSON.parse(data).data.data)
            }, () => {
              this.setState({
                flag: true
              })
            })
          })
        this.setState({
          id: ++this.state.id
        })
      }
    }
  }
  goStore() {
    if (!getCookie('token')) {
      alert('请登录')
      this.props.history.push('/login')
    } else {
      this.props.history.push('/index/mine')
    }
  }
  componentDidMount() {
    this._isMounted = true
    $http.post('/mall/index/getGoodsChannel', { channel_id: 2 })
      .then((data) => {
        this.setState({
          goodlist: JSON.parse(data).data.data
        })
      })
  }
  componentWillUnmount() {
    this._isMounted = false
  }
  render() {
    const { push } = this.props.history
    return (
      <Main>
        <Toast />
        <Header>
          <img src={require('../../../static/images/logo.jpg')} alt="" />
          <p onClick={() => { push('/search/index') }}>
            <i className='iconfont icon-shousuo'></i>
            <input placeholder='请输入你要购买的商品' /></p>
          <span
            onClick={() => {
              this.goStore()
            }}
          >
            <img className='home' src={require('../../../static/images/store.jpg')} alt="" />
            我的店铺
           </span>
        </Header>
        <div ref='scroll' className='main' onScroll={this.scrolling.bind(this)}>
          <div ref='dom'>
            <Swiper />
            <ul className='nav-list'>
              <li>
                <img src={require('../../../static/images/nav1.jpg')} alt="" />
                <span>牛奶乳品</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav2.jpg')} alt="" />
                <span>家乡味道</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav3.jpg')} alt="" />
                <span>休闲零食</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav4.jpg')} alt="" />
                <span>米面粮油</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav5.jpg')} alt="" />
                <span>调味调料</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav6.jpg')} alt="" />
                <span>酒水饮料</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav7.jpg')} alt="" />
                <span>生鲜果蔬</span>
              </li>
              <li>
                <img src={require('../../../static/images/nav8.jpg')} alt="" />
                <span>进口食品</span>
              </li>
            </ul>
            <div className='list'>
              {
                this.state.goodlist.map((item, index) => {
                  return <Goods item={item} key={index}></Goods>
                })
              }
            </div>
          </div>
        </div>
      </Main>
    )
  }
}
export default Home
