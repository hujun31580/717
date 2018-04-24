import React, { Component } from 'react'
import './swiper.scss'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
class SwiperComponent extends Component {
  componentDidMount() {
    var mySwiper = new Swiper(this.refs.spDom, {
      autoplay: true,
      loop: true,
      pagination: {
         el: this.refs.page,
      },

    })
  }
  render() {
    return <div className="swiper-container" ref='spDom'>
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <img src={'http://www.lb717.com/static/mobile/images/homeImg/video717.png'} />
        </div>
        <div className="swiper-slide">
        <img src={'http://www.lb717.com/static/mobile/images/homeImg/home.png'} />
        </div>
        <div className="swiper-slide">
        <img src={'http://www.lb717.com/static/mobile/images/activity/banner_activite.jpg'} />
        </div>
        <div className="swiper-slide">
        <img src={'http://www.lb717.com/static/mobile/images/homeImg/banner1.png'} />
        </div>
        <div className="swiper-slide">
        <img src={'http://www.lb717.com/static/mobile/images/homeImg/video.png'} />
        </div>
        <div className="swiper-slide">
        <img src={'http://www.lb717.com/static/mobile/images/homeImg/video717.png'} />
        </div>
      </div>
      <div ref='page' className="swiper-pagination"></div>

    </div>
  }
}
export default SwiperComponent
