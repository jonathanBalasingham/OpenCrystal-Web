import {useDispatch, useSelector} from "react-redux";
import {getMenuOpen, setMenuOpen} from "../../features/view/viewSlice";
import cx from "classnames";
import {BiChevronLeft} from "react-icons/bi";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import {PeriodicTable} from "./PeriodicTable";
import {useState} from "react";


const ElementSettings = (elem) => {
    return (
        <div className={"element-settings"}>

        </div>
    )
}


export const ViewAppElementSettings = ({}) => {
    let open = useSelector(getMenuOpen) === "element"
    let dispatch = useDispatch()
    const [elem, setElem] = useState("");

    return (
        <div className={cx("view-app-menu", {"open": open})}>
            <div className={"view-app-menu-container"}>
                <h6>ELEMENT SETTINGS</h6>
                <PeriodicTable/>
            </div>
        </div>
    )
}