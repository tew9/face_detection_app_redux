import {
    INPUT_CHANGE,
    CHANGE_ROUTE,
    ISSIGNED_IN,
    DATA_STATUS
} from './app_contstants.js'

const initstate = {
    input: '',
    imageURL: '',
    box:{},
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
        case CHANGE_ROUTE:
            return Object.assign({}, state, {route: action.payload })
        case ISSIGNED_IN:
            return Object.assign({}, state, {issignedIn: true })
        case DATA_STATUS:
            return Object.assign({}, state, {id: action.payload.id,
                                            email: action.payload.email, 
                                            name: action.payload.name,
                                            entries: action.payload.entries,
                                            joined: action.payload.joined,
                                            user: action.payload,
                                        })
        default:
            return state;
    }
}
