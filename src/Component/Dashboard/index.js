import React, { Component } from 'react'
import { Col, Button } from 'react-bootstrap';
import "./index.css";

class ComapanyMain extends Component {


    render() {
        let { StudentsData, currentUser, loader } = this.props
        return (
            <div className="Main">
                <div className="flex-between MB10">
                    <span className="welcome_head MB30">
                        Welcome {currentUser ? `${currentUser.companyName}` : "loading"}
                    </span>
                    <Button className="logount_btn" variant="outline-secondary" onClick={() => this.props.logout()} loader={loader}>Logout</Button>
                </div>


                <div className="cards_main_div">
                    {[1, 2, 3, 4, 5].map((student, index) => {
                        return (
                            <Col key={index} className="Item_main_Col MB20" md={3} lg={3} sm={11} xs={11}>
                                <div className="tex-div">{`Hello world`}</div>
                            </Col>
                        )
                    })}
                </div>

            </div >
        )
    }
}

export default ComapanyMain;