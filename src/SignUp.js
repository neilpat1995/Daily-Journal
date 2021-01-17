import React, { useState } from "react";
import { Auth } from "aws-amplify";
import SignUpConfirm from "./SignUpConfirm";
import "./Signup.css";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [submittedInitForm, setSubmittedInitForm] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault();
        if (email.length === 0 || password.length === 0 || passwordConfirm.length === 0) {
            alert("Error: At least one form field is empty, please try again.");
        }

        else if (password !== passwordConfirm) {
            alert("Error: Password fields do not match, please try again.");
        }
        else {
            try {
                await Auth.signUp({
                    username: email,
                    password: password
                });
                setSubmittedInitForm(true);
            } catch (error) {
                console.log('error signing up:', error);
            }
        }
    }

    // useEffect(() => {
    //     if(isAuthenticated) {
    //         history.push("/");
    //         alert("You are already logged in.");
    //     }
    // }, [isAuthenticated, history]);

    if (submittedInitForm) {
        return <SignUpConfirm username={email}/>;
    }
    else {
        return (
            <div className="signUpFormContainer">
                <h1> Sign Up </h1>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label><br />
                    <input type="text" name="email" value={email} onChange={(event) => setEmail(event.target.value)} autoFocus /><br /><br />
                    <label htmlFor="password">Password</label><br />
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)} /><br /><br />
                    <label htmlFor="passwordConfirm">Confirm Password</label><br />
                    <input type="password" name="passwordConfirm" value={passwordConfirm} onChange={(event) => setPasswordConfirm(event.target.value)} /><br /><br />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default SignUp;