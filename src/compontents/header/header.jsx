import React,{Component} from 'react'
import './header.scss'
class Header extends Component {
     render(){
       const {children}=this.props
       return<header className='header car-header'
       >
         {children}
       </header>
     }
}
export default Header
