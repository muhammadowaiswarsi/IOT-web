import {
    AUTHED,
    CONFIRM_ROUTE,
    USER,
} from '../constant'

export default class routeAction {

    static authed(flag) {
        return {
            type: AUTHED,
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