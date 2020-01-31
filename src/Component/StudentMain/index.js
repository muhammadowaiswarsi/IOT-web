import React, { Component } from 'react'
import { Col, Button } from 'react-bootstrap';
import "./index.css"


class StudentMain extends Component {
   
    render() {
        let { CompaniesData, currentUser, loader } = this.props
        return (
          <div className="Main">
            <div className="flex-between MB10">
              <span className="welcome_head MB30">
                Welcome
                {currentUser
                  ? ` ${currentUser.firstName} ${currentUser.lastName}`
                  : "loading"}
              </span>
              <Button
                className="logount_btn"
                variant="outline-secondary"
                onClick={() => this.props.logout()}
                loader={loader}
              >
                Logout
              </Button>
            </div>

            <div className="cards_main_div">
              {CompaniesData && CompaniesData.length
                ? CompaniesData.map((company, index) => {
                    return (
                      <Col
                        key={index}
                        className="Item_main_Col MB10"
                        md={3}
                        lg={3}
                        sm={11}
                        xs={11}
                      >
                        <div className="tex-div">{`${company.companyName}`}</div>
                        <div className="tex-div">
                          <span className="tex-span">{company.city}</span>
                          <span className="tex-span ML10">{company.state}</span>
                        </div>
                      </Col>
                    );
                  })
                : null}
            </div>
          </div>
        );
    }
}

export default StudentMain;