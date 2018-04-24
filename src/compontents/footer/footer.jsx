import React, { Component } from 'react'
import './footer.scss'
class Footer extends Component {
  render() {
    const { children } = this.props
    return <footer className='footer'>
      {children}
    </footer>
  }
}
export default Footer
