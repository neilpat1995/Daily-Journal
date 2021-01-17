import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "./libs/contextLib";

function JournalEntryForm() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const history = useHistory();
    let { isAuthenticated } = useAppContext();

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
                timestamp: new Date().toString()
            }
        };

        return API.post(apiName, path, myInit);
    }

    async function handleEntrySubmit(event) {
        event.preventDefault();
        if (title.length === 0 || description.length === 0) {
            alert("Error: At least one form field is empty; please try again.");
        }
        else {
            try {
                await postData();
                history.push("/");
            }
            catch(e) {
                console.log(e);
            }
        }
    }

    return (
        <div>
            <h1>Create New Entry</h1>
            <form onSubmit={handleEntrySubmit}>
                <label htmlFor="titleText">Title</label><br />
                <input type="text" id="titleText" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input><br /><br />
                <label htmlFor="descriptionText">Description</label><br />
                <input type="text" id="descriptionText" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input><br /><br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );

}

export default JournalEntryForm;