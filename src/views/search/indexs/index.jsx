import React, { Component } from 'react'
import './index.scss'
import Header from '../../../compontents/header'
class SearchIndex extends Component {
  constructor() {
    super()
    this.state = {
      searchArr: [],
      data: ['粽子', '锅巴', '酱', '小吃', '零食', '干果', '特产', '油', '大米', '面粉']
    }
  }
  toSearch() {
    const { push } = this.props.history
    let keywords = this.refs.keywords.value
    let ls = localStorage;
    if (!keywords) return
    if (ls.getItem('searchArr')) {
      let searchArr = JSON.parse(ls.getItem('searchArr'))
      if (searchArr.indexOf(keywords) < 0) {
        searchArr.push(keywords)
        ls.setItem('searchArr', JSON.stringify(searchArr))
      }
    } else {
      ls.setItem('searchArr', JSON.stringify([keywords]))
    }
    push('/search/getgoods/' + keywords)
  }
  removeHistory() {
    localStorage.removeItem('searchArr')
    this.setState({
      searchArr: []
    })
  }
  componentDidMount() {
    if (localStorage.getItem('searchArr')) {
      this.setState({
        searchArr: JSON.parse(localStorage.getItem('searchArr'))
      })
    }
  }
  render() {
    const { searchArr } = this.state
    return <div className='search'>
      <Header>
        <p className='p'>
          <i className='iconfont icon-shousuo'></i>
          <input ref='keywords' placeholder='请输入你要购买的商品' />
        </p>
        <span
          style={{ color: '#222' }}
          onClick={() => {
            this.toSearch()
          }}
        >搜索</span>
      </Header>
      <div className='search-box'>
        <p>
          <span>最近搜索</span>
          <i
            onClick={() => {
              this.removeHistory()
            }}
            className='iconfont icon-shanchu'
          ></i>
        </p>
        {
          searchArr.length ? searchArr.map((item, index) => {
            return <span
              key={index}
              className='span'
              onClick={() => {
              }}
            >
              {item}
            </span>

          }) : <p>暂无搜索记录...</p>
        }
      </div>
      <div>
        <p>
          <span>大家都在搜</span>
          <span></span>
        </p>
        {
          this.state.data.map((item, index) => {
            return <span
              key={index}
              className='span'
              onClick={() => {
                this.refs.keywords.value = item
              }}
            >
              {item}
            </span>
          })
        }
      </div>
    </div>
  }
}
export default SearchIndex
