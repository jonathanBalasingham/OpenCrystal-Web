import * as React from "react";
import { useSelector } from "react-redux";
import { CompareApp } from "./compare/CompareApp"
import {getOpenApp} from "../features/app/appSlice";
import { ViewApp} from "./view/ViewApp";

function ApplicationBay() {
    const openApp = useSelector(getOpenApp)

    let app = <CompareApp/>;
    if (openApp === "view")
        app = <ViewApp/>

    return (
        <div className="application-bay">
            {app}
        </div>
    )
}

export default ApplicationBay;