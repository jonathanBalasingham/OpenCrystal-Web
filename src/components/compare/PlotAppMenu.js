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
import {settingsMap} from "./SettingsDropdown";
import ListIcon from "@mui/icons-material/List";
import {CrystalList} from "./CrystalList";
import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import cx from 'classnames';
import {closeCreateModal} from "../../features/create/createSlice";
import CloseIcon from "@mui/icons-material/Close";
import ScienceIcon from "@mui/icons-material/Science";
import StorageIcon from "@mui/icons-material/Storage";

export const OpenPlotMenu = () => {
    let dispatch = useDispatch()
    let clicked = useSelector(getMenuOpen)

    return (
        <div className={cx("open-plot-app-menu", {"clicked": clicked})}
            onClick={() => dispatch(setMenuOpen(true))}>
            <BiChevronLeft/>
        </div>
    )
}
/*
export const PlotAppMenu = () => {
    const dispatch = useDispatch()
    const graphType = useSelector(getGraphType)
    const clear = () => dispatch(clearComp(""))
    const forceUpdate = React.useReducer(() => ({}))[1]

    return (
        <div id="plot-app-menu">
            <div className="dropdown">
                <button className="dropbtn">
                    <BiNetworkChart/>
                </button>
                <div id="graph-choices" className="dropdown-content">
                    <button onClick={() => dispatch(setGraphType("mst"))}>MST</button>
                    <button onClick={() => dispatch(setGraphType("full"))}>Threshold</button>
                    <button onClick={() => dispatch(setGraphType("circle"))}>Circle</button>
                    <button onClick={() => dispatch(setGraphType("sunburst"))}>Sunburst</button>
                    <button onClick={() => dispatch(setGraphType("force"))}>Force</button>
                    <button onClick={() => dispatch(setGraphType("map"))}>MDS Map</button>
                    <button onClick={() => dispatch(setGraphType("amd"))}>AMD</button>
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">
                    <IoSettingsOutline/>
                </button>
                <div className="dropdown-content">
                    { settingsMap[graphType] }
                </div>
            </div>
            <div className="dropdown">
                <button className="dropbtn">
                    <ListIcon/>
                </button>
                <div className="dropdown-content">
                    <CrystalList/>
                </div>
            </div>
            <button className="plot-app-menu-button" onClick={forceUpdate}>
                <BiRefresh/>
            </button>
            <button className="plot-app-menu-button" style={{"border": "none"}} onClick={clear}>
                <BiTrash/>
            </button>
        </div>
    )
}

 */
export const AppMenu = () => {
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
                <h6>SETTINGS</h6>
                <h6>CURRENT COMPARISON</h6>
            </div>
        </div>
    )
}
