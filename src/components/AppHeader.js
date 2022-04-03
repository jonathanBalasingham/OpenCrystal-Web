import '../App.scss';
import * as React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import HelpIcon from '@mui/icons-material/Help';

import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import {Canvas} from "@react-three/fiber";
import Ball from "../Logo";
import {useDispatch} from "react-redux";
import {addAccessToken, addRefreshToken} from "../features/auth/authSlice";


export const AppHeader = () => {
    const dispatch = useDispatch()

    return (
        <div className={"app-header"}>
            <div className={"content-left"}>
                <Canvas style={{'height': '50px', 'width': '50px'}}>
                    <ambientLight />
                    <pointLight position={[2, 2, 2]} />
                    <Ball position={[0, 0, 0]} />
                </Canvas>
                <div style={{"margin-left": "5px"}}>
                    <p style={{"font-size": "x-small", "margin-bottom": "-3px", "padding-top":"5px", "font-family": "monospace"}}>Open</p>
                    <p style={{"font-size": "x-small", "margin-left":"8px", "font-family": "monospace"}}>Crystal</p>
                </div>
            </div>
            <div className={"content-right"}>
                <button className={"header-button"} onClick={() => sessionStorage.clear() }>
                    <AccountCircleIcon/>
                    <p>Account</p>
                </button>
                <button className={"header-button"} onClick={() => sessionStorage.clear() }>
                    <HelpIcon/>
                    <p>Help</p>
                </button>
                <button className={"header-button"} onClick={() => {
                    sessionStorage.clear()
                    dispatch(addAccessToken(undefined))
                    dispatch(addRefreshToken(undefined))
                    window.location.reload()
                } }>
                    <LogoutIcon/>
                </button>
            </div>
        </div>
    )
}