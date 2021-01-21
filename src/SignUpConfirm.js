import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./SignUpConfirm.css";

function SignUpConfirm(props) {

    const [confirmCode, setConfirmCode] = useState("");
    const history = useHistory();
    const [error, setError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        if (confirmCode.length === 0) {
            setError("Error: No confirmation code entered, please try again.");
        }
        else {
            try {
                await Auth.confirmSignUp(props.username, confirmCode);
                history.push("/");
            } catch (error) {
                setError(error.message);
            }
        }
    }

    return (
        <div className="confirmForm">
            {
                error &&
                    <Alert variant="danger">
                        {error}
                    </Alert>
            }
            <Alert variant="primary">
                Please check your email for a confirmation code.
            </Alert>
            <h1 id="pageInfo">Confirm Sign Up</h1>
            <Form  onSubmit={handleSubmit}>
                <Form.Group controlId="formConfirmCode">
                    <Form.Label>Confirmation Code</Form.Label>
                    <Form.Control type="text" placeholder="Enter confirmation code" value={confirmCode} onChange={(event) => setConfirmCode(event.target.value)} autoFocus />
                </Form.Group>
                <Button className="submitBtn" variant="primary" type="submit">
                    Create Account
                </Button>
            </Form>
        </div>
    );
}

export default SignUpConfirm;