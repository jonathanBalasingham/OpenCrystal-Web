import {useDispatch, useSelector} from "react-redux";
import {getMenuOpen, setMenuOpen} from "../../features/view/viewSlice";
import cx from "classnames";
import {BiChevronLeft} from "react-icons/bi";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {PeriodicTable} from "./PeriodicTable";


export const OpenViewMenu = () => {
    let dispatch = useDispatch()
    let clicked = useSelector(getMenuOpen)

    return (
        <div className={cx("open-plot-app-menu", {"clicked": clicked})}
             onClick={() => dispatch(setMenuOpen(true))}>
            <BiChevronLeft/>
        </div>
    )
}


export const ViewAppMenu = ({clustersPanel, searchPanel}) => {
    let open = useSelector(getMenuOpen)
    let dispatch = useDispatch()

    return (
        <div className={cx("view-app-menu", {"open": open})}>
            <div className={"view-app-menu-container"}>
                <h6>ELEMENT SETTINGS</h6>
                <PeriodicTable/>
            </div>
        </div>
    )
}