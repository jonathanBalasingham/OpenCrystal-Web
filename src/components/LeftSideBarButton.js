import * as React from "react";
import {
    viewToggled,
    compareToggled,
    databaseToggled,
    getOpenOptionsPanel,
    settingsToggled
} from "../features/options/optionsSlice";
import {useDispatch, useSelector} from "react-redux";
import {openCreateModal, toggleCreateModal} from "../features/create/createSlice";
import {openSettingsModal} from "../features/settings/settingsFooterSlice";
import {addToken, setLoggedIn} from "../features/auth/authSlice";
import {getSearchPanelOpened, openSearchPanel, toggleSearchPanel} from "../features/search/searchSlice";
import useToken from "../useToken";
import {openCompareApp, openViewApp} from "../features/app/appSlice";


const LeftSideBarButton = ({ id, buttonIcon }) => {
    const dispatch = useDispatch()
    const { token, setToken, clearToken } = useToken();
    let searchOpen = useSelector(getSearchPanelOpened)

    const logout = () => {
        clearToken()
        dispatch(setLoggedIn({"loggedIn": false}))
    }


    const handleButtonClick = () => {
        console.log("Inside handleButtonClick: " + id.replace('-button', ""))
        switch (id.replace("-button", "")){
            case "Create": dispatch(toggleCreateModal(id)); break;
            case "Search": dispatch(toggleSearchPanel(id)); break;
            case "View": dispatch(openViewApp(id)); break;
            case "Compare": dispatch(openCompareApp(id)); break;
            case "Logout": logout(); break;
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