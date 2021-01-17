import { useAppContext } from "./libs/contextLib";
import {
    Route,
    Redirect
} from "react-router-dom";

export default function UnauthenticatedRoute({ children, ...rest }) {
    const { isAuthenticated } = useAppContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                !isAuthenticated ? (
                    children
                ) : (
                        <Redirect to={{
                            pathname: "/",
                            state: { from: location }
                        }} />
                    )
            }
        />
    );
}