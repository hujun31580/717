import React,{Component} from 'react'
import './main.scss'
class Main extends Component {
     render(){
      const {children}=this.props
       return<main className='app'>
         {children}
       </main>
     }
}
export default Main