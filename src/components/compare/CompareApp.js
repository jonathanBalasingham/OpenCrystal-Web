import * as React from "react";
import {PlotApp} from "./PlotApp";
import {CrystalList} from "./CrystalList";


export function CompareApp({}) {

    return (
        <div id="compare-app-container">
            <div id="plot-set-tab-container">
                <PlotApp />
            </div>
            <div id="crystal-list-container">
                <CrystalList/>
            </div>
        </div>
    )
}