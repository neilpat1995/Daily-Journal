import { useAppContext } from "./libs/contextLib";
import {
    Route,
    Redirect
} from "react-router-dom";

export default function AuthenticatedRoute({ children, ...rest }) {
    let { isAuthenticated } = useAppContext();

    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuthenticated ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}