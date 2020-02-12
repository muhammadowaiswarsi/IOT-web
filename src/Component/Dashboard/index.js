import React, { Component } from "react";
import { Col, Button } from "react-bootstrap";
import ReactLoading from "react-loading";

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

  submitFunc = () => {
    let { stage_code_add_mutation } = this.props;
    let { input } = this.state;
    this.setState({
      addLoader: true
    });
    let date = new Date().toISOString().split("T");
    let time = date[1].split(".")[0];
    let timestamp = `${date[0]} ${time}`;

    stage_code_add_mutation({
      variables: {
        code_string: input,
        timestamp
      }
    })
      .then(res => {
        let old_data = JSON.parse(localStorage.getItem("data"));
        if (old_data) {
          old_data.push({
            code_string: input,
            timestamp
          });
          localStorage.setItem("data", JSON.stringify(old_data));
          this.setState({
            data: old_data,
            input: "",
            addLoader: false
          });
        } else {
          let new_data = [
            {
              code_string: input,
              timestamp
            }
          ];
          localStorage.setItem(
            "data",
            JSON.stringify([
              {
                code_string: input,
                timestamp
              }
            ])
          );
          this.setState({
            data: new_data,
            addLoader: false,
            input: ""
          });
        }
      })
      .catch(err => {
        console.log(err, "err");
        this.setState({
          input: "",
          addLoader: false
        });
      });
  };

  componentDidMount() {
    let data = JSON.parse(localStorage.getItem("data"));
    this.setState({
      data
    });

    this.props.subscribeToNewComments();
    this.props.subscribeToNewComments1()
  }

  removeFunc = (item, index) => {
    let { stage_code_delete_mutation } = this.props;
    stage_code_delete_mutation({
      variables: {
        code_string: item.code_string,
        timestamp: item.timestamp
      }
    })
      .then(res => {
        let old_data = JSON.parse(localStorage.getItem("data"));
        if (old_data) {
          old_data.splice(index, 1);
          localStorage.setItem("data", JSON.stringify(old_data));
          this.setState({ data: old_data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    let { loader, items } = this.props;
    let { addLoader } = this.state;
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

        {/* <div className="input-main-div flex-center-center">
          <label className="input-label flex-between-center">
            {" "}
            Input Here:
            <input value={this.state.input} onChange={this.changeValue} />
          </label>
          <Button className="func-button" onClick={this.submitFunc}>
            {addLoader ? (
              <ReactLoading type="spin" width="20px" color="grey" />
            ) : (
              "submit"
            )}
          </Button>
        </div> */}

        <div className="cards_main_div">
          {items && items.length
            ? items.map((item, index) => {
                if (item.code_string !== "null" && item.timestamp !== "null1")
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
                      {/* <Button
                        className="func-button"
                        onClick={() => this.removeFunc(item, index)}
                      >
                        remove
                      </Button> */}
                    </Col>
                  );
              })
            : ""}
        </div>
      </div>
    );
  }
}

export default Dashboard;
