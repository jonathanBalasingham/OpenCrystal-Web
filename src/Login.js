import './index.scss'
import {useReducer, useState} from "react";
import * as React from "react";
import PropTypes from 'prop-types';
import { useTabs, TabPanel } from "react-headless-tabs"
import {TabSelector} from "./components/TabSelector";
import 'tailwindcss/tailwind.css';
import {addAccessToken, addRefreshToken, addToken, refreshToken, setLoggedIn} from "./features/auth/authSlice";
import {useDispatch} from "react-redux";
import { Canvas, useFrame } from '@react-three/fiber'
import Ball from "./Logo";
import {Button} from "react-bootstrap";


async function loginUser(credentials) {
    console.log("doing something")
    return fetch('/api/token/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

async function createUser(credentials) {
    return fetch('/api/user/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


export function LoginPage({setToken}) {
    //const [formData, setFormData] = useReducer(formReducer, {});
    const [selectedTab, setSelectedTab] = useTabs([
        'Login',
        'New Account',
    ]);

    const [submitting, setSubmitting] = useState(false);
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [newusername, setNewUserName] = useState();
    const [newpassword, setNewPassword] = useState();
    const [email, setEmail] = useState()
    let dispatch = useDispatch()

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
            username,
            password
        });

        console.log(token)
        if (token !== undefined) {
            token['user'] = username;
            setToken(token)
            dispatch(setLoggedIn({"loggedIn": true}))
            dispatch(addAccessToken(token["access"]))
            dispatch(addRefreshToken(token["refresh"]))
        }
    }

    const handleCreation = async e => {
        e.preventDefault();
        const token = await createUser({
            'username': newusername,
            'email': email,
            'password': newpassword
        });
        //sessionStorage.setItem('jwtToken', token);
        token['user'] = username;
        setToken(token)
        dispatch(setLoggedIn({"loggedIn": true}))
        dispatch(addAccessToken(token["access"]))
        dispatch(addRefreshToken(token["refresh"]))
    }

    return (
        <div id="login-page">
            <div id="login-tabs">
                <nav className="flex border-b border-gray-300">
                    <TabSelector
                        isActive={selectedTab === 'Login'}
                        onClick={() => setSelectedTab('Login')}
                    >
                        Login
                    </TabSelector>
                    <TabSelector
                        isActive={selectedTab === 'New Account'}
                        onClick={() => setSelectedTab('New Account')}
                    >
                        New Account
                    </TabSelector>
                </nav>
                <div className="p-4">
                    <TabPanel hidden={selectedTab !== 'Login'}>
                        <Canvas style={{'height': '80px'}}>
                            <ambientLight />
                            <pointLight position={[2, 2, 2]} />
                            <Ball position={[0, 0, 0]} />
                        </Canvas>
                        <h1 id="main-title">OpenCrystal</h1>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <p>Username:</p>
                                <input type="text" placeholder="Username" id="username-input"
                                       onChange={e => setUserName(e.target.value)}/>
                                <p>Password:</p>
                                <input type="password" placeholder="Password" id="password-input"
                                       onChange={e => setPassword(e.target.value)}/>
                            </fieldset>
                            <Button type="submit" id="submit-login-button">Submit</Button>
                        </form>
                    </TabPanel>
                    <TabPanel hidden={selectedTab !== 'New Account'}>
                        <form onSubmit={handleCreation}>
                            <fieldset>
                                <p>Email:</p>
                                <input type="text" placeholder="Email" id="new-email-input"
                                       onChange={e => setEmail(e.target.value)}/>
                                <p>Username:</p>
                                <input type="text" placeholder="Username" id="new-username-input"
                                       onChange={e => setNewUserName(e.target.value)}/>
                                <p>Password:</p>
                                <input type="password" placeholder="Password" id="new-password-input"
                                       onChange={e => setNewPassword(e.target.value)}/>
                                <p>Repeat Password:</p>
                                <input type="password" placeholder="Password" id="repeat-password-input"
                                       onChange={e => setNewPassword(e.target.value)}/>
                            </fieldset>
                            <Button type="submit" id="submit-create-button">Create</Button>
                        </form>
                    </TabPanel>
                </div>
            </div>
        </div>
    )
}

LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
}

