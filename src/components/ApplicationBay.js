import * as React from "react";
import { useSelector } from "react-redux";
import { getOpenApplicationBay, getOpenOptionsPanel } from "../features/options/optionsSlice";
import { CompareApp } from "./compare/CompareApp"

function ApplicationBay() {
    let marginLeft = '26px'
    const openAppBay = useSelector(getOpenApplicationBay)
    const openPanel = useSelector(getOpenOptionsPanel)

    //if (openPanel !== 'NONE')
      //  marginLeft = '326px'

    let innerApplication;
    switch (openAppBay) {
        case 'Compare-app':
            innerApplication = <CompareApp/>
            break;
        case 'View-app':
            innerApplication = <div id="view-app-container">
                <div id="molecule-plot-container">

                </div>
                <div id="cif-editor-container">

                </div>
            </div>

            break;
        case 'Database-app':
            innerApplication = <div><p>db</p></div>
            break;

    }

    return (
        <div className="application-bay">
            <CompareApp/>
        </div>
    )
}

export default ApplicationBay;