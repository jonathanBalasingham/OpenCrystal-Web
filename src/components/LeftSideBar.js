import * as React from "react";
import LeftSideBarButton from "./LeftSideBarButton";

class LeftSideBar extends React.Component {
    render() {
        return (
            <div id="left-side-bar">
                <LeftSideBarButton id="Compare-button" textTop={'15px'}/>
                <LeftSideBarButton id="View-button" textTop={'0px'}/>
                <LeftSideBarButton id="Database-button" textTop={'15px'}/>
            </div>
        )
    }
}

export default LeftSideBar;