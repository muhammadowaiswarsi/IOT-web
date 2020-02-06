import React from "react";
import Login from "../../Component/login";
import { Col } from "react-bootstrap";
import "./index.css";
import { login } from "./../../Service/AuthService";
import { connect } from "react-redux";
import routeAction from "./../../store/actions/routeAction";
import { Error } from "./../../Shared/Error";
import { isLoggedIn } from "./../../Service/AuthService"


class LoginContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      error: "",
    };
  }

  componentDidMount() {
    isLoggedIn()
      .then((res) => {
        if (res.attributes.sub) {
          localStorage.setItem("user", JSON.stringify(res.attributes))
          this.props.authed(true)
          setTimeout(() => {
            this.props.history.replace(`/dashboard`)
          }, 100);
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  loginFunc = obj => {
    let { email, password } = obj;
    this.setState({
      loader: true
    });
    login(email, password)
      .then(res => {
        let user = res.attributes;
        localStorage.setItem("user", JSON.stringify(res.attributes))
        let obj = {
          email: user.email,
          user_id: user.sub
        };
        this.props.user(obj);
        this.setState({
          loader: false
        });
        this.props.authed(true)
        setTimeout(() => {
          this.props.history.replace("/dashboard");
        }, 100);
      })
      .catch(err => {
        this.setState({
          loader: false,
          error: err
        });
        console.log(err);
      });
  };

  render() {
    let { loader } = this.state;
    return (
      <div className="LoginContainer flex-center-center">
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

          <Login
            login={obj => this.loginFunc(obj)}
            loader={loader}
            history={this.props.history}
          />

        </Col>
        <Col sm={1} md={3} lg={3} xl={4} />
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    authed: flag => {
      dispatch(routeAction.authed(flag));
    },
    user: payload => {
      dispatch(routeAction.user(payload));
    }
  };
};

export default connect(
  null,
  mapDispatchToProp
)(LoginContainer);
