import {
    STUDENTAUTHED,
    COMPANYAUTHED,
    ADMINAUTHED,
    CONFIRM_ROUTE,
    USER,
} from '../constant'

export default class routeAction {

    static Studentauthed(flag) {
        return {
            type: STUDENTAUTHED,
            payload: flag
        }
    }

    static Companyauthed(flag) {
        return {
            type: COMPANYAUTHED,
            payload: flag
        }
    }

    static Adminauthed(flag) {
        return {
            type: ADMINAUTHED,
            payload: flag
        }
    }

    static confirm_route(flag) {
        return {
            type: CONFIRM_ROUTE,
            payload: flag
        }
    }

    static user(obj) {
        return {
            type: USER,
            payload: obj
        }
    }

}