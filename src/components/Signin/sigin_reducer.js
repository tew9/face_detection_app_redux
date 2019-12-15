import {
    CHANGE_EMAIL_FIELD,
    CHANGE_PASS_FIELD,
    MESSAGE,
} from './signin_constant.js'

//initialize the state
const initialState = {
    emailField: '',
    passField: '',
    message: '',
}

//create action loader
export const changeField = (state = initialState, action = {}) => {
    switch(action.type){
        case CHANGE_EMAIL_FIELD:
            return Object.assign({}, state, {emailField: action.payload})
        case CHANGE_PASS_FIELD:
            return Object.assign({}, state, {passField: action.payload})
        case MESSAGE:
            return Object.assign({}, state, {message: action.payload})
        default:
            return state;
    }
}