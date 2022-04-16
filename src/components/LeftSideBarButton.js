import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openSettingsModal} from "../features/settings/settingsFooterSlice";
import {addToken, setLoggedIn} from "../features/auth/authSlice";
import {getSearchPanelOpened, openSearchPanel, toggleSearchPanel} from "../features/search/searchSlice";
import useToken from "../useToken";
import {getOpenApp, openCompareApp, openCreateApp, openHomeApp, openViewApp} from "../features/app/appSlice";
import cx from "classnames"


const LeftSideBarButton = ({ id, buttonIcon, onClick }) => {
    let openApp = useSelector(getOpenApp)

    return (
        <>
            <button onClick={onClick} className={cx("left-side-bar-button", {"selected": openApp === id.replace("-button", "").toLowerCase()})}>
                { buttonIcon }
            </button>
        </>
    )
}

export default LeftSideBarButton;