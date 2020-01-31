import React, { Component } from "react";
import InputField from "./../../Shared/InputField";
import Button from "./../../Shared/Button";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      state: "",
      company: "",
      city: ""
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = e => {
    let { type } = this.props.params;
    e.preventDefault();
    let {
      email,
      password,
      firstName,
      lastName,
      phone,
      state,
      city,
      company,
      confirmPassword
    } = this.state;
    let obj = {
      email,
      firstName,
      lastName,
      phone,
      state,
      city,
      company,
      password,
      confirmPassword,
      profile: type
    };
    this.props.submit(obj);
  };

  render() {
    let {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      state,
      city,
      company
    } = this.state;
    let { type } = this.props.params;
    let { loader } = this.props;
    return (
      <form onSubmit={this.submit}>
        {type === "student" ? (
          <span>
            <InputField
              name="firstName"
              label="First Name"
              type="name"
              placeholder=""
              value={firstName}
              onChange={e => this.handleChange(e)}
            />

            <InputField
              name="lastName"
              label="Last Name"
              type="name"
              placeholder=""
              value={lastName}
              onChange={e => this.handleChange(e)}
            />
          </span>
        ) : (
            <InputField
              name="company"
              label="Company Name"
              type="name"
              placeholder=""
              value={company}
              onChange={e => this.handleChange(e)}
            />
          )}

        <InputField
          name="email"
          label="Email"
          type="email"
          placeholder="Student@Yale.edu"
          value={email}
          onChange={e => this.handleChange(e)}
        />

        <InputField
          name="phone"
          label="Phone"
          type="number"
          placeholder=""
          value={phone}
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

        <InputField
          name="state"
          label="State"
          type="text"
          placeholder=""
          value={state}
          onChange={e => this.handleChange(e)}
        />

        <InputField
          name="city"
          label="City"
          type="text"
          placeholder=""
          value={city}
          onChange={e => this.handleChange(e)}
        />
        <div className="flex-end MB30">
          <Button type="submit" title="Sign Up" loader={loader} />
        </div>
      </form>
    );
  }
}

export default Signup;
