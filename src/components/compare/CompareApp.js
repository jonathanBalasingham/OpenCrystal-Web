import * as React from "react";
import {PlotSetTab} from "./PlotTabSet";
import {CrystalList} from "./CrystalList";


export function CompareApp({}) {

    return (
        <div id="compare-app-container">
            <div id="plot-set-tab-container">
                <PlotSetTab/>
            </div>
            <div id="crystal-list-container">
                <CrystalList/>
            </div>
        </div>
    )
}