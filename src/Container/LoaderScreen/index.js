import React from "react";
import { isLoggedIn } from "./../../Service/AuthService";
import routeAction from "./../../store/actions/routeAction";
import { connect } from "react-redux";
import ReactLoading from "react-loading";

class Loading extends React.Component {
  componentDidMount() {
    isLoggedIn()
      .then(res => {
        if (res.attributes.sub) {
          let user = res.attributes;
          let obj = {
            user_id: user.sub
          }
          this.props.user(obj);
          setTimeout(() => {
            this.props.authed(false);
          }, 100);
          this.props.history.replace(`/dashboard`);
        }
      })
      .catch(err => {
        this.props.authed(false);
        this.props.history.replace("/login");
        console.log(err);
      });
  }

  render() {
    return (
      <div
        style={{
          margin: "0 auto",
          width: "20%",
          position: "absolute",
          top: "25%",
          left: "25%",
          right: "25%"
        }}
      >
        <ReactLoading
          type={"bubbles"}
          color={"#e91e63"}
          height={"20%"}
          width={"100%"}
        />
      </div>
    );
  }
}

const dispatchToProp = dispatch => {
  return {
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
)(Loading);
