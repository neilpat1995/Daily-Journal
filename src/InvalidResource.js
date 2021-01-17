import { useLocation } from "react-router-dom";

function InvalidResource() {
    let location = useLocation();

    return (
        <div>
            <h3>
                The requested page (<code>{location.pathname}</code>) does not exist.
            </h3>
        </div>
    );
};

export default InvalidResource;