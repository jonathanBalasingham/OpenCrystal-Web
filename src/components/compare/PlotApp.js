import * as React from "react";
import './Compare.css'
import  'csv-parser'
import {BiNetworkChart, BiFullscreen, BiRefresh, BiTrash} from "react-icons/bi"
import {IoSettingsOutline} from 'react-icons/io5'
import Root from './views/Root'
import {useDispatch, useSelector} from "react-redux";
import {setGraphType, clearComp, getGraphType} from "../../features/compare/compareSlice";
import { settingsMap } from "./SettingsDropdown"

export function PlotApp({}) {

    const dispatch = useDispatch()
    const graphType = useSelector(getGraphType)

    const setMST = () => {
        console.log("settings mst")
        dispatch(setGraphType("mst"))
    }

    const setFull = () => {
        dispatch(setGraphType("full"))
    }

    const clear = () => dispatch(clearComp(""))



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
                        <button onClick={() => dispatch(setGraphType("map"))}>Map</button>
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
                <button className="plot-app-menu-button">
                    <BiFullscreen/>
                </button>
                <button className="plot-app-menu-button">
                    <BiRefresh/>
                </button>
                <button className="plot-app-menu-button" style={{"border": "none"}} onClick={clear}>
                    <BiTrash/>
                </button>
            </div>
            <div id="plot-app">
                <Root/>
            </div>
        </>
    )
}