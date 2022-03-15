import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openSettingsModal} from "../features/settings/settingsFooterSlice";
import {addToken, setLoggedIn} from "../features/auth/authSlice";
import {getSearchPanelOpened, openSearchPanel, toggleSearchPanel} from "../features/search/searchSlice";
import useToken from "../useToken";
import {getOpenApp, openCompareApp, openCreateApp, openViewApp} from "../features/app/appSlice";
import cx from "classnames"


const LeftSideBarButton = ({ id, buttonIcon }) => {
    const dispatch = useDispatch()
    const { token, setToken, clearToken } = useToken();
    let searchOpen = useSelector(getSearchPanelOpened)
    let openApp = useSelector(getOpenApp)

    const logout = () => {
        clearToken()
        dispatch(setLoggedIn({"loggedIn": false}))
    }


    const handleButtonClick = () => {
        console.log("Inside handleButtonClick: " + id.replace('-button', ""))
        switch (id.replace("-button", "")){
            case "Create": dispatch(openCreateApp(id)); break;
            case "Search": dispatch(toggleSearchPanel(id)); break;
            case "View": dispatch(openViewApp(id)); break;
            case "Compare": dispatch(openCompareApp(id)); break;
            case "Logout": logout(); break;
            case "Account": dispatch(openSettingsModal(id)); break;
        }
    }


    return (
        <>
            <button onClick={handleButtonClick} className={cx("left-side-bar-button", {"selected": openApp === id.replace("-button", "").toLowerCase()})}>
                { buttonIcon }
            </button>
        </>
    )
}

export default LeftSideBarButton;