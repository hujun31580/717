import {ADD_CAR} from '../actiontype/actionType'
export const carAction=(cargoods)=>{
      return  {
        type:ADD_CAR,
        cargoods
      } 
}