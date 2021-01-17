import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { useAppContext } from "./libs/contextLib";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

function Journal() {

    const [entries, setEntries] = useState([]);
    const { isAuthenticated } = useAppContext();

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        function getData() {
            const apiName = 'daily-journal';
            const path = '/entries';

            return API.get(apiName, path);
        }

        (async function () {
            const response = await getData();
            setEntries(response);
        })();
    }, [isAuthenticated]);

    function renderAuthPage() {
        return (
            <div>
                <h1 className="home-info">Daily Journal</h1><br />
                <p className="home-info">A tool to track your daily accomplishments</p><br />

                <div className="action-button-group">
                    <LinkContainer to="/signup">
                        <Button variant="primary" size="lg" block>Sign Up</Button>
                    </LinkContainer>
                    <LinkContainer to="/login">
                        <Button variant="primary" size="lg" block>Log In</Button>
                    </LinkContainer>
                </div>
            </div>
        );
    }

    function renderJournal() {
        return (
            <div>
                <p>My Journal</p>
                <ListGroup>{renderJournalEntries(entries)}</ListGroup>
            </div>
        );
    }

    function renderJournalEntries(entries) {
        return (
            <ListGroup>
                <LinkContainer to="/createEntry">
                    <ListGroup.Item action>
                        <span>Create a New Entry</span>
                    </ListGroup.Item>
                </LinkContainer>
                {entries.map(({ entryId, entryTimestamp, title, description }) => (
                    <LinkContainer key={entryId} to={`/entry/${entryId}`}>
                        <ListGroup.Item action>
                            <span>{entryTimestamp}</span> <br />
                            <span>{title}</span> <br />
                            <span>{description}</span> <br />
                        </ListGroup.Item>
                    </LinkContainer>
                ))}
            </ListGroup>
        );
    }

    return (
        <div>
            {isAuthenticated ? renderJournal() : renderAuthPage()}
        </div>
    );
}

export default Journal;