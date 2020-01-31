import {
    CONFIRM_ROUTE,
    STUDENTAUTHED,
    COMPANYAUTHED,
    ADMINAUTHED,
    USER
} from '../constant'
const initialState = {
    confirmRoute: false,
    Studentauthed: false,
    Companyauthed: false,
    Adminauthed: false,
    user: {}
}

export default function routeReducer(state = initialState, action) {
    switch (action.type) {
        case CONFIRM_ROUTE:
            return {
                ...state,
                confirmRoute: action.payload
            }

        case STUDENTAUTHED:
            return {
                ...state,
                Studentauthed: action.payload
            }

        case COMPANYAUTHED:
            return {
                ...state,
                Companyauthed: action.payload
            }

        case ADMINAUTHED:
            return {
                ...state,
                Adminauthed: action.payload
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