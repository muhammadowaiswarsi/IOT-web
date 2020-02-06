import React from "react";
import Signup from "../../Component/signup";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import { routeAction } from "./../../store/actions/index";
import { signup } from "./../../Service/AuthService";
import { Error } from "./../../Shared/Error";
import "./index.css";

class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      error: ""
    };
  }

  signUpFunc = (obj) => {
    if (obj.password === obj.confirmPassword) {
      this.setState({
        loader: true
      });
      signup(obj)
        .then(res => {
          obj.user_id = res.user_id;
          this.props.user(obj);
          this.props.confirmRoute(true);
          this.setState({
            loader: false
          });
          setTimeout(() => {
            this.props.history.replace(`/confirmation`);
          }, 100);
        })
        .catch(err => {
          this.setState({
            loader: false,
            error: err.message
          });
          console.log(err);
        });
    } else {
      this.setState({
        error: "password is not matched"
      })
    }
  }

  submit = obj => {
    let { name, email, password, confirmPassword } = obj
    if (name && email && password && confirmPassword) {
      this.signUpFunc(obj)
    } else {
      this.setState({
        error: "please fill up all fields"
      })
    }
  };

  render() {
    return (
      <div className="SignupContainer flex-center-center">
        <Col sm={1} md={3} lg={3} xl={4} />
        <Col
          className="main_col flex-center"
          xs={12}
          sm={10}
          md={6}
          lg={6}
          xl={4}
        >
          <Error errMessage={this.state.error} />
          <Signup
            history={this.props.history}
            submit={this.submit}
            loader={this.state.loader}
          />
        </Col>
        <Col sm={1} md={3} lg={3} xl={4} />
      </div>
    );
  }
}

const dispatchToProp = dispatch => {
  return {
    confirmRoute: payload => {
      dispatch(routeAction.confirm_route(payload));
    },
    authed: flag => {
      dispatch(routeAction.authed(flag));
    },
    user: obj => {
      dispatch(routeAction.user(obj));
    }
  };
};

export default connect(
  null,
  dispatchToProp
)(SignupContainer);
