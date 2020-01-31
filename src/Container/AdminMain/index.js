import React from "react";
import AdminMain from "../../Component/AdminMain";
import { Query } from "react-apollo";
// import { AppSync } from "./../../Config/graphql-config";
import "./index.css";
import { connect } from "react-redux";
import routeAction from "./../../store/actions/routeAction";
import { Error } from "./../../Shared/Error";
import { Col, Form, Row } from "react-bootstrap";
import { logout } from "./../../Service/AuthService";
import { getStudents, getCompanies } from "./../../Config/Queries";

class AdminMainContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loader: false,
            student: true,
            company: false,
        };
    }

    handleChange = e => {
        if (e.target.id === "formHorizontalRadios1") {
            this.setState({
                student: true,
                company: false,
            });
        } else {
            this.setState({
                student: false,
                company: true,
            });
        }
    };

    logout = () => {
        this.setState({
            loader: true
        });
        logout()
            .then(res => {
                this.setState({
                    loader: false
                });
                this.props.Adminauthed(false);
                this.props.history.push("/login");
            })
            .catch(err => {
                this.setState({
                    loader: false
                });
                console.log(err);
            });
    };

    render() {
        let { loader, student, company } = this.state;
        return (
            <div style={{ margin: 10 }} className="MainContainer">
                <div className="LoginContainer">
                    <Error errMessage={this.state.error} />
                    <Row>
                        <Col md={4} lg={4} sm={1} xs={1}></Col>
                        <Col
                            md={4}
                            lg={4}
                            sm={10}
                            xs={10}
                        >
                            <div className="flex MB20">
                                <span
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

                                <span
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
                        </Col>
                        <Col md={4} lg={4} sm={1} xs={1}></Col>
                    </Row>
                    {/* <Query
                        fetchPolicy="network-only"
                        client={AppSync}
                        query={getStudents}
                        variables={{ companyID: this.props.user.user_id }}
                    >
                        {({ loading, error, data }) => {
                            let StudentsData = data.getStudents;
                            return (
                                <Query
                                    fetchPolicy="network-only"
                                    client={AppSync}
                                    query={getCompanies}
                                    variables={{ studentID: this.props.user.user_id }}
                                >
                                    {({ loading, error, data }) => {
                                        let CompanyData = data.getCompanies
                                        return (

                                            <AdminMain
                                                logout={this.logout}
                                                StudentsData={student ? StudentsData : null}
                                                CompaniesData={company ? CompanyData : null}
                                                // currentUser={currentUser}
                                                loader={loader}
                                            />
                                        )
                                    }}
                                </Query>
                            );
                        }}
                    </Query> */}
                </div>
            </div>
        );
    }
}

const mapDispatchToProp = dispatch => {
    return {
        Adminauthed: flag => {
            dispatch(routeAction.Adminauthed(flag));
        },
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
)(AdminMainContainer);
