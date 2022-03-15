import * as React from "react";
import { useSelector } from "react-redux";
import { CompareApp } from "./compare/CompareApp"
import {getOpenApp} from "../features/app/appSlice";
import { ViewApp} from "./view/ViewApp";
import {CreateApp} from "./create/CreateApp";

function ApplicationBay() {
    const openApp = useSelector(getOpenApp)

    return (
        <div className="application-bay">
            <CreateApp/>
            <CompareApp/>
            <ViewApp/>
        </div>
    )
}

export default ApplicationBay;