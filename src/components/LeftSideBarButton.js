import * as React from "react";
import { viewToggled, compareToggled, databaseToggled } from "../features/options/optionsSlice";
import {useDispatch} from "react-redux";


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

    return (
        <>
            <button onClick={handleButtonClick} className="left-side-bar-button">
                <span style={{'top': textTop}}>{(id).replace("-button", "")}</span>
            </button>
        </>
    )
}

export default LeftSideBarButton;