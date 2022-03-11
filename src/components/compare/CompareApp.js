import * as React from "react";
import './Compare.scss'
import  'csv-parser'
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
import { settingsMap } from "./CompareAppMenuSettings"
import {MyResponsiveCirclePacking} from "./CirclePacking"
import {MyResponsiveSunburst} from "./Sunburst";
import {getAccessToken} from "../../features/auth/authSlice";
import ListIcon from '@mui/icons-material/List';
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from '@mui/icons-material/Add';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import {ViewAppMenu, OpenCompareMenu} from './CompareAppMenu';



function CompareAppPlaceHolder(props) {
    return (
        <div id="plot-app-placeholder">
            <div id="plot-app-placeholder-message">
                <ul>
                    <li>
                        <h1>
                            Create new crystals using <AddIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Search for crystals using <SearchIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Change account settings with <ManageAccountsIcon fontSize={"large"}/>
                        </h1>
                    </li>
                    <li>
                        <h1>
                            Logout using <LogoutIcon fontSize={"large"}/>
                        </h1>
                    </li>
                </ul>
            </div>
        </div>
    )
}


export function CompareApp({}) {

    const graphType = useSelector(getGraphType)
    const comp = useSelector(getComp)

    let graph = <CompareAppPlaceHolder/>;

    if (comp.length !== 0) {
        if (graphType === "circle"){
            graph = <>
                <OpenCompareMenu/>
                <MyResponsiveCirclePacking/>
            </>
        } else if (graphType === "sunburst") {
            graph = <>
                <OpenCompareMenu/>
                <MyResponsiveSunburst/>
            </>
        } else {
            graph = <>
                <OpenCompareMenu/>
                <Root/>
            </>
        }
    }

    return (
        <>
            <div id="plot-app">
                { graph }
            </div>
        </>
    )
}