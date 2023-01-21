import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserContext from "../../Context/loggedUserContext";

const UserForm = (props: { allUsers: any, setAllUsers: any }) => {
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [confirmationError, setConfirmationError] = useState("");

    const [formError, setFormError] = useState("");

    const {allUsers, setAllUsers} = props;

    const { setUserInSession, _setSessionId } = useContext(UserContext);

    const navigate = useNavigate();

    const handleFirstname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);

        if(e.target.value.length < 2) {
            setFirstNameError("First name field must be atleast 2 characters in length.");
        } else {
            setFirstNameError("");
        }
    };

    const handleLastname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);

        if(e.target.value.length < 2) {
            setLastNameError("Last name field must be atleast 2 characters in length.");
        } else {
            setLastNameError("");
        }
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);

        if(e.target.value.length < 5) {
            setEmailError("Email field must be atleast 5 characters in length.");
        } else {
            setEmailError("");
        }
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);

        if(e.target.value.length < 8) {
            setPasswordError("Password must be atleast 8 characters in length.");
        } else {
            setPasswordError("");
        }
    };

    const handlePasswordConfirmation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordConfirmation(e.target.value);

        console.log("*****PW", password, " \n Confirmation", passwordConfirmation, password === passwordConfirmation );

        if(e.target.value.length < 8) {
            setConfirmationError("Input for Confirm Password must be atleast 8 characters.");
        } else {
            setConfirmationError("");
        }
    };

    const createUser = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        // const newUser = {
        //     username: username,
        //     email: email,
        //     password: password
        // };

        // or 

        if(firstName.length != 0 && lastName.length != 0 && email.length != 0 && password.length != 0 && passwordConfirmation.length != 0) {
            axios.post('http://localhost:8000/api/users/create', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                access_token: ""
            })
                .then(res => {
                    console.log("Creating user!!! Sending Form!!", res);
                    console.log(res.data);
                    setAllUsers([...allUsers, res.data.New_User]);
                    setUserInSession(res.data.New_User);
                    _setSessionId(res.data.New_User._id);
                    localStorage.setItem("sessionId", res.data.New_User._id);
                    console.log("Local Storage Test^^^^^^^^^^ ", localStorage.getItem("sessionId"), res.data.New_User._id);
                })
                .catch(err => console.log(err));

            const newUser = { firstName, lastName, email, password, passwordConfirmation };

            // props.onNewUser( newUser );

            console.log("Welcome", newUser);

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setPasswordConfirmation("");
            navigate("/dashboard");
        } else {
            setFormError("Form is invalid!");
            navigate("/");
        };

    };

    return (
        <div>
            <br/>
            <br/>
            {formError ? <p>{ formError }</p> : null }
            <br/>
            <form onSubmit={ createUser }>
                <h2>Register</h2>
                <div>
                    <label>First Name: </label>
                    <input type="text" onChange={ handleFirstname } value={ firstName } />
                </div>
                {firstNameError ? <p>{ firstNameError }</p> : null }
                <div>
                    <label>Last Name: </label>
                    <input type="text" onChange={ handleLastname } value={ lastName } />
                </div>
                {lastNameError ? <p>{ lastNameError }</p> : null }
                <div>
                    <label>Email: </label>
                    <input type="text" onChange={ handleEmail } value={ email } />
                </div>
                {emailError ? <p>{ emailError }</p> : null }
                <div>
                    <label>Password: </label>
                    <input type="text" onChange={ handlePassword } value={ password } />
                </div>
                {passwordError ? <p>{ passwordError }</p> : null }
                <div>
                    <label>Confirm Password: </label>
                    <input type="text" onChange={ handlePasswordConfirmation } value={ passwordConfirmation } />
                </div>
                {confirmationError ? <p>{ confirmationError }</p> : null }
                {passwordConfirmation != password ? <p>Passwords do not match!</p> : null }
                {
                    firstNameError ? 
                        <input type="submit" value="Submit" disabled/>
                    :
                    lastNameError ?
                        <input type="submit" value="Submit" disabled/>
                    :
                    emailError ?
                        <input type="submit" value="Submit" disabled/>
                    :
                    passwordError ? 
                        <input type="submit" value="Submit" disabled/>
                    :
                    passwordConfirmation != password ?
                        <input type="submit" value="Submit" disabled/>
                    :
                        <input type="submit" value="Submit"/>
                }
            </form>
        </div>
    );

};

export default UserForm;