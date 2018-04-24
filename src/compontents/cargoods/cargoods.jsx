import React, { Component } from 'react'
import { connect } from 'react-redux'
import $http from '../../utils/fetch'
import getCookie from '../../utils/getCookie'
import { carAction } from '../../store/action/car'
import './cargoods.scss'
class Cargoods extends Component {
  checked() {
    $http.post('/user/checked', {
      goods_id: this.props.item.goods_id,
      token: getCookie('token'),
      type: 'notAll'
    }).then((res) => {
      if (res.code == 1) {
        alert('登录超时,请从新登录')
        console.log(this.props)
        this.props.history.push('/login')
      } else {
        console.log(this.props.changCar(res.all))
      }
    })
  }
  changeCar(type) {
    $http.post('/user/addcar', {
      goods_id: this.props.item.goods_id,
      goods_info: JSON.stringify(this.props.item),
      token: getCookie('token'),
      type: type
    }).then((res) => {
      console.log(res)
      if (res.code == 1) {
        alert('登录超时,请从新登录')

        this.props.history.push('/login')
      } else {
        this.props.changCar()
      }
    })
  }
  render() {
    const { carAction, item } = this.props

    return (
      <dl className='cargoods'>
        <dt>
          <i
            onClick={() => {
              this.checked()
            }}
            className={item.is_verify ? 'iconfont icon-duihao' : 'iconfont'}
          ></i>
          <img src={'http://www.lb717.com' + item.obj_data} alt="" />
        </dt>
        <dd>
          <p>{item.goods_name}</p>
          <div>
            <b>¥{item.discount_price}</b>
            <h3>
              <span
                onClick={() => {
                  this.changeCar(-1)
                }}
              >-</span>
              <span>{item.status}</span>
              <span
                onClick={() => {
                  this.changeCar(+1)
                }}
              >+</span>

            </h3>
          </div>

        </dd>
      </dl>
    )
  }
}
const mapStateToProps = (state) => {
  return {

  }
}
const mapDispatchToProps = {
  carAction
}
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Cargoods)
