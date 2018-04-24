import loadable from 'react-loadable'
import loading from '../compontents/loading'
import Home from '../views/home'
// const Home=loadable({
//     loader:()=>import('../views/home'),
//     loading:loading
// })

import Index from '../views/index'
// const Index=loadable({
//     loader:() => import('../views/index'),
//     loading:loading
// })
import Classify from '../views/classify'
import Mine from '../views/mine'
import Shequ from '../views/shequ'
import Car from '../views/car'
import Detail from '../views/detail'
import Login from '../views/login'
import Register from '../views/register'
import Err from '../views/err'
import Search from '../views/search'
import Setting from '../views/setting'
import Address from '../views/address'
import Addaddress from '../views/addaddress'
import Searchindex from '../views/search/indexs'
import Getgoods from '../views/search/getgoods'
const router = [{
    path: '/index',
    compontent: Index,
    children: [{
        path: '/index/home',
        compontent: Home,
    },
    {
        path: '/index/classify',
        compontent: Classify,

    },
    {
        authorization: true,
        path: '/index/mine',
        compontent: Mine,
    },
    {
        path: '/index/shequ',
        compontent: Shequ,
    },
    {
        authorization: true,
        path: '/index/car',
        compontent: Car,
    }
    ]
},
{
    path: '/search',
    exact: true,
    compontent: Search,
    children: [{
        path: '/search/index',
        compontent: Searchindex,
    },
    {
        path: '/search/getgoods/:content',
        compontent: Getgoods,
    }
    ]

},
{
    path: '/detail/:id',
    compontent: Detail,
},
{
    path: '/login',
    compontent: Login,
},
{
    path: '/register',
    compontent: Register,
},
{
    path: '/err',
    compontent: Err,
},
{
    path: '/setting',
    compontent: Setting,
},
{
    path: '/address',
    compontent: Address,
},
{
    path: '/addaddress',
    compontent: Addaddress,
}

]
export default router