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
import CompareIcon from '@mui/icons-material/Compare';
import HomeIcon from '@mui/icons-material/Home'
import {openCreateApp, openHomeApp, openCompareApp, openViewApp} from "../features/app/appSlice";
import {useDispatch} from "react-redux";


const LeftSideBar = () => {
    const dispatch = useDispatch()

    return (
        <div  id="left-side-bar">
            <div className={"top-buttons"}>
                <LeftSideBarButton id="Home-button" buttonIcon={<HomeIcon/>} onClick={() => dispatch(openHomeApp(""))}/>
                <LeftSideBarButton id="Compare-button" buttonIcon={<CompareIcon/>} onClick={() => dispatch(openCompareApp(""))}/>
                <LeftSideBarButton id="View-button" buttonIcon={<PreviewIcon/>} onClick={() => dispatch(openViewApp(""))}/>
            </div>
            <div className={"bottom-buttons"}>
                <LeftSideBarButton id="Info-button" buttonIcon={<InfoIcon/>}/>
            </div>
        </div>
    )

}

export default LeftSideBar;