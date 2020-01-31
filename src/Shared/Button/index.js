import React from "react"
import { Button } from "react-bootstrap";
import ReactLoading from "react-loading";

import "./index.css"

const ButtonComponent = ({ title, onClick, type, loader, admin }) => {
  return (
    <Button style={{ display: admin ? 'none' : '' }} className="btn_style" type={type ? type : null} onClick={onClick}>
      {loader ? (
        <ReactLoading
          type={"spin"}
          color={"#e91e63"}
          height={"20px"}
          width={"20px"}
        />
      ) : null}
      {title ? title : null}
    </Button>
  );
}

export default ButtonComponent;