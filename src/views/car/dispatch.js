import getCookie from '../../utils/getCookie'
import $http from '../../utils/fetch'
import { carAction } from '../../store/action/car'
console.log(getCookie('token'))
export default function mapDispatchToProps(dispatch) {
  return {
    getGoods(history) {
      $http.post('/user/cargoods', {
        token: getCookie('token')
      }).then((res) => {
        dispatch(carAction(res.data))
      })
    },
    delete(cargoods) {
      dispatch(
        {
          type:'ADD_CAR',
          cargoods
        }
      )
    }
  }
}