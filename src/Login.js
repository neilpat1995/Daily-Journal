import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "./libs/contextLib";
import {
    useHistory,
    useLocation
} from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./Login.css";

function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (email.length === 0 || password.length === 0) {
            setError("Error: At least one form field is empty, please try again.");
        }
        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.replace(from);
        } catch (error) {
            setError("Error: " + error.message);
        }
    }

    return (
        <div className="loginForm">
            {from.pathname !== '/' &&
                <div className="alert">You must be logged in to view the requested page.</div>
            }
            {
                error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>
            }
            <h1> Log In </h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} autoFocus />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                </Form.Group>
                <Button className="submitBtn" variant="primary" type="submit">
                    Log In
                </Button>
            </Form>
        </div>
    );

}

export default Login;