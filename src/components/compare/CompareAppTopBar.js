import * as React from "react";
import './Compare.scss'
import {SearchBar} from "../search/SearchBar";
import {openSearchPanel, toggleSearchPanel} from "../../features/search/searchSlice";
import {useDispatch} from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import {toggleCrystalList, toggleMenu, togglePreviewList} from "../../features/compare/compareSlice";


export function CompareAppTopBar() {
    const dispatch = useDispatch()

    const testOpen = () => {
        console.log("opening panel")
    }

    return (
        <>
            <div className="compare-app-top-bar">
                <div className={"left-content"}>
                    <button onClick={() => dispatch(toggleSearchPanel(""))}>
                        <SearchIcon/>
                    </button>
                    <SearchBar/>
                </div>
                <div className={"right-content"}>
                    <button onClick={() => dispatch(togglePreviewList(""))}>
                        <PreviewIcon/>
                    </button>
                    <button onClick={() => dispatch(toggleCrystalList(""))}>
                        <ListIcon/>
                    </button>
                    <button onClick={() => dispatch(toggleMenu(true))}>
                        <SettingsIcon/>
                    </button>
                </div>
            </div>
        </>
    )
}
