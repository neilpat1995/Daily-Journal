import React, { useState } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function SignUpConfirm(props) {

    const [confirmCode, setConfirmCode] = useState("");
    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        if (confirmCode.length === 0) {
            alert("Error: No confirmation code entered, please try again.");
        }
        else {
            try {
                await Auth.confirmSignUp(props.username, confirmCode);
                history.push("/");
              } catch (error) {
                  console.log('error confirming sign up', error);
              }
        }
    }

    return (
        <div>
            <p>A confirmation code has been sent to your email. Please enter it below.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="confirmCode">Confirmation Code:</label><br />
                <input type="text" name="confirmCode" onChange={(event) => setConfirmCode(event.target.value)} /><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default SignUpConfirm;