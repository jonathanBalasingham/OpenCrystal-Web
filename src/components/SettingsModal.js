import {useDispatch, useSelector} from "react-redux";
import {
    changePotentialBackend,
    closeSettingsModal,
    getPotentialBackend,
    getSettingsModalOpened, setNewBackend
} from "../features/settings/settingsFooterSlice";


function SettingsModal({}) {
    let vis  = 'none'
    const modalOpened = useSelector(getSettingsModalOpened)
    console.log(modalOpened)
    if (modalOpened)
        vis = 'block'

    const dispatch = useDispatch()

    const handleCloseButtonClick = () => {
        console.log("Close Modal button")
        dispatch(closeSettingsModal(vis))
    }
    let potentialEndpoint = useSelector(getPotentialBackend)

    const handleConnectButtonClick = () => {

        const healthCheck = async () => {
            console.log("Using endpoint: " + potentialEndpoint)

            fetch(potentialEndpoint)
                .then(async response => {
                    const resp = await response;
                    console.log(resp)
                    const data = resp.json();

                    // check for error response
                    if (!response.ok) {
                        // get error message from body or default to response statusText
                        const error = (data && data.message) || response.statusText;
                        return Promise.reject(error);
                    }
                    return true;
                })
                .catch(error => {
                    console.error('There was an error!', error);
                    return false;
                });
        }

        healthCheck().then(function (result) {
            if (result)
                setNewBackend(potentialEndpoint)
        })
    }

    const handleURLChange = (e) => {
        console.log("Changing Potential Backend")
        console.log(e.target.value)
        dispatch(changePotentialBackend(e.target.value))
    }

    return (
        <div className="settings-modal" style={{'display': vis}}>
            <div className="settings-modal-content">
                <div>
                    <p>Server Address:</p>
                    <input type="text" onChange={e => handleURLChange(e)}/>
                </div>
                <div className="settings-modal-footer">
                    <button id="close-settings-modal-button" className="settings-modal-button" onClick={handleConnectButtonClick}>Connect</button>
                    <button className="settings-modal-button" onClick={handleCloseButtonClick}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default SettingsModal;