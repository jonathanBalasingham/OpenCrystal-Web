import * as React from "react";
import './create.scss'
import {useSelector} from "react-redux";
import {getOpenApp} from "../../features/app/appSlice";
import cx from "classnames";
import {CreateAppTopBar} from "./CreateAppTopBar";
import {CreateAppMain} from "./CreateAppMain";

export const CreateApp = () => {
    const openApp = useSelector(getOpenApp)

    return (
        <div className={cx("create-app", {"hidden": openApp !== "create"})}>
            <CreateAppTopBar/>
            <CreateAppMain/>
        </div>
    )
}
