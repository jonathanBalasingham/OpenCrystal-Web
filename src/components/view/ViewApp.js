import * as React from "react";
import './view.scss'
import {ViewAppMain} from "./ViewAppMain";
import {ViewAppTopBar} from "./ViewAppTopBar";
import {useSelector} from "react-redux";
import {getOpenApp} from "../../features/app/appSlice";
import cx from "classnames";

export const ViewApp = () => {
    const openApp = useSelector(getOpenApp)

    return (
        <div className={cx("view-app", {"hidden": openApp !== "view"})}>
            <ViewAppTopBar/>
            <ViewAppMain/>
        </div>
    )
}
