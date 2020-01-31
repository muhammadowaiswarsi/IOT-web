import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import LoginContainer from '../Container/Login';
import StudentMain from '../Container/StudentMain';
import CompanyMain from '../Container/CompanyMain';
import SignupConfirmation from '../Container/SignupConfirmation';
import SignupContainer from '../Container/Signup';
import { connect } from "react-redux";
import routeAction from "./../store/actions/routeAction";
import Loading from "./../Container/LoaderScreen";
import AdminMain from "./../Container/AdminMain"
import { isLoggedIn } from "./../Service/AuthService"

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
            Adminauthed: false,
            Companyauthed: false,
            Studentauthed: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.Studentauthed !== this.props.Studentauthed) {
            this.setState({
                Studentauthed: this.props.Studentauthed,
            })
        }
        if (prevProps.Companyauthed !== this.props.Companyauthed) {
            this.setState({
                Companyauthed: this.props.Companyauthed,
            })
        }
        if (prevProps.Adminauthed !== this.props.Adminauthed) {
            this.setState({
                Adminauthed: this.props.Adminauthed,
            })
        }
        if (prevProps.confirmRoute !== this.props.confirmRoute) {
            this.setState({
                confirmRoute: this.props.confirmRoute,
            })
        }

    }

    componentDidMount() {
        isLoggedIn()
            .then((res) => {
                if (res.attributes.sub) {
                    this.setState({
                        authed: true,
                    })
                    let user = res.attributes
                    let obj = {
                        user_id: user.sub
                    }
                    this.props.user(obj)
                } else {
                    this.setState({
                        authed: false,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <Router>
                <Route exact path="/" component={Loading} />
                <Route exact path="/login" component={LoginContainer} />
                <Route exact path="/registration/:type" component={SignupContainer} />
                {/* <PrivateRoute exact authed={this.state.Studentauthed} path="/student/main" component={StudentMain} />
                <PrivateRoute exact authed={this.state.Companyauthed} path="/company/main" component={CompanyMain} />
                <PrivateRoute exact authed={this.state.Adminauthed} path="/admin/main" component={AdminMain} />
                <PrivateRoute exact authed={this.state.confirmRoute} path="/confirmation/:type" component={SignupConfirmation} /> */}
                <Route exact authed={this.state.Studentauthed} path="/student/main" component={StudentMain} />
                <Route exact authed={this.state.Companyauthed} path="/company/main" component={CompanyMain} />
                <Route exact authed={this.state.Adminauthed} path="/admin/main" component={AdminMain} />
                <Route exact authed={this.state.confirmRoute} path="/confirmation/:type" component={SignupConfirmation} />
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
        Studentauthed: routeReducer.Studentauthed,
        Companyauthed: routeReducer.Companyauthed,
        Adminauthed: routeReducer.Adminauthed,
        confirmRoute: routeReducer.confirmRoute
    }
}

export default connect(mapStateToProp, mapDispatchToProp)(Routes);