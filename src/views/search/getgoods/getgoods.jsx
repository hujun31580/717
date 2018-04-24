import React, { Component } from 'react'
import './getgoods.scss'
import Goods from '../../../compontents/goods'
import Header from '../../../compontents/header'
import $http from '../../../utils/fetch'
class Getgoods extends Component {
  constructor() {
    super()
    this.state = {
      goodlist: []
    }
  }
  componentDidMount() {
    const { content } = this.props.match.params
    this.refs.goodskeywords.value = content
    this._isMounted = true
    $http.post('/mall/index/getGoodsChannel', { channel_id: 2 })
      .then((data) => {
        this.setState({
          goodlist: JSON.parse(data).data.data
        })
      })
  }
  render() {
    const { push, goBack } = this.props.history
    return <div className='search'>
      <Header>
        <i
          onClick={
            () => {
              goBack()
            }
          }
          className='iconfont icon-xiangzuo'
        ></i>
        <p>
          <i className='iconfont icon-shousuo'></i>
          <input
            ref='goodskeywords'
            placeholder='请输入你要购买的商品'
            onClick={
              () => {
                push('/search/index')
              }
            }
          />
        </p>
      </Header>
      <div className='main' >
        <h1 style={{ fontSize: ".36rem", height: '2rem', lineHeight: '2rem', fontWeight: 800, textAlign: 'center' }}>未找到相关商品</h1>
        <h3 style={{ fontSize: ".32rem", marginTop: '.2rem', borderTop: '3px solid #eee', textAlign: 'center' }}>热门推荐</h3>
        <div className='list'>
          {
            this.state.goodlist.map((item, index) => {
              return <Goods item={item} key={index}></Goods>
            })
          }
        </div>

      </div>
    </div>
  }
}
export default Getgoods
