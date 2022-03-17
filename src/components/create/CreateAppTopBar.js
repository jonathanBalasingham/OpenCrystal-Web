import ScienceIcon from "@mui/icons-material/Science";
import ListIcon from "@mui/icons-material/List";
import StorageIcon from "@mui/icons-material/Storage";
import React, {useState} from "react";
import cx from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentTab, setTab} from "../../features/create/createSlice";


export const CreateAppTopBar = () => {
    let dispatch = useDispatch()
    let tab = useSelector(getCurrentTab)
    const getClass = (currTab, thisTab) => {
        return cx("create-app-tab-button", {"selected": currTab === thisTab})
    }

    return (
        <div className={"create-app-top-bar"}>
            <div className={"left-content"}>
                <div className="create-app-tabs">
                    <button className={getClass("crystal", tab)} onClick={() => dispatch(setTab("crystal"))}>
                        <ScienceIcon fontSize={"small"}/>
                        Crystal
                    </button>
                    <button className={getClass("subset", tab)} onClick={() => dispatch(setTab("subset"))}>
                        <ListIcon fontSize={"small"}/>
                        Subset
                    </button>
                    <button className={getClass("source", tab)} onClick={() => dispatch(setTab("source"))}>
                        <StorageIcon fontSize={"small"}/>
                        Source
                    </button>
                </div>
            </div>
            <div className={"right-content"}>

            </div>
        </div>
    )
}