import IconButton from '@material/react-icon-button';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import '@mui/material/utils'
import SettingsModal from "../components/SettingsModal";
import {useDispatch, useSelector} from "react-redux";
import {getSettingsModalOpened, openSettingsModal} from "../features/settings/settingsFooterSlice";

var style = {
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid rgb(232, 232, 232)",
    textAlign: "center",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "40px",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '40px',
    width: '100%',
}

var buttonStyle = {
    'height': '40px',
    'background': 'transparent',
    'float': 'left',
    'color': 'rgb(75, 75, 75)',
    'border': 'none'
}


function Footer({ children }) {
    const dispatch = useDispatch()
    let vis = 'none'
    const openModal = () => {
        console.log("Open Modal Button")
        dispatch(openSettingsModal(vis))
    }

    return (
        <div>
            <div style={phantom} />
            <div style={style}>
                <button id='footer-settings-button' onClick={openModal}>
                    <HealthAndSafetyIcon/>
                </button>
                <SettingsModal/>
            </div>
        </div>
    )
}

export default Footer
