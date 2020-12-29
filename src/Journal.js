import { Component } from "react";
import JournalEntry from "./JournalEntry";
import JournalEntryForm from "./JournalEntryForm";

class Journal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            entries: new Array(),
            title: "",
            description: ""
        };

    }

    handleEntryChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleEntrySubmit = (event) => {
        event.preventDefault();
        // Create and append new journal entry to the journal
        const newEntry = {
            title: this.state.title,
            description: this.state.description,
            creationDate: new Date().toString()
        };

        const updatedJournal = this.state.entries.slice();
        updatedJournal.push(newEntry);

        // TODO: Change this to prevent depending on up-to-date state (they can be batched)
        this.setState({
            entries: updatedJournal,
            title: "",
            description: ""
        });
    }

    render() {
        const entryList = this.state.entries.map((entry, index) => {
            return (
                <JournalEntry key={index} title={entry.title} description={entry.description} creationDate={entry.creationDate} />
            );
        });
        return (
            <div>
                <div className="newJournalEntry">
                    <JournalEntryForm handleEntryChange={this.handleEntryChange} handleEntrySubmit={this.handleEntrySubmit} title={this.state.title} description={this.state.description} />
                </div>
                <div className="journal">
                    <ul>
                        {entryList}
                    </ul>
                </div>
            </div>
        );
    }

}

export default Journal;