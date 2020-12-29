import './App.css';
import Journal from "./Journal";
import Login from "./Login";
import SignUp from "./SignUp";
import {
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <h1> Daily Journal </h1>
          <Journal />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
