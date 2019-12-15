import {
    CHANGE_EMAIL_FIELD,
    CHANGE_PASS_FIELD,
    MESSAGE,
} from './signin_constant.js'

export const setEmailField = (text) => {
    return({
        type: CHANGE_EMAIL_FIELD,
        payload: text,
    })
}

export const setPassField = (text) => {
    return({
        type: CHANGE_PASS_FIELD,
        payload: text,
    })
}

export const setMessage = (dispatch) => {
    return({
        type: MESSAGE,
        payload: dispatch,
    })
}