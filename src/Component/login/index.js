import React, { Component } from 'react'
import InputField from "../../Shared/InputField"
import Button from "../../Shared/Button"
// import StudentLogin from '../studentLogin'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: ""
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

    admin = () => {
        this.setState({ admin: true })
        this.props.admin('admin')
    }
    
    goback = () => {
        this.setState({ admin: false })
        this.props.admin('')
    }

    render() {
        let { admin, email, password } = this.state
        let { student, history, loader } = this.props
        let type = ""
        if (student) {
            type = "student"
        } else {
            type = "company"
        }
        return (
            <div>
                <form onSubmit={this.submit}>
                    <InputField label="Username" name="email" id="formBasicEmail" value={email}
                        type="email" placeholder="Student@Yale.edu" onChange={(e) => this.handleChange(e)} />
                    <InputField className="MB30" label="Password" name="password" value={password} id="formBasicPassword"
                        type="password" placeholder="Password2345#" onChange={(e) => this.handleChange(e)} />

                    <div className={admin ? "flex-center MB20" : "flex-between MB20"}>
                        <Button onClick={(e) => this.submit(e)} title="Login" loader={loader} />
                        <Button admin={admin} onClick={() => history.push(`./registration/${type}`)} title="Register" />
                    </div>
                </form>

                <div className="text_align" style={{color:'#007bff', textDecoration:'underline', cursor:'pointer'}} onClick={() => admin ? this.goback() : this.admin()}>{admin ? 'Users Login Here' : 'Admins Login Here'}</div>
            </div>
        )
    }
}

export default Login