import * as React from "react";
import './Compare.scss'
import {CompareAppTopBar} from "./CompareAppTopBar";
import {CompareAppMain} from "./CompareAppMain";
import {useSelector} from "react-redux";
import {getOpenApp} from "../../features/app/appSlice";
import cx from "classnames"


export const CompareApp = () => {
    const openApp = useSelector(getOpenApp)


    return (
        <div className={cx("compare-app", {"hidden": openApp !== "compare"})}>
            <CompareAppTopBar/>
            <CompareAppMain/>
        </div>
    )
}
