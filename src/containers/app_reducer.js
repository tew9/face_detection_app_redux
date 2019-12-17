import {
    INPUT_CHANGE,
    CHANGE_ROUTE,
    DATA_STATUS
} from './app_contstants.js'

const initstate = {
    input: '', 
    route: 'signin',
    issignedIn: false,
    user:{
        id: '',
        email: '',
        name: '',
        entries: 0,
        joined: ''
    }
}

export const changeFields = (state = initstate, action = {}) =>{
    switch(action.type){
        case INPUT_CHANGE:
            return Object.assign({}, state, {input: action.payload })
        case DATA_STATUS:
            return Object.assign({}, state, {id: action.payload.id,
                                            email: action.payload.email, 
                                            name: action.payload.name,
                                            entries: action.payload.entries,
                                            joined: action.payload.joined,
                                            user: action.payload,
                                        })
        case CHANGE_ROUTE:
            if(action.payload === 'signin'){
                return Object.assign({}, state, { issignedIn: false, route: 'signin'})
            }else if(action.payload === 'home'){
                return Object.assign({}, state, { issignedIn: true, route: 'home'})
            }else if(action.payload === 'register'){
                return Object.assign({}, state, { issignedIn: false, route: 'register'})
            }else {
                return state;
            }
        default:
            return state;
    }
}
