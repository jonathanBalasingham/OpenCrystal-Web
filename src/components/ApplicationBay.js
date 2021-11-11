import * as React from "react";
import { useSelector } from "react-redux";
import { getOpenApplicationBay, getOpenOptionsPanel } from "../features/options/optionsSlice";


function ApplicationBay() {
    let marginLeft = '26px'
    const openAppBay = useSelector(getOpenApplicationBay)
    const openPanel = useSelector(getOpenOptionsPanel)

    if (openPanel !== 'NONE')
        marginLeft = '326px'

    let innerApplication;
    switch (openAppBay) {
        case 'Compare-app':
            innerApplication = <div><p>compare</p></div>
            break;
        case 'View-app':
            innerApplication = <div><p>View</p></div>
            break;
        case 'Database-app':
            innerApplication = <div><p>db</p></div>
            break;

    }

    return (
        <div className="application-bay" style={{'margin-left': marginLeft}}>
            { innerApplication }
        </div>
    )
}

export default ApplicationBay;