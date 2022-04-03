import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux';
import store from './store';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {LoginPage} from './Login';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {
    addAccessToken,
    addRefreshToken,
    getAccessToken,
    getCurrentUser,
    getLoggedIn,
    getRefreshToken
} from "./features/auth/authSlice";
import useToken from "./useToken";


function Index({}) {
    const { token, setToken, clearToken } = useToken()
    const [tokenChecked, setTokenChecked] = useState(false)
    let dispatch = useDispatch()
    let user = useSelector(getCurrentUser)


    useEffect(() => {
        if (!token)
            return

        if (!token.access || !token.refresh) {
            return
        }

        fetch("/api/token/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer: ${token["access"]}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"refresh": token["refresh"]})
        })
            .then((resp) => {
                if (resp.status !== 200) {
                    sessionStorage.clear()
                    dispatch(addAccessToken(undefined))
                    dispatch(addRefreshToken(undefined))
                } else {
                    resp.json()
                        .then((r) => {
                            console.log(r)
                            let jwt = {
                                "access": r.access,
                                "refresh": r.refresh,
                                "user": user
                            }
                            sessionStorage.setItem('token', JSON.stringify(jwt))
                            setTokenChecked(true)
                        })
                }
            })
    })


    if(!token || !tokenChecked) {
        return <LoginPage  setToken={setToken}/>
    }
    dispatch(addAccessToken(token["access"]))
    dispatch(addRefreshToken(token["refresh"]))

    return (
        <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route path="/">
                        <App />
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Index/>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
