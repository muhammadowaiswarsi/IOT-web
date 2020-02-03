import {
    CONFIRM_ROUTE,
    AUTHED,
    USER
} from '../constant'
const initialState = {
    confirmRoute: false,
    authed: false,
    user: {}
}

export default function routeReducer(state = initialState, action) {
    switch (action.type) {
        case CONFIRM_ROUTE:
            return {
                ...state,
                confirmRoute: action.payload
            }

        case AUTHED:
            return {
                ...state,
                authed: action.payload
            }

        case USER:
            return {
                ...state,
                user: action.payload
            }

        default:
            return state
    }
}