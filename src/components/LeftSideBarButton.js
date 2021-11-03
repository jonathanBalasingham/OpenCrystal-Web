import * as React from "react";
import {viewToggled, compareToggled, databaseToggled, getOpenOptionsPanel} from "../features/options/optionsSlice";
import {useDispatch, useSelector} from "react-redux";


const LeftSideBarButton = ({ id, textTop }) => {
    const dispatch = useDispatch()

    const handleButtonClick = () => {
        console.log("Inside handleButtonClick: " + id.replace('-button', ""))
        switch (id.replace("-button", "")){
            case "View": dispatch(viewToggled(id)); break;
            case "Compare": dispatch(compareToggled(id)); break;
            case "Database": dispatch(databaseToggled(id)); break;
        }
    }

    const openPanel = useSelector(getOpenOptionsPanel)
    console.log("OpenPanel inside OptionsPanel: " + openPanel)
    let bc = "#f8f9fa"
    let color = "rgb(50,50,50)"
    if (id.replace("-button", "") === openPanel.replace("-panel", "")) {
        bc = "rgb(232, 232, 232)"
        color = "#12acf5"
    }
    return (
        <>
            <button onClick={handleButtonClick} className="left-side-bar-button"
                    style={{'background': bc, 'color': color}}>
                <span style={{'top': textTop, 'color': color}}>{(id).replace("-button", "")}</span>
            </button>
        </>
    )
}

export default LeftSideBarButton;