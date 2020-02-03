import React, { Component } from 'react'
import InputField from "../../Shared/InputField"
import Button from "../../Shared/Button"
// import StudentLogin from '../studentLogin'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "josic13045@cnetmail.net",
            password: "Hello123!"
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submit = (e) => {
        e.preventDefault()
        let { email, password } = this.state
        let obj = {
            email,
            password
        }
        this.props.login(obj)
    }

    goback = () => {
        this.setState({ admin: false })
        this.props.admin('')
    }

    render() {
        let { email, password } = this.state
        let { history, loader } = this.props
        return (
            <div>
                <form onSubmit={this.submit}>
                    <InputField label="Email" name="email" id="formBasicEmail" value={email}
                        type="email" placeholder="Student@Yale.edu" onChange={(e) => this.handleChange(e)} />
                    <InputField className="MB30" label="Password" name="password" value={password} id="formBasicPassword"
                        type="password" placeholder="Password2345#" onChange={(e) => this.handleChange(e)} />

                    <div className={"flex-between MB20"}>
                        <Button onClick={(e) => this.submit(e)} title="Login" loader={loader} />
                        <Button onClick={() => history.push(`./registration`)} title="Register" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Login