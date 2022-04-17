import {useSelector} from "react-redux";
import {getOpenApp} from "../../features/app/appSlice";
import cx from "classnames";
import * as React from "react";
import "./home.scss"
import {HomeAppTopBar} from "./HomeAppTopBar";


export const HomeApp = () => {
    const openApp = useSelector(getOpenApp)

    return (
        <div className={cx("home-app", {"hidden": openApp !== "home"})}>
            <HomeAppTopBar/>
        </div>
    )
}