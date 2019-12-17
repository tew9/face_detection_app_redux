import {
    INPUT_CHANGE,
    CHANGE_ROUTE,
    DATA_STATUS
} from './app_contstants.js'

export const setInput = (text) => {
   return({
    type: INPUT_CHANGE,
    payload: text,
    });
}

export const setRoute = (route) => {
    return({
     type: CHANGE_ROUTE,
     payload: route,
     });
 }

 export const dataReceptor = (data) => {
    return({ 
        type: DATA_STATUS,
        payload: data,
    })
 }


