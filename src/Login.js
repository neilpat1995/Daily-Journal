import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "./libs/contextLib";
import { useHistory } from "react-router-dom";

function Login() {
    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/");
        } catch (error) {
            alert(error.message);
        }
    }

    useEffect(() => {
        if(isAuthenticated) {
            history.push("/");
            alert("You are already logged in.");
        }
    }, [isAuthenticated, history]);

    return (
        <div>
            <h1> Login </h1>
            <form onSubmit={handleSubmit}>
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