import * as React from "react";
import './Compare.scss'
import  'csv-parser'
import {CompareAppPlot} from "./CompareAppPlot";
import SearchPanel from "../search/SearchPanel";
import PreviewPanel from "../PreviewPanel";
import {PreviewList} from "./PreviewList";
import ClustersPanel from "./views/ClustersPanel";
import {omit} from "lodash";
import SearchField from "./views/SearchField";
import {CompareAppMenu} from "./CompareAppMenu";


export function CompareAppMain({}) {

    return (
        <div className="compare-app-main">
            <SearchPanel/>
            <CompareAppPlot/>
            <PreviewList/>
            <CompareAppMenu/>
        </div>
    )
}
