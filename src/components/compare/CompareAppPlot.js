import {useSelector} from "react-redux";
import {getComp, getGraphType} from "../../features/compare/compareSlice";
import {OpenCompareMenu} from "./CompareAppMenu";
import {MyResponsiveCirclePacking} from "./CirclePacking";
import {MyResponsiveSunburst} from "./Sunburst";
import Root from "./views/Root";
import * as React from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import {ForceDirectedGraph} from "./ForceDirectedGraph";
import { SizeMe } from 'react-sizeme'


function CompareAppPlotPlaceHolder(props) {
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


export function CompareAppPlot({}) {

    const graphType = useSelector(getGraphType)
    const comp = useSelector(getComp)

    let graph = <CompareAppPlotPlaceHolder/>;

    if (comp.length !== 0) {
        if (graphType === "circle"){
            graph = <>
                <MyResponsiveCirclePacking/>
            </>
        } else if (graphType === "sunburst") {
            graph = <>
                <MyResponsiveSunburst/>
            </>
        } else if (graphType === "force") {
            graph = <SizeMe
                monitorHeight
                refreshRate={32}
                render={({ size }) => <ForceDirectedGraph size={size}/>}
            />
        } else {
            graph = <>
                <Root/>
            </>
        }
    }

    return (
        <>
            <div className="compare-app-plot">
                { graph }
            </div>
        </>
    )
}