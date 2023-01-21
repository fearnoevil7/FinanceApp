import React, { useContext, useEffect, useCallback, useState } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";

import Products from "../ProductTypes/Products";
import UserContext from "../../Context/loggedUserContext";
import Context from "../../Context/index";
import Logout from "../Logout";
import ConnectBank from "../ConnectBank";

const UserDashboard = () => {
    const { linkSuccess, isItemAccess, linkToken, isPaymentInitiation, dispatch } = useContext(Context);
    const { UserInSession, SessionId, setUserInSession} = useContext(UserContext);
    const [killSwitch, setKillSwitch] = useState(false);
    const navigate = useNavigate();

    console.log("$$$$$$$$$$$", localStorage.getItem('sessionId'), typeof(localStorage.getItem('sessionId')));

    const OAuthLink = () => {

        const linkToken = localStorage.getItem("link_token");

        const onSuccess = React.useCallback(
            (public_token: string) => {
              console.log(`******* Step 4: Get back our short-lived public token: ${public_token}`);
              console.log("$$$$$$$$$$$", localStorage.getItem('sessionId'), typeof(localStorage.getItem('sessionId')));

              console.log("&&&&&&&.      ",  )
              // If the access_token is needed, send public_token to server
              const exchangePublicTokenForAccessToken = async () => {
                console.log("******* Step 5: Send this token to our server to exchange it for an access token");
                const response = await fetch("/api/set_access_token/" + localStorage.getItem('sessionId'), {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
                  },
                  body: `public_token=${public_token}`,
                });
                if (!response.ok) {
                  dispatch({
                    type: "SET_STATE",
                    state: {
                      itemId: `no item_id retrieved`,
                      accessToken: `no access_token retrieved`,
                      isItemAccess: false,
                    },
                  });
                  return;
                }
                const data = await response.json();
                dispatch({
                  type: "SET_STATE",
                  state: {
                    itemId: data.item_id,
                    accessToken: data.access_token,
                    isItemAccess: true,
                  },
                });
                navigate('/dashboard');
              };
        
              // 'payment_initiation' products do not require the public_token to be exchanged for an access_token.
              if (isPaymentInitiation){
                dispatch({ type: "SET_STATE", state: { isItemAccess: false } });
              } else {
                exchangePublicTokenForAccessToken();
              }
        
              dispatch({ type: "SET_STATE", state: { linkSuccess: true } });
              window.history.pushState("", "", "/");
            },
            [dispatch]
        );

        let isOauth = false;
        const config: Parameters<typeof usePlaidLink>[0] = {
            token: linkToken!,
            receivedRedirectUri: window.location.href,
            onSuccess,
        };

        console.log("*********Step 3: Calling usePlaidLink with a real link token");
        const { open, ready, error } = usePlaidLink(config);
        
        useEffect(() => {
            if (ready) {
                open();
            }
        }, [ready, open]);

    };

    OAuthLink();


    
    
    
    //   if (window.location.href.includes("?oauth_state_id=")) {
    //     // TODO: figure out how to delete this ts-ignore
    //     // @ts-ignore
    //     config.receivedRedirectUri = window.location.href;
    //     dispatch({ type: "SET_STATE", state: { linkToken: localStorage.getItem("link_token") } });
    //     console.log("******TESTING******", config.receivedRedirectUri);
    //     isOauth = true;
    //     console.log("*****Auth", isOauth);
    //     console.log("*****linkToken", localStorage.getItem("link_token"), typeof(localStorage.getItem("link_token")), config.token);
    //   }
    

    const activateBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate("/connect");
    };

    return(
        <>
            <h3>User Dashboard</h3>
            {
              linkSuccess ? "" : <button onClick={ activateBtn }>Connect to your bank account</button>
            }

            {linkSuccess && (
            <>
            {/* {isPaymentInitiation && (
              <Products />
            )} */}
            {isItemAccess && (
              <>
                <Products />
                {/* <Items /> */}
              </>
            )}
            </>
        )}
        </>
    );

};

export default UserDashboard;