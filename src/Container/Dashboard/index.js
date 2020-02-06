import React from "react";
import Dashboard from "../../Component/Dashboard";
import "./index.css";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import routeAction from "../../store/actions/routeAction";
import { logout } from "../../Service/AuthService";
import { stage_code_add, stage_code_delete } from "../../Config/Queries";
import { AppSync } from "./../../Config/graphql-config";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false
    };
  }

  logout = () => {
    this.setState({
      loader: true
    });
    logout()
      .then(res => {
        this.setState({
          loader: false
        });
        localStorage.removeItem(
          "data"
        )
        localStorage.removeItem("user")
        this.props.authed(false);
        this.props.history.replace("/login");
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
      <div className="MainContainer">
        <Mutation
          client={AppSync}
          mutation={stage_code_add}
        >
          {(stage_code_add_mutation) => {
            return (
              <Mutation
                client={AppSync}
                mutation={stage_code_delete}
              >
                {(stage_code_delete_mutation) => {
                  return (
                    <div>
                      <Dashboard
                        logout={this.logout}
                        stage_code_add_mutation={stage_code_add_mutation}
                        stage_code_delete_mutation={stage_code_delete_mutation}
                        loader={loader}
                      />
                    </div>
                  );
                }}
              </Mutation>
            );
          }}
        </Mutation>
      </div>
    );
  }
}


const mapDispatchToProp = dispatch => {
  return {
    authed: flag => {
      dispatch(routeAction.authed(flag));
    }
  };
};

const mapStateToProp = state => {
  return {
    user: state.routeReducer.user
  };
};

export default connect(
  mapStateToProp,
  mapDispatchToProp
)(DashboardContainer);
