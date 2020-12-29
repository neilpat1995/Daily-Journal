function JournalEntryForm(props) {

    return (
        <form onSubmit={props.handleEntrySubmit}>
            <label htmlFor="titleText">Title:</label><br />
            <input type="text" id="titleText" name="title" value={props.title} onChange={props.handleEntryChange}></input><br /><br />
            <label htmlFor="descriptionText">Description:</label><br />
            <input type="text" id="descriptionText" name="description" value={props.description} onChange={props.handleEntryChange}></input><br /><br />
            <input type="submit" value="Submit" />
        </form>
    );

}

export default JournalEntryForm;