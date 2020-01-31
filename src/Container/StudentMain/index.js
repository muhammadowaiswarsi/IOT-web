import React from "react";
import StudentMain from "../../Component/StudentMain";
import { Query } from "react-apollo";
// import { AppSync } from "./../../Config/graphql-config";
import "./index.css";
import { connect } from "react-redux";
import routeAction from "./../../store/actions/routeAction";
import { logout } from "./../../Service/AuthService";
import { getStudentData, getCompanies } from "./../../Config/Queries";
import ReactLoading from "react-loading";

class StudentMainContainer extends React.Component {
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
        this.props.Studentauthed(false);
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
          query={getStudentData}
          variables={{ StudentID: this.props.user.user_id }}
        >
          {({ loading, error, data }) => {
            let currentUser = data && data.getStudentData;
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
            // if (error) return ;
            return (
              <Query
                fetchPolicy="network-only"
                client={AppSync}
                query={getCompanies}
                variables={{ StudentID: this.props.user.user_id }}
              >
                {({ loading, error, data }) => {
                  let CompaniesData = data.getCompanies;
                  return (
                    <StudentMain
                      logout={this.logout}
                      CompaniesData={CompaniesData}
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
    Studentauthed: flag => {
      dispatch(routeAction.Studentauthed(flag));
    }
  };
};

const mapStatetoProp = state => {
  return {
    user: state.routeReducer.user
  };
};

export default connect(
  mapStatetoProp,
  mapDispatchToProp
)(StudentMainContainer);
