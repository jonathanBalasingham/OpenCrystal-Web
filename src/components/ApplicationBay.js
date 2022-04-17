import * as React from "react";
import { CompareApp } from "./compare/CompareApp"
import { ViewApp} from "./view/ViewApp";
import {CreateApp} from "./create/CreateApp";
import {HomeApp} from "./home/HomeApp";

function ApplicationBay() {
    return (
        <div className="application-bay">
            <HomeApp/>
            <CreateApp/>
            <CompareApp/>
            <ViewApp/>
        </div>
    )
}

export default ApplicationBay;