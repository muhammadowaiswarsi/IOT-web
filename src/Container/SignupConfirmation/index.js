import React from "react";
import SignupConfirm from "../../Component/signupConfirm";
import { Col } from "react-bootstrap";
import { confirm } from "./../../Service/AuthService";
import { connect } from "react-redux";
import { routeAction } from "./../../store/actions"

class SignupConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  confirmationCodeFunc = (code) => {
    this.setState({
      loader: true
    });

    confirm(this.props.user.user_id, code)
      .then(res => {
        this.setState({
          loader: false
        });
        this.props.history.replace("/login")
      })
      .catch(err => {
        this.setState({
          loader: false
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
          <SignupConfirm
            confirmationCodeFunc={code =>
              this.confirmationCodeFunc(
                code,
              )
            }
            loader={loader}
          />
        </Col>
        <Col sm={1} md={3} lg={3} xl={4} />
      </div>
    );
  }
}

const mapStateToProp = state => {
  return {
    user: state.routeReducer.user
  };
};

const mapDispatchToProp = dispatch => {
  return {
    Studentauthed: flag => {
      dispatch(routeAction.Studentauthed(flag));
    },
    Companyauthed: flag => {
      dispatch(routeAction.Companyauthed(flag));
    },
    Adminauthed: flag => {
      dispatch(routeAction.Adminauthed(flag));
    }
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(SignupConfirmation);
