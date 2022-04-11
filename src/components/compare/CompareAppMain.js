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
import {CrystalList} from "../search/CrystalList";
import { SizeMe } from 'react-sizeme'


export function CompareAppMain({}) {

    return (
        <div className="compare-app-main">
            <SearchPanel/>
            <SizeMe
                monitorHeight
                refreshRate={32}
                render={({ size }) => {
                    return <CompareAppPlot size={size}/>
                }}
            />
            <PreviewList/>
            <CrystalList/>
            <CompareAppMenu/>
        </div>
    )
}
