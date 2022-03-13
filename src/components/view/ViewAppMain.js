import * as React from "react";
import './view.scss'
import  'csv-parser'
import SearchPanel from "../search/SearchPanel";
import {ViewAppCanvas} from "./ViewAppCanvas";
import {ViewAppMenu} from "./ViewAppMenu";


export function ViewAppMain({}) {

    return (
        <div className="view-app-main">
            <SearchPanel/>
            <ViewAppCanvas/>
            <ViewAppMenu/>
        </div>
    )
}
