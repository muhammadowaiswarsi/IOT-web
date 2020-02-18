import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";

import "./index.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      addLoader: false
    };
  }

  changeValue = e => {
    this.setState({
      input: e.target.value
    });
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("data"));
    this.setState({
      data
    });

    this.props.subscribeToNewComments();
    this.props.subscribeToNewComments1();
  }

  render() {
    let { loader, items } = this.props;
    let name = JSON.parse(localStorage.getItem("user"));
    name = name && name.name;
    return (
      <div className="Main">
        <div className="flex-between MB10">
          <span className="welcome_head MB30">Welcome {`${name}`}</span>
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
          {items && items.length
            ? items.map((item, index) => {
                if (item.code_string !== "null" && item.timestamp !== "null1") {
                  return (
                    <Col
                      key={index}
                      className="Item_main_Col MB20"
                      md={3}
                      lg={3}
                      sm={11}
                      xs={11}
                    >
                      <div className="tex-div">{item.code_string}</div>
                    </Col>
                  );
                }
                return "";
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default Dashboard;
