import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "./libs/contextLib";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import "./Login.css";

function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.replace(from);
        } catch (error) {
            alert(error.message);
        }
    }

    return (
        <div className="loginFormContainer">
            {from.pathname !== '/' &&
                <div className="alert">You must be logged in to view the requested page.</div>
            }
            <h1> Login </h1>
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email address</label><br />
                <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} autoFocus /><br /><br />
                <label htmlFor="password">Password</label><br />
                <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

}

export default Login;