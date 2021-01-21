import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "./libs/contextLib";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./JournalEntry.css";

const JournalEntry = () => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const { entryId } = useParams();
    const history = useHistory();
    let { isAuthenticated } = useAppContext();

    useEffect(() => {
        console.log("Now in useEffect() call in JournalEntry!");
        // Make API request to get current journal entry details
        function getData() {
            const apiName = 'daily-journal';
            const path = `/entries/${entryId}`;
            return API.get(apiName, path);
        }

        (async function () {
            try {
                const response = await getData();
                setTitle(response.title);
                setDescription(response.description);
            }
            catch(err) {
                console.log(`[ERROR] Attempting to load currently viewed journal entry failed: ${err}`);
            }
        })();
    }, [entryId]);

    // Prevent unauthenticated users from viewing an entry 
    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/");
            alert("Please log in to view the requested page.");
        }
    }, [isAuthenticated,history]);

    // Update journal entry
    const handleSubmit = (event) => {
        event.preventDefault();
        // Make API request to update current journal entry
        async function updateData() {
            const apiName = 'daily-journal';
            const path = `/entries/${entryId}`;
            const requestData = {
                body : {
                    title: title,
                    description: description
                }
            };

            try {
                await API.put(apiName, path, requestData);
                alert("Your entry was successfully updated.");
                history.push("/");
            } catch(err) {
                console.log(`[ERROR] Attempting to update currently viewed journal entry failed: ${err}`);
            }
        }

        updateData();
        
    }

    // Delete journal entry
    const handleDeleteClick = () => {
        async function deleteData() {
            const apiName = "daily-journal";
            const path = `/entries/${entryId}`;
            try {
                await API.del(apiName, path);
                alert("Entry was successfully deleted.");
            }
            catch(err) {
                console.log(`[ERROR] Attempting to delete currently viewed journal entry failed: ${err}`);
            }
        }
        deleteData();
        history.push("/");
    }

    return (
        <div>
            <h1 className="formTitle">View Entry</h1>
            <Form className="entryForm" onSubmit={handleSubmit}>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" value={title} onChange={(event) => setTitle(event.target.value)} autoFocus />
                </Form.Group>

                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" placeholder="Enter description" value={description} onChange={(event) => setDescription(event.target.value)} />
                </Form.Group>
                <Button className="btn" variant="primary" type="submit">
                    Update Entry
                </Button>
                <br />
                <Button className="btn" variant="danger" type="button" onClick={() => handleDeleteClick()}>
                    Delete Entry
                </Button>
            </Form>
        </div>
    );
}

export default JournalEntry;