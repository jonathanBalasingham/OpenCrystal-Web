import * as React from "react";
import { useSelector } from 'react-redux'
import { getOpenOptionsPanel } from "../features/options/optionsSlice";

const selectOpenOptionsPanel = state => state.openOptionsPanel;

const OptionsPanel = ({ id, width }) => {
    const openPanel = useSelector(getOpenOptionsPanel)
    console.log("OpenPanel inside OptionsPanel: " + openPanel)
    let vis = "hidden"
    if (id === openPanel)
        vis = "visible"

    return (
        <div className="options-panel" id={id} style={{'visibility': vis, 'width': width}}>

        </div>
    )
}

    export default OptionsPanel;