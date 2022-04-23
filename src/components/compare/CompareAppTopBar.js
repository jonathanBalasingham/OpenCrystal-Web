import * as React from "react";
import './Compare.scss'
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
import {toggleCrystalList, toggleMenu, togglePreviewList, clearComp, toggleClusterPanel, toggleSearchField} from "../../features/compare/compareSlice";
import {SearchFacetSettings} from "../search/SearchFacetSettings";
import {OverlayTrigger, Tooltip} from "react-bootstrap";


export function CompareAppTopBar() {
    const dispatch = useDispatch()

    const testOpen = () => {
        console.log("opening panel")
    }

    return (
        <>
            <div className="compare-app-top-bar">
                <div className={"left-content"}>
                    <OverlayTrigger
                        key={"search-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="search-toggle-tooltip">
                                Search
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(toggleSearchPanel(""))}>
                            <SearchIcon/>
                        </button>
                    </OverlayTrigger>
                    <SearchBar/>
                    <p>by:</p>
                    <SearchFacetSettings/>
                </div>
                <div className={"right-content"}>
                    <OverlayTrigger
                        key={"search-graph-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="search-graph-toggle-tooltip">
                                Toggle Search Panel
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(toggleSearchField(""))}>
                            <ManageSearchIcon/>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        key={"clusters-graph-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="cluster-graph-toggle-tooltip">
                                Toggle Clusters Panel
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(toggleClusterPanel(""))}>
                            <WorkspacesIcon/>
                        </button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key={"molview-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="molview-toggle-tooltip">
                                Molecule View
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(togglePreviewList(""))}>
                            <PreviewIcon/>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        key={"curcomp-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="cucomp-toggle-tooltip">
                                Current Comparison
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(toggleCrystalList(""))}>
                            <ListIcon/>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        key={"options-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="option-toggle-tooltip">
                                Menu
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(toggleMenu(true))}>
                            <SettingsIcon/>
                        </button>
                    </OverlayTrigger>

                    <OverlayTrigger
                        key={"trash-bottom"}
                        placement="bottom"
                        overlay={
                            <Tooltip id="trash-tooltip">
                                Remove All
                            </Tooltip>
                        }
                    >
                        <button onClick={() => dispatch(clearComp(true))}>
                            <DeleteIcon/>
                        </button>
                    </OverlayTrigger>

                </div>
            </div>
        </>
    )
}
