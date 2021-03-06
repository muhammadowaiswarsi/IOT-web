import React from "react";
import Dashboard from "../../Component/Dashboard";
import "./index.css";
import { connect } from "react-redux";
import routeAction from "../../store/actions/routeAction";
import { logout } from "../../Service/AuthService";
import { Query } from "react-apollo";
import {
  stage_code_query,
  on_Delete_stage_code,
  on_Add_stage_code
} from "./../../Config/Queries";

class DashboardContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loader: false,
      storeData: []
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
        localStorage.removeItem("data");
        localStorage.removeItem("user");
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
        <Query query={stage_code_query}>
          {({ data, subscribeToMore }) => {
            let items = data && data.stage_code ? data.stage_code : [];
            return (
              <div>
                <Dashboard
                  logout={this.logout}
                  items={items}
                  subscribeToNewComments={() =>
                    subscribeToMore({
                      document: on_Add_stage_code,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newFeedItem =
                          subscriptionData.data.on_Add_stage_code;
                        return Object.assign({}, prev, {
                          stage_code: [...prev.stage_code, newFeedItem]
                        });
                      }
                    })
                  }
                  subscribeToNewComments1={() => {
                    subscribeToMore({
                      document: on_Delete_stage_code,
                      updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newFeedItem =
                          subscriptionData.data.on_Delete_stage_code;
                        return Object.assign({}, prev, {
                          stage_code: [
                            ...prev.stage_code.filter(time => {
                              if (
                                time.timestamp <= newFeedItem.timestamp &&
                                time.code_string !== newFeedItem.code_string
                              ) {
                                return time;
                              }
                              return "";
                            })
                          ]
                        });
                      }
                    });
                  }}
                  loader={loader}
                />
              </div>
            );
          }}
        </Query>
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

export default connect(mapStateToProp, mapDispatchToProp)(DashboardContainer);
