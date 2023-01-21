import axios from "axios";
import React, { useState, useContext } from "react";
import UserContext from "../../Context/loggedUserContext";
import { useNavigate } from "react-router-dom";

interface currentSession {
    userInSession: (user: any) => any;
}

const Login = ({userInSession}: currentSession) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const { setSessionId } = useContext(UserContext);

    const navigate = useNavigate();

    const signIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axios.post('http://localhost:8000/api/login', {
            email: email,
            password: password
        })
            .then(res => {
                res.data[0] ? 
                    userInSession(res.data[0])
                    :
                    setErrorMsg(res.data.errorMessage);
                navigate("/dashboard");

            })
            .catch(err => console.log(err));

    };

    return (
        <div>
            <form onSubmit={ signIn }>
                <h2>Sign In</h2>
                <div>
                    <label>Email: </label>
                    <input type="text" onChange={ (e) => setEmail(e.target.value) } />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="text" onChange={ (e) => setPassword(e.target.value) } />
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default Login;