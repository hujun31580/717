import React, { Component } from 'react'
import './classify.scss'
import Main from '../../compontents/main'
import Header from '../../compontents/header'
import $http from '../../utils/fetch'
class Classify extends Component {
  constructor() {
    super()
    this.state = {
      goods: [],
      id: 1,
      nav: ['家乡味道', '进口食品', '牛奶乳品', '休闲零食', '生鲜果蔬', '米面粮油', '调味调料', '酒水饮料']
    }
  }
  componentDidMount() {
    this.getGoods(1)
  }
  getGoods(id) {
    $http.post('/classify/goods', { id: id })
      .then((data) => {
        this.setState({
          id: id,
          goods: data.product
        })
      })
  }

  render() {
    const { nav, goods, id } = this.state
    const {push}=this.props.history
    return <Main>
      <Header>
        <p onClick={() => { push('/search/index') }}>
          <i className='iconfont ico icon-shousuo'></i>
          <input  className='inp' placeholder='请输入你要购买的商品' type="text" />
        </p>

      </Header>
      <div className='classify'>

        <ul className='classify-nav'>
          {
            nav.map((item, index) => {
              return (
                <li
                  key={index}
                  className={id == index + 1 ? 'active' : ''}
                  onClick={
                    () => {
                      this.getGoods(index + 1)
                    }
                  }
                >
                  {item}
                </li>)
            })
          }
        </ul>
        <div className='classify-product'>
          {
            goods.map((item, index) => {
              console.log(item)
              return <img key={index} src={item} alt="" />
            })
          }
        </div>
      </div>
    </Main>
  }
}
export default Classify
