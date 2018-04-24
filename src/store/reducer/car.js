import {ADD_CAR} from '../actiontype/actionType'
const initstate={
      name:'car',
      cargoods:null
}

const reducer = (state = initstate.cargoods, action) => {
switch (action.type) {
case ADD_CAR:
  return action.cargoods
default:
  return state
}
}

export default reducer