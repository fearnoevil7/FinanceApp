import React, { useEffect, useContext, useCallback, useState } from "react";
import { BrowserRouter, Routes, Route, Link, Router, useNavigate } from 'react-router-dom';

import Header from "./Components/Headers";
import Products from "./Components/ProductTypes/Products";
import Items from "./Components/ProductTypes/Items";
import Context from "./Context";

import styles from "./App.module.scss";
import UserForm from "./Components/UserForm";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import UserContext from "./Context/loggedUserContext";
import ConnectBank from "./Components/ConnectBank";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [sessionId, setSessionId] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const { linkSuccess, isItemAccess, isPaymentInitiation, dispatch } = useContext(Context);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const init = async () => {
      console.log("Current user in session...     ", currentUser);
    };
    init();
  })

  const signInUser = (User: any) => {
    setSessionId(User._id);
    setCurrentUser(User);
    localStorage.setItem("sessionId", User._id);
    console.log("Local Storage Test^^^^^^^^^^ ", localStorage.getItem("sessionId"), User._id);

    // navigate("/connect");

  };

  return (
    <div className={styles.App}>
      <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.container}>
          {/* <Header /> */}

          {
            
              <>
                <UserContext.Provider value={{"UserInSession": currentUser, "SessionId" : sessionId, "setUserInSession" : setCurrentUser}}>
                  <Routes>
                    <Route path="/connect" element={ <ConnectBank /> }></Route>
                  </Routes>
                </UserContext.Provider>
                <br></br>
                <br></br>
                <br></br>
                <UserContext.Provider value={{"_setSessionId" : setSessionId}}>
                  <Routes>
                    <Route path="/dashboard" element={ <Logout /> }></Route>
                  </Routes>
                </UserContext.Provider>
                <UserContext.Provider value={{ "UserInSession": currentUser, "SessionId" : sessionId, "setUserInSession" : setCurrentUser, "_setSessionId" : setSessionId }} >
                  <Routes>
                    <Route path="/dashboard" element={ <Dashboard /> } ></Route>
                  </Routes>
                </UserContext.Provider>
              
              
              
                <div>
                  <UserContext.Provider value={{"setUserInSession" : setCurrentUser, "_setSessionId" : setSessionId}} >
                    <Routes>
                      <Route path="/" element={ <UserForm allUsers={users} setAllUsers={setUsers}/> }></Route>
                    </Routes>
                  </UserContext.Provider>
                </div>
                <div>
                  <Routes>
                    <Route path="/" element={ <Login userInSession={ signInUser } /> }></Route>
                  </Routes>
                </div>
              </>
          }
          
        </div>
      </BrowserRouter>
      </div>
    </div>
  );
};

export default App;
