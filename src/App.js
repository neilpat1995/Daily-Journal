import React, { useState, useEffect } from "react";
import './App.css';
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import logo from "./journal-logo.png";
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Nav } from "react-bootstrap";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  const history = useHistory();

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/");
  }

  return (
    !isAuthenticating && (
      <div>
        <Container className="py-3">
          <Navbar bg="dark" variant="dark" sticky="top" className="mb-3">
            <Navbar.Brand>
              <img
                alt="Journal-Logo"
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
      Daily Journal
          </Navbar.Brand>
            {isAuthenticated &&
              <span className="logoutContainer">
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </span>
            }
          </Navbar>
        </Container>

        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>

      </div>
    )
  );
}

export default App;
