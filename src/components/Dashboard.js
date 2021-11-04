import './Dashboard.css'
import LeftPanel from "./LeftPanel";
import {BrowserRouter, Route} from "react-router-dom";
import * as React from "react";
import SideNav, {NavIcon, NavItem, NavText} from "@trendmicro/react-sidenav";

import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import LeftTaskBar from "./LeftTaskBar";
import ApplicationBay from "./ApplicationBay";

function Dashboard() {
    return (
        <div className="dashboard">
            <LeftTaskBar/>
            <ApplicationBay/>
        </div>
    )
}

export default Dashboard;