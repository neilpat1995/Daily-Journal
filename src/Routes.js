import { Route, Switch } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Journal from "./Journal";
import JournalEntryForm from "./JournalEntryForm";
import JournalEntry from "./JournalEntry";
import InvalidResource from "./InvalidResource";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

function Routes(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Journal />
      </Route>
      <UnauthenticatedRoute exact path="/signup">
        <SignUp />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/createEntry">
        <JournalEntryForm />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/entry/:entryId">
        <JournalEntry />
      </AuthenticatedRoute>
      <Route path="*">
          <InvalidResource />
      </Route>
    </Switch>
  );
}

export default Routes;