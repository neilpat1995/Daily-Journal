import React, { useState } from "react";
import { Auth } from "aws-amplify";
import SignUpConfirm from "./SignUpConfirm";
import "./Signup.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [submittedInitForm, setSubmittedInitForm] = useState(false);
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (email.length === 0 || password.length === 0 || passwordConfirm.length === 0) {
            setError("Error: At least one form field is empty, please try again.");
        }
        else if (password !== passwordConfirm) {
            setError("Error: Password fields do not match, please try again.");
        }
        else {
            try {
                await Auth.signUp({
                    username: email,
                    password: password
                });
                setSubmittedInitForm(true);
            } catch (error) {
                setError("Error: " + error.message);
            }
        }
    }

    if (submittedInitForm) {
        return <SignUpConfirm username={email} />;
    }
    else {
        return (
            <div className="signupForm">
            {
                error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>
            }
                <h1>Sign Up</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} autoFocus />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control required aria-describedby="passwordHelpText" type="password" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <Form.Text id="passwordHelpText" muted>
                            Password must be at least 8 characters, and a mix of uppercase and lowercase letters, special characters, and numbers.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type="password" placeholder="Repeat password" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} />
                    </Form.Group>
                    <Button className="submitBtn" variant="primary" type="submit">
                        Create Account
                    </Button>
                </Form>
            </div>
        );
    }
}
export default SignUp;