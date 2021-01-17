import { Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Journal from "./Journal";
import JournalEntryForm from "./JournalEntryForm";
import JournalEntry from "./JournalEntry";
import InvalidResource from "./InvalidResource";

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Journal />
      </Route>
      <Route exact path="/signup">
        <SignUp />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/createEntry">
        <JournalEntryForm />
      </Route>
      <Route exact path="/entry/:entryId">
        <JournalEntry />
      </Route>
      <Route path="*">
          <InvalidResource />
      </Route>
    </Switch>
  );
}

export default Routes;