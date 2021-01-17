import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { useAppContext } from "./libs/contextLib";
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
        <div className="entryFormContainer">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label><br />
                <input type="text" id="title" name="title" value={title} onChange={(event) => setTitle(event.target.value)}></input><br /><br />
                <label htmlFor="description">Description</label><br />
                <input type="text" id="description" name="description" value={description} onChange={(event) => setDescription(event.target.value)}></input><br /><br />
                <input type="submit" value="Save Changes" /><br />
                <button className="deleteButton" type="button" onClick={() => handleDeleteClick()}>Delete Entry</button>
            </form>
        </div>
    );
}

export default JournalEntry;