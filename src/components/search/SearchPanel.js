import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {
    changeContent,
    closeSearchPanel,
    getContent,
    getSearchPanelOpened,
} from "../../features/search/searchSlice";
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import cx from "classnames";
import {SearchBar} from "./SearchBar";
import {SearchResults} from "./SearchResults";
import {SearchSettings} from "./SearchSettings";


function SearchPanel({}) {
    let dispatch = useDispatch()
    let open = useSelector(getSearchPanelOpened)
    let currentContent = useSelector(getContent)
    let content = <SearchResults/>;

    if (currentContent === "settings")
        content = <SearchSettings/>;


    console.log(`Search Panel: ${open}`)
    return (
        <div className={cx("search-panel", {"open": open})}>
            <div className="close-button-container">
                <button onClick={() => dispatch(closeSearchPanel(false))}>
                    <CloseIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("settings"))}>
                    <SettingsIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("results"))}>
                    <ListIcon fontSize={"small"}/>
                </button>

            </div>
            { content }
        </div>
    )

}

export default SearchPanel;