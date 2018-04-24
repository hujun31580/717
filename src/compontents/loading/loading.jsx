import React,{Component} from 'react'
import './loading.scss'
class Loading extends Component {
     render(){
       return<img className='loading' src={require('../../../static/images/loading.gif')}/>  
     }
}
export default Loading
