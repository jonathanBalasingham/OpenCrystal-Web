import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {openSettingsModal} from "../features/settings/settingsFooterSlice";
import {addToken, setLoggedIn} from "../features/auth/authSlice";
import {getSearchPanelOpened, openSearchPanel, toggleSearchPanel} from "../features/search/searchSlice";
import useToken from "../useToken";
import {getOpenApp, openCompareApp, openCreateApp, openHomeApp, openViewApp} from "../features/app/appSlice";
import cx from "classnames"
import {OverlayTrigger, Tooltip} from "react-bootstrap";



const LeftSideBarButton = ({ id, buttonIcon, onClick }) => {
    let openApp = useSelector(getOpenApp)

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            {id.replace("-button", "")}
        </Tooltip>
    );

    return (
        <>
            <OverlayTrigger
                placement="right"
                delay={{ show: 100, hide: 100 }}
                overlay={renderTooltip}
            >
                <button onClick={onClick} className={cx("left-side-bar-button", {"selected": openApp === id.replace("-button", "").toLowerCase()})}>
                    { buttonIcon }
                </button>
            </OverlayTrigger>
        </>
    )
}

export default LeftSideBarButton;