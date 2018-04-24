import React, { Component } from 'react'
import './goods.scss'
import Lazyload from 'react-lazyload'
import { connect } from 'react-redux'
import { carAction } from '../../store/action/car'
import { withRouter } from 'react-router-dom'
import getCookie from '../../utils/getCookie'
import $http from '../../utils/fetch'
import Loading from '../loading'
import { T } from 'react-toast-mobile'
@withRouter
class Goods extends Component {
  addCar(e) {
    e.stopPropagation();
    $http.post('/user/addcar', {
      goods_id: this.props.item.goods_id,
      goods_info: JSON.stringify(this.props.item),
      token: getCookie('token'),
      type: +1
    }).then((res) => {
      if (res.code == 1) {
        alert('请登录')
        console.log(this.props)
        this.props.history.push('/login')
      } else {
        alert('添加商品成功')
      }
    })
  }
  render() {
    const { item } = this.props
    return <dl className='dl' onClick={() => {
      localStorage.detail = JSON.stringify(item)
      this.props.history.push('/detail/' + item.goods_id)
    }}>
      <dt>
        <Lazyload placeholder={<Loading />} overflow height={'100%'}>
          <img src={'http://www.lb717.com' + item.obj_data} alt="" />
        </Lazyload>

      </dt>
      <dd>
        <p>{item.goods_name}</p>
        <div>
          <span>¥{item.discount_price}</span>
          <i
            onClick={(e) => {
              this.addCar(e)
            }}
            className='iconfont icon-xiazai1'
          ></i>
        </div>

      </dd>
    </dl>
  }
}
const mapDispatchToProps = {
  carAction
}
export default connect(null, mapDispatchToProps)(Goods)
