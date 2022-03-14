import * as React from "react";
import { useSelector } from "react-redux";
import { CompareApp } from "./compare/CompareApp"
import {getOpenApp} from "../features/app/appSlice";
import { ViewApp} from "./view/ViewApp";

function ApplicationBay() {
    const openApp = useSelector(getOpenApp)

    return (
        <div className="application-bay">
            <CompareApp/>
            <ViewApp/>
        </div>
    )
}

export default ApplicationBay;