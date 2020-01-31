import React from "react";
import Login from "../../Component/login";
import { Col, Form } from "react-bootstrap";
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
      student: true,
      company: false,
      loader: false,
      error: "",
      admin: false,
    };
  }

  handleChange = e => {
    if (e.target.id === "formHorizontalRadios1") {
      this.setState({
        student: true,
        company: false,
        admin: false
      });
    } else if (e.target.id === "formHorizontalRadios2") {
      this.setState({
        student: false,
        company: true,
        admin: false
      });
    } else {
      this.setState({
        student: false,
        company: false,
        admin: true
      });
    }
  };

  componentDidMount() {
    isLoggedIn()
      .then((res) => {
        if (res.attributes.sub) {
          let userProfile = res.attributes.profile
          console.log(userProfile)
          if (userProfile === "student") {
            this.props.Studentauthed(true)
            setTimeout(() => {
              this.props.history.replace(`/${res.attributes.profile}/main`)
            }, 100);
          }
          if (userProfile === "company") {
            this.props.Companyauthed(true)
            setTimeout(() => {
              this.props.history.replace(`/${res.attributes.profile}/main`)
            }, 100);
          }
          if (userProfile === "admin") {
            this.props.Adminauthed(true)
            setTimeout(() => {
              this.props.history.replace(`/${res.attributes.profile}/main`)
            }, 100);
          }
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  loginFunc = obj => {
    let { email, password } = obj;
    let { student, company, admin } = this.state;
    this.setState({
      loader: true
    });
    login(email, password)
      .then(res => {
        let user = res.attributes;
        let obj = {
          email: user.email,
          user_id: user.sub
        };
        this.props.user(obj);
        this.setState({
          loader: false
        });
        if (user.profile === "student" && student) {
          this.props.Studentauthed(true)
          this.props.history.replace("/student/main");
        } else if (user.profile === "company" && company) {
          this.props.Companyauthed(true)
          this.props.history.replace("/company/main");
        } else if (user.profile === 'admin' && admin) {
          this.props.Adminauthed(true)
          this.props.history.replace("/admin/main")
        } else {
          console.log("user not exist");
          this.setState({
            loader: false,
            error: "user not exist"
          });
        }
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
    let { student, company, loader, admin } = this.state;
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
          <div className="flex MB20">
            <span style={{ display: admin ? 'none' : '' }}
              className={
                student ? "tabs_border_selected" : "tabs_border_unselected"
              }
            >
              <Form.Check
                inline
                type="radio"
                label="Student"
                id="formHorizontalRadios1"
                checked={student}
                onChange={e => this.handleChange(e)}
              />
            </span>

            <span style={{ display: admin ? 'none' : '' }}
              className={
                company ? "tabs_border_selected" : "tabs_border_unselected"
              }
            >
              <Form.Check
                inline
                type="radio"
                label="Company"
                id="formHorizontalRadios2"
                checked={company}
                onChange={e => this.handleChange(e)}
              />
            </span>
          </div>

          <Login
            login={obj => this.loginFunc(obj)}
            student={student}
            company={company}
            admin={(e) => this.setState({ admin: e === 'admin' ? true : false })}
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
    Studentauthed: flag => {
      dispatch(routeAction.Studentauthed(flag));
    },
    Companyauthed: flag => {
      dispatch(routeAction.Companyauthed(flag));
    },
    Adminauthed: flag => {
      dispatch(routeAction.Adminauthed(flag));
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
