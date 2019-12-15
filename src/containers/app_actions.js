import {
    INPUT_CHANGE,
    CHANGE_ROUTE,
    ISSIGNED_IN,
    DATA_STATUS
} from './app_contstants.js'

export const setInput = (text) => {
   return({
    type: INPUT_CHANGE,
    payload: text,
    });
}

export const setRoute = (text) => {
    return({
     type: CHANGE_ROUTE,
     payload: text,
     });
 }

 export const setIssignedIn = () => {
    return({
     type: ISSIGNED_IN,
     });
 }

 export const dataReceptor = (data) => {
    return({ 
        type: DATA_STATUS,
        payload: data,
    })
 }


