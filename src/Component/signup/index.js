import React, { Component } from "react";
import InputField from "./../../Shared/InputField";
import Button from "./../../Shared/Button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = e => {
    e.preventDefault();
    let {
      name,
      email,
      password,
      confirmPassword
    } = this.state;
    let obj = {
      name,
      email,
      password,
      confirmPassword,
    };
    this.props.submit(obj);
  };

  render() {
    let {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;
    let { loader } = this.props;
    return (
      <form onSubmit={this.submit}>
        <InputField
          name="name"
          label="Name"
          type="name"
          placeholder=""
          value={name}
          onChange={e => this.handleChange(e)}
        />

        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Student@Yale.edu"
          value={email}
          onChange={e => this.handleChange(e)}
        />

        <InputField
          name="password"
          value={password}
          label="Password"
          type="password"
          placeholder=""
          onChange={e => this.handleChange(e)}
        />

        <InputField
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          type="password"
          placeholder=""
          onChange={e => this.handleChange(e)}
        />

        <div className="flex-between">
          <Button onClick={() => this.props.history.push("/login")} title="Login" />
          <Button type="submit" title="Register" loader={loader} />
        </div>
      </form>
    );
  }
}

export default Signup;
