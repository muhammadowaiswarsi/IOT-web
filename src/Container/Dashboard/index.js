import React from "react";
import Dashboard from "../../Component/Dashboard";
import "./index.css";
import { connect } from "react-redux";
import { Mutation } from "react-apollo";
import routeAction from "../../store/actions/routeAction";
import { logout } from "../../Service/AuthService";
import { stage_code_add, stage_code_delete } from "../../Config/Queries";
import { AppSync } from "./../../Config/graphql-config";
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
        <Mutation client={AppSync} mutation={stage_code_add}>
          {stage_code_add_mutation => {
            return (
              <Mutation client={AppSync} mutation={stage_code_delete}>
                {stage_code_delete_mutation => {
                  return (
                    <Query query={stage_code_query}>
                      {({ data, subscribeToMore }) => {
                        let items =
                          data && data.stage_code ? data.stage_code : [];
                        let getData = JSON.parse(localStorage.getItem("data"));
                        Array.prototype.push.apply(items, getData);
                        const uniqueObjects = [
                          ...new Map(
                            items.map(item => [item.timestamp, item])
                          ).values()
                        ];
                        localStorage.setItem(
                          "data",
                          JSON.stringify(uniqueObjects)
                        );
                        return (
                          <div>
                            <Dashboard
                              logout={this.logout}
                              stage_code_add_mutation={stage_code_add_mutation}
                              items={uniqueObjects}
                              stage_code_delete_mutation={
                                stage_code_delete_mutation
                              }
                              subscribeToNewComments={() =>
                                subscribeToMore({
                                  document: on_Add_stage_code,
                                  updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) return prev;
                                    const newFeedItem =
                                      subscriptionData.data.on_Add_stage_code;
                                    let old_data = JSON.parse(
                                      localStorage.getItem("data")
                                    );
                                    // if (old_data) {
                                    //   old_data.push(newFeedItem);
                                    //   localStorage.setItem(
                                    //     "data",
                                    //     JSON.stringify(old_data)
                                    //   );
                                    // } else {
                                    //   localStorage.setItem(
                                    //     "data",
                                    //     JSON.stringify([newFeedItem])
                                    //   );
                                    // }
                                    return Object.assign({}, prev, {
                                      stage_code: [
                                        ...prev.stage_code,
                                        newFeedItem
                                      ]
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
                                      subscriptionData.data
                                        .on_Delete_stage_code;
                                    let old_data = JSON.parse(
                                      localStorage.getItem("data")
                                    );
                                    if (old_data) {
                                      old_data = old_data.filter(
                                        data =>
                                          data.timestamp !==
                                          newFeedItem.timestamp
                                      );
                                      localStorage.setItem(
                                        "data",
                                        JSON.stringify(old_data)
                                      );
                                    }
                                    return Object.assign({}, prev, {
                                      stage_code: [
                                        ...prev.stage_code.filter(
                                          time =>
                                            time.timestamp !==
                                            newFeedItem.timestamp
                                        )
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

export default connect(mapStateToProp, mapDispatchToProp)(DashboardContainer);
