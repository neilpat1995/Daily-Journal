import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "./libs/contextLib";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./JournalEntryForm.css";

function JournalEntryForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    let { isAuthenticated } = useAppContext();
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/");
            alert("Please log in to view the requested page.");
        }
    }, [isAuthenticated, history]);

    function postData() {
        const apiName = 'daily-journal';
        const path = '/entries';
        const myInit = {
            body: {
                title: title,
                description: description,
                timestamp: getCurrentTimestamp(new Date())
            }
        };

        return API.post(apiName, path, myInit);
    }

    const getCurrentTimestamp = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const timeBlock = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + timeBlock;
        return date.toDateString() + " " + strTime;
    };

    async function handleEntrySubmit(event) {
        event.preventDefault();
        if (title.length === 0 || description.length === 0) {
            setError("Error: At least one form field is empty; please try again.");
        }
        else {
            try {
                await postData();
                history.push("/");
            }
            catch(e) {
                setError(e.message);
            }
        }
    }

    return (
        <div>
        {
            error && 
                <Alert variant="danger">
                    {error}
                </Alert>
        }
            <h1 className="formTitle">Create New Entry</h1>

            <Form className="createEntryForm" onSubmit={handleEntrySubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </Form.Group>
                <Button className="submitBtn" variant="primary" type="submit">
                    Create Entry
                </Button>
            </Form>
        </div>
    );

}

export default JournalEntryForm;