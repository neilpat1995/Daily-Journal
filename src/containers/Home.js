import "./Home.css";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";

function Home(props) {

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

export default Home;