import React from "react";
import SignupConfirm from "../../Component/signupConfirm";
import { Col } from "react-bootstrap";
import { confirm } from "./../../Service/AuthService";
// import { AppSync } from "./../../Config/graphql-config";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import { signupStudent, signupCompany } from "./../../Config/Queries";
import { routeAction } from "./../../store/actions"

class SignupConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false
    };
  }

  confirmationCodeFunc = (code, signupStudent, signupCompany) => {
    this.setState({
      loader: true
    });

    confirm(this.props.user.user_id, code)
      .then(res => {
        let {
          firstName,
          lastName,
          email,
          city,
          state,
          company,
          user_id
        } = this.props.user;
        let { type } = this.props.match.params;
        this.setState({
          loader: false
        });
        if (type === "student") {
          signupStudent({
            variables: {
              firstName,
              lastName,
              email,
              city,
              state,
              student_id: user_id
            }
          })
            .then(res => {
              console.log(res)
              // this.props.Studentauthed(true)
              // setTimeout(() => {
              this.props.history.replace(`/login`)
              // }, 100);
            })
            .catch(err => {
              console.log(err);
            });
        } else if (type === "company") {
          signupCompany({
            variables: {
              companyName: company,
              email,
              city,
              state,
              company_id: user_id
            }
          })
            .then(res => {
              // this.props.Companyauthed(true)
              // setTimeout(() => {
              this.props.history.replace(`/login`)
              // }, 100);
            })
            .catch(err => {
              console.log(err);
            });
        }
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
          {/* <Mutation client={AppSync} mutation={signupStudent}>
            {(signupStudent, { loading, error }) => {
              return (
                <Mutation client={AppSync} mutation={signupCompany}>
                  {(signupCompany, { loading, error }) => {
                    return (
                      <SignupConfirm
                        confirmationCodeFunc={code =>
                          this.confirmationCodeFunc(
                            code,
                            signupStudent,
                            signupCompany
                          )
                        }
                        loader={loader}
                      />
                    );
                  }}
                </Mutation>
              );
            }}
          </Mutation> */}
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
