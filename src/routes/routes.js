import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginContainer from '../Container/Login';
import DashboardContainer from '../Container/Dashboard';
import SignupConfirmation from '../Container/SignupConfirmation';
import SignupContainer from '../Container/Signup';
import { connect } from "react-redux";
import routeAction from "./../store/actions/routeAction";
import Loading from "./../Container/LoaderScreen";

function PrivateRoute({ component: Component, authed, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authed === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}



class Routes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmRoute: false,
            authed: false,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authed !== this.props.authed) {
            this.setState({
                authed: this.props.authed,
            })
        }
        if (prevProps.confirmRoute !== this.props.confirmRoute) {
            this.setState({
                confirmRoute: this.props.confirmRoute,
            })
        }

    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Loading} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/registration" component={SignupContainer} />
                <PrivateRoute exact authed={this.state.confirmRoute} path="/confirmation" component={SignupConfirmation} />
                <PrivateRoute exact authed={this.state.authed} path="/dashboard" component={DashboardContainer} />
            </Router>
        )
    }
}

const mapDispatchToProp = dispatch => {
    return {
        user: (payload) => { dispatch(routeAction.user(payload)) }
    }
}

const mapStateToProp = (state) => {
    let { routeReducer } = state
    return {
        authed: routeReducer.authed,
        confirmRoute: routeReducer.confirmRoute
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Routes);