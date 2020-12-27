function JournalEntry(props) {

    return (
        <li>
            {props.title}: {props.description} (at {props.creationDate})
        </li>
    );
}

export default JournalEntry;