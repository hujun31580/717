import React, { Component } from 'react'
import { connect } from 'react-redux'
import './car.scss'
import Main from '../../compontents/main'
import Header from '../../compontents/header'
import Cargoods from '../../compontents/cargoods'
import { carAction } from '../../store/action/car'
import mapDispatchToProps from './dispatch'
import Goods from '../../compontents/goods'
import $http from '../../utils/fetch'
import getCookie from '../../utils/getCookie'
class Car extends Component {
    constructor() {
        super()
        this.state = {
            goodlist: [],
            all: true,
            edit: '编辑',
            del: true,
            total: 0
        }
        this.changCar = this.changCar.bind(this)
        this.total = this.total.bind(this)
    }
    componentDidMount() {
        this.props.getGoods()
        this.total()
        this._isMounted = true
        $http.post('/mall/index/getGoodsChannel', { channel_id: 6 })
            .then((data) => {
                this.setState({
                    goodlist: JSON.parse(data).data.data
                })
            })

    }
    total() {
        let total = 0;
        this.props.cargoods && this.props.cargoods.forEach((item) => {
            if (item.is_verify) {
                total += item.discount_price * item.status
            }
        })
        this.setState({
            total: total
        })
    }
    changCar(all) {
        this.setState({
            all: arguments.length > 0 ? all : this.state.all
        }, () => {
            this.props.getGoods()
            setTimeout(() => {
                this.total()
            }, 100);
        })

    }
    checkedAll() {
        this.setState({
            all: !this.state.all
        }, () => {
            $http.post('/user/checked', {
                token: getCookie('token'),
                type: 'All',
                checked: this.state.all
            }).then((res) => {
                if (res.code == 1) {
                    alert('登录超时,请从新登录')
                    this.props.history.push('/login')
                } else {

                    this.changCar()
                    setTimeout(() => {
                        this.total()
                    }, 100);

                }
            })
        })

    }
    toggle() {
        this.setState({
            edit: this.state.edit == '编辑' ? '完成' : '编辑',
            del: !this.state.del
        })
    }
    delete() {
        $http.post('/user/delete', {
            token: getCookie('token'),
        }).then((res) => {
            if (res.code == 1) {
                alert('登录超时,请从新登录')
                this.props.history.push('/login')
            } else {
                this.props.delete(res.data)
                setTimeout(() => {
                    this.total()
                }, 100);
            }
        })

    }
    render() {
        const { cargoods } = this.props
        const { edit, del, total } = this.state
        return (
            <Main>
                <Header>
                    <p></p>
                    <p>购物车</p>
                    <p
                        style={{ textAlign: 'right' }}
                        onClick={() => {
                            this.toggle()
                        }}
                    >{edit}</p>
                </Header>
                <div className='car-main main'>
                    {
                        cargoods && cargoods.map((item, index) => {
                            return <Cargoods changCar={this.changCar} item={item}></Cargoods>
                        })
                    }
                    <h3 style={{ fontSize: ".32rem", marginTop: '.2rem', borderTop: '3px solid #eee', textAlign: 'center' }}>热门推荐</h3>
                    <div className='list'>
                        {
                            this.state.goodlist.map((item, index) => {
                                return <Goods item={item} key={index}></Goods>
                            })
                        }
                    </div>

                </div>
                <div className='car-footer'>
                    <span>
                        <i
                            onClick={() => {
                                this.checkedAll()
                            }}
                            className={this.state.all ? 'iconfont icon-duihao' : 'iconfont'}
                        ></i>
                        全选
                    </span>
                    {del ?
                        <span>
                            合计
                        <b>
                                ¥{total}
                            </b>
                        </span>
                        : ''
                    }
                    {del ?

                        <span className='del'>结算</span>
                        :
                        <span className='del'
                            onClick={() => {
                                this.delete()
                            }}
                        >删除</span>
                    }

                </div>
            </Main>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        cargoods: state.Car
    }
}
export default connect(mapStateToProps, mapDispatchToProps, null, { pure: false })(Car)