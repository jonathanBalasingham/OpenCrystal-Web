import './Dashboard.css'
import {BrowserRouter, Route} from "react-router-dom";
import * as React from "react";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ApplicationBay from "./ApplicationBay";
import SearchPanel from "./SearchPanel";
import ViewPanel from "./ViewPanel";


function Dashboard() {

    return (
        <div className="dashboard">
            <SearchPanel/>
            <ViewPanel/>
            <ApplicationBay/>
        </div>
    )
}

export default Dashboard;