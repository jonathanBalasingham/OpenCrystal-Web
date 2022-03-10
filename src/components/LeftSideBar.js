import * as React from "react";
import LeftSideBarButton from "./LeftSideBarButton";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import {SideBarLogo} from "./SideBarLogo";
import LogoutIcon from '@mui/icons-material/Logout';
import HelpIcon from '@mui/icons-material/Help';
import InfoIcon from '@mui/icons-material/Info';
import PreviewIcon from '@mui/icons-material/Preview';


const LeftSideBar = () => {

    return (
        <div  id="left-side-bar">
            <SideBarLogo/>
            <LeftSideBarButton id="Create-button" buttonIcon={<AddIcon/>}/>
            <LeftSideBarButton id="Search-button" buttonIcon={<SearchIcon/>}/>
            <LeftSideBarButton id="View-button" buttonIcon={<PreviewIcon/>}/>
            <LeftSideBarButton id="Help-button" buttonIcon={<HelpIcon/>}/>
            <LeftSideBarButton id="Logout-button" buttonIcon={<LogoutIcon/>} onClick={() => sessionStorage.clear() } />
            <LeftSideBarButton id="Info-button" buttonIcon={<InfoIcon/>}/>
        </div>
    )

}

export default LeftSideBar;