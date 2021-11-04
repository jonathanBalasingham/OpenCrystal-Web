import * as React from "react";
import { useSelector } from 'react-redux'
import { getOpenOptionsPanel } from "../features/options/optionsSlice";
import "./Dashboard.css"
const selectOpenOptionsPanel = state => state.openOptionsPanel;

const OptionsPanel = ({ id, width }) => {
    const openPanel = useSelector(getOpenOptionsPanel)
    console.log("OpenPanel inside OptionsPanel: " + openPanel)
    let vis = "hidden"
    if (id === openPanel)
        vis = "visible"

    let innerApplicationOptions;
    switch (openPanel) {
        case 'Compare-panel':
            innerApplicationOptions = <div></div>
            break;
        case 'View-panel':
            innerApplicationOptions = <div></div>
            break;
        case 'Database-panel':
            innerApplicationOptions = <div></div>
            break;
        case 'Settings-panel':
            innerApplicationOptions = <div></div>
            break;
    }

    return (
        <div className="options-panel" id={id} style={{'visibility': vis, 'width': width}}>
            { innerApplicationOptions }
        </div>
    )
}

    export default OptionsPanel;