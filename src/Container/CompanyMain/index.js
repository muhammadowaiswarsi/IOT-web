import React from "react";
import CompanyMain from "../../Component/CompanyMain";
import "./index.css";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import routeAction from "./../../store/actions/routeAction";
import { logout } from "./../../Service/AuthService";
import { getCompanyData, getStudents } from "./../../Config/Queries";
// import { AppSync } from "./../../Config/graphql-config";
import ReactLoading from "react-loading";

class CompanyMainContainer extends React.Component {
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
        this.props.Companyauthed(false);
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
        {/* <Query
          fetchPolicy="network-only"
          client={AppSync}
          query={getCompanyData}
          variables={{ companyID: this.props.user.user_id }}
        >
          {({ loading, error, data }) => {
            let currentUser = data && data.getCompanyData;
            if (loading)
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
            return (
              <Query
                fetchPolicy="network-only"
                client={AppSync}
                query={getStudents}
                variables={{ companyID: this.props.user.user_id }}
              >
                {({ loading, error, data }) => {
                  let StudentsData = data.getStudents;
                  return (
                    <CompanyMain
                      logout={this.logout}
                      StudentsData={StudentsData}
                      currentUser={currentUser}
                      loader={loader}
                    />
                  );
                }}
              </Query>
            );
          }}
        </Query> */}
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => {
  return {
    Companyauthed: flag => {
      dispatch(routeAction.Companyauthed(flag));
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
)(CompanyMainContainer);
