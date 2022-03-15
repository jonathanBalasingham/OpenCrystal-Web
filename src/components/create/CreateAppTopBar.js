import ScienceIcon from "@mui/icons-material/Science";
import ListIcon from "@mui/icons-material/List";
import StorageIcon from "@mui/icons-material/Storage";
import React, {useState} from "react";
import cx from "classnames";


export const CreateAppTopBar = () => {
    const [tab, setTab] = useState('crystal')
    const getClass = (currentTab, thisTab) => {
        return cx("create-app-tab-button", {"selected": currentTab === thisTab})
    }

    return (
        <div className={"create-app-top-bar"}>
            <div className={"left-content"}>
                <div className="create-app-tabs">
                    <button className={getClass("crystal", tab)} onClick={() => setTab("crystal")}>
                        <ScienceIcon fontSize={"small"}/>
                        Crystal
                    </button>
                    <button className={getClass("subset", tab)} onClick={() => setTab("subset")}>
                        <ListIcon fontSize={"small"}/>
                        Subset
                    </button>
                    <button className={getClass("source", tab)} onClick={() => setTab("source")}>
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