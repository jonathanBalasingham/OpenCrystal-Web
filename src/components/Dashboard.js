import './Dashboard.scss'
import {BrowserRouter, Route} from "react-router-dom";
import * as React from "react";
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import ApplicationBay from "./ApplicationBay";
import SearchPanel from "../search/SearchPanel";
import PreviewPanel from "./PreviewPanel";


function Dashboard() {

    return (
        <div className="dashboard">
            <SearchPanel/>
            <PreviewPanel/>
            <ApplicationBay/>
        </div>
    )
}

export default Dashboard;