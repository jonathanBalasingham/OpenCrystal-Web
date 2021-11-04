import * as React from "react";
import { useSelector } from "react-redux";
import { getOpenOptionsPanel } from "../features/options/optionsSlice";


function ApplicationBay() {
    let marginLeft = '26px'
    const openPanel = useSelector(getOpenOptionsPanel)
    if (openPanel !== 'NONE')
        marginLeft = '326px'

    let innerApplication;
    switch (openPanel) {
        case 'Compare-panel':
            innerApplication = <div></div>
            break;
        case 'View-panel':
            innerApplication = <div></div>
            break;
        case 'Database-panel':
            innerApplication = <div></div>
            break;

    }

    return (
        <div className="application-bay" style={{'margin-left': marginLeft}}>
            { innerApplication }
        </div>
    )
}

export default ApplicationBay;