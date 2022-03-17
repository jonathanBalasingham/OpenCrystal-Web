import * as React from "react";
import './view.scss'
import  'csv-parser'
import SearchPanel from "../search/SearchPanel";
import {ViewAppCanvas} from "./ViewAppCanvas";
import {ViewAppElementSettings} from "./ViewAppElementSettings";


export function ViewAppMain({}) {

    return (
        <div className="view-app-main">
            <SearchPanel/>
            <ViewAppCanvas/>
            <ViewAppElementSettings/>
        </div>
    )
}
