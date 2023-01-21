import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../Context/loggedUserContext";

const Logout = () => {
    const { _setSessionId } = useContext(UserContext);

    const navigate = useNavigate();

    const signOut = () => {
        _setSessionId("");
        navigate("/");
    };

    return (
        <button onClick={signOut}>Logout</button>
    );
};

export default Logout;