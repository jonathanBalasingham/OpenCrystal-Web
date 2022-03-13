import * as React from "react";
import './view.scss'
import {ViewAppMain} from "./ViewAppMain";
import {ViewAppTopBar} from "./ViewAppTopBar";

export const ViewApp = () => {

    return (
        <div className="view-app">
            <ViewAppTopBar/>
            <ViewAppMain/>
        </div>
    )
}
