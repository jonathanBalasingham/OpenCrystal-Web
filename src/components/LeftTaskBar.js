import React from "react";
import LeftSideBar from "./LeftSideBar";
import OptionsPanel from "./OptionsPanel";

class LeftTaskBar extends React.Component {
    render() {
        return (
            <div id="left-task-bar">
                <LeftSideBar/>
                <OptionsPanel id="Compare-panel" width={"300px"} />
                <OptionsPanel id="View-panel" width={"300px"} />
                <OptionsPanel id="Database-panel" width={"300px"}/>
            </div>
        )
    }
}

export default LeftTaskBar;