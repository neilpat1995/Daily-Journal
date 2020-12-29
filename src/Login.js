import { Component } from "react";
import { signIn } from "./authUtils";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        signIn(this.state.email, this.state.password);
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        return (
            <div>
                <h1> Login </h1>
                <form onSubmit={this.handleSubmit}>
                    <label for="emailText">Email address</label><br />
                    <input type="text" name="emailText" value={this.state.email} onChange={this.handleChange} autoFocus/><br /><br />
                    <label for="passwordText">Password</label><br />
                    <input type="text" name="passwordText" value={this.state.password} onChange={this.handleChange} /><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }

}

export default Login;