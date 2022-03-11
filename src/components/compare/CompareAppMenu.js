import {BiNetworkChart, BiRefresh, BiTrash, BiChevronLeft} from "react-icons/bi";
import {
    clearComp,
    getComp,
    getGraphType,
    getMenuOpen,
    setGraphType,
    setMenuOpen
} from "../../features/compare/compareSlice";
import {IoSettingsOutline} from "react-icons/io5";
import {CompareAppMenuSettings} from "./CompareAppMenuSettings";
import ListIcon from "@mui/icons-material/List";
import {CrystalList} from "../search/CrystalList";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import cx from 'classnames';
import {closeCreateModal} from "../../features/create/createSlice";
import CloseIcon from "@mui/icons-material/Close";
import ScienceIcon from "@mui/icons-material/Science";
import StorageIcon from "@mui/icons-material/Storage";
import {CompareAppMenuGraphSelection} from "./CompareAppMenuGraphSelection";
import ClustersPanel from "./views/ClustersPanel";

export const OpenCompareMenu = () => {
    let dispatch = useDispatch()
    let clicked = useSelector(getMenuOpen)

    return (
        <div className={cx("open-plot-app-menu", {"clicked": clicked})}
            onClick={() => dispatch(setMenuOpen(true))}>
            <BiChevronLeft/>
        </div>
    )
}


export const CompareAppMenu = ({clustersPanel, searchPanel}) => {
    let open = useSelector(getMenuOpen)
    let dispatch = useDispatch()

    return (
        <div className={cx("app-menu", {"open": open})}>
            <div className="close-button-container">
                <button onClick={() => dispatch(setMenuOpen(false))}>
                    <CloseIcon fontSize={"small"}/>
                </button>
            </div>
            <div className={"app-menu-container"}>
                <h6>GRAPH TYPE</h6>
                <CompareAppMenuGraphSelection/>
                <h6>SETTINGS</h6>
                <CompareAppMenuSettings/>
                <h6>CURRENT COMPARISON</h6>
                {searchPanel}
                {clustersPanel}
            </div>
        </div>
    )
}
