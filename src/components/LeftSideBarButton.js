import * as React from "react";
import {
    viewToggled,
    compareToggled,
    databaseToggled,
    getOpenOptionsPanel,
    settingsToggled
} from "../features/options/optionsSlice";
import {useDispatch, useSelector} from "react-redux";
import {openCreateModal} from "../features/create/createSlice";
import {openSettingsModal} from "../features/settings/settingsFooterSlice";
import {addToken} from "../features/auth/authSlice";
import {openSearchPanel} from "../features/search/searchSlice";


const LeftSideBarButton = ({ id, buttonIcon }) => {
    const dispatch = useDispatch()

    const handleButtonClick = () => {
        console.log("Inside handleButtonClick: " + id.replace('-button', ""))
        switch (id.replace("-button", "")){
            case "Create": dispatch(openCreateModal(id)); break;
            case "Search": dispatch(openSearchPanel(id)); break;
            case "Logout": dispatch(addToken({"access":null})); break;
            case "Account": dispatch(openSettingsModal(id)); break;
        }
    }

    const openPanel = useSelector(getOpenOptionsPanel)
    /*
    let bc = "#f8f9fa"
    let color = "rgb(50,50,50)"
    if (id.replace("-button", "") === openPanel.replace("-panel", "")) {
        bc = "rgb(232, 232, 232)"
        color = "#12acf5"
    }
    */

    return (
        <>
            <button onClick={handleButtonClick} className="left-side-bar-button">
                { buttonIcon }
            </button>
        </>
    )
}

export default LeftSideBarButton;