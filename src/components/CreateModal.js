import {useDispatch, useSelector} from "react-redux";
import {
    closeCreateModal,
    getCreateModalOpened,
} from "../features/create/createSlice";


function CreateModal({}) {
    let vis  = 'none'
    const modalOpened = useSelector(getCreateModalOpened)
    console.log(modalOpened)
    if (modalOpened)
        vis = 'block'

    const dispatch = useDispatch()

    const handleCloseButtonClick = () => {
        console.log("Close Modal button")
        dispatch(closeCreateModal(vis))
    }


    return (
        <div className="create-modal" style={{'display': vis}}>
            <div className="create-modal-content">
                <div className="create-modal-footer">
                    <button className="create-modal-button" onClick={handleCloseButtonClick}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default CreateModal;