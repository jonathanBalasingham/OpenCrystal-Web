import * as React from "react";
import './Compare.scss'
import {CompareAppTopBar} from "./CompareAppTopBar";
import {CompareAppMain} from "./CompareAppMain";


export const CompareApp = () => {

    return (
        <div className="compare-app">
            <CompareAppTopBar/>
            <CompareAppMain/>
        </div>
    )
}
