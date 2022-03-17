import * as React from "react";
import './view.scss'
import {SearchBar} from "../search/SearchBar";
import {openSearchPanel, toggleSearchPanel} from "../../features/search/searchSlice";
import {useDispatch} from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteIcon from "@mui/icons-material/Delete"
import WorkspacesIcon from "@mui/icons-material/Workspaces"
import ManageSearchIcon from "@mui/icons-material/ManageSearch"
import {toggleMenu} from "../../features/view/viewSlice";
import {SearchFacetSettings} from "../search/SearchFacetSettings";
import { DiAtom } from 'react-icons/di';

export function ViewAppTopBar() {
    const dispatch = useDispatch()

    const testOpen = () => {
        console.log("opening panel")
    }

    return (
        <>
            <div className="view-app-top-bar">
                <div className={"left-content"}>
                    <button onClick={() => dispatch(toggleSearchPanel(""))}>
                        <SearchIcon/>
                    </button>
                    <SearchBar/>
                    <p>by:</p>
                    <SearchFacetSettings/>
                </div>
                <div className={"right-content"}>
                    <button onClick={() => dispatch(toggleMenu(true))}>
                        <DiAtom size={"24"}/>
                    </button>
                    <button >
                        <DeleteIcon/>
                    </button>
                </div>
            </div>
        </>
    )
}
