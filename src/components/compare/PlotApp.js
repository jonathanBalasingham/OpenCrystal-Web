import * as React from "react";
import './Compare.css'
import  'csv-parser'
import {BiNetworkChart, BiFullscreen, BiRefresh, BiTrash} from "react-icons/bi"
import {IoSettingsOutline} from 'react-icons/io5'
import Root from './views/Root'
import {useDispatch, useSelector} from "react-redux";
import {
    setGraphType,
    clearComp,
    getGraphType,
    getKs,
    getThresholds,
    getLinkage,
    getComp
} from "../../features/compare/compareSlice";
import { settingsMap } from "./SettingsDropdown"
import SimpleTreemapExample from "./SimpleTreemap"
import {MyResponsiveCirclePacking} from "./CirclePacking"
import {MyResponsiveSunburst} from "./Sunburst";
import {getAccessToken} from "../../features/auth/authSlice";
import ListIcon from '@mui/icons-material/List';
import {CrystalList} from "./CrystalList";


export function PlotApp({}) {

    const dispatch = useDispatch()
    const graphType = useSelector(getGraphType)

    const clear = () => dispatch(clearComp(""))
    const forceUpdate = React.useReducer(() => ({}))[1]

    let graph = null;
    if (graphType === "circle"){
        graph = <MyResponsiveCirclePacking/>
    } else if (graphType === "sunburst") {
        graph = <MyResponsiveSunburst/>
    } else {
        graph = <Root/>
    }

    return (
        <>
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
            <div id="plot-app">
                { graph }
            </div>
        </>
    )
}