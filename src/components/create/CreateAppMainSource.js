import cx from "classnames";
import {InputItem} from "./CreateAppMainCrystal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {
    getCurrentMessage,
    getSourceMessage, getSourceStatus, setSourceMessage, setSourceStatus,
} from "../../features/create/createSlice";
import {LoadingCustom} from "../../Loading";
import {BsCheckCircle, BsXCircle} from "react-icons/bs";

const CreationProgress = () => {
    let message = useSelector(getSourceMessage)
    let status = useSelector(getSourceStatus)
    return (
        <div className={"creation-progress"}>
            {!(status === "complete") || <BsCheckCircle size={60}/>}
            {!(status === "loading") || <LoadingCustom width={"100px"} height={"100px"} />}
            {!(status === "failed") || <BsXCircle size={60}/>}
            <h4>{message}</h4>
        </div>
    )
}


export const CreateAppMainSource = ({open}) => {
    const [name, setName] = useState("")
    const [urlRef, setURLRef] = useState("")
    const [disabled, setDisabled] = useState(true)

    let token = useSelector(getAccessToken)
    const dispatch = useDispatch()

    const createSource = async() => {
        if (!disabled) {
            dispatch(setSourceMessage("Creating Source.."))
            dispatch(setSourceStatus("loading"))
            fetch(`/api/source/`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer:${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "url": urlRef,
                })
            }).then((resp) => {
                if (resp.status !== 200) {
                    resp.json()
                        .then((data) => {
                            dispatch(setSourceMessage(`Creation Failed: ${data["message"] || ""}`))
                            dispatch(setSourceStatus("failed"))
                        })
                } else {
                    resp.json()
                        .then((data) => {
                            dispatch(setSourceMessage("Creation Successful."))
                            dispatch(setSourceStatus("complete"))
                        })
                }
            })
        }
    }

    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <div className={"create-subset-panel"}>
                <InputItem label={"Source Name:"} value={name} onChange={(e) => {
                    setName(e.target.value)
                    setDisabled(e.target.value === "")
                }}/>
                <InputItem label={"URL Reference:"} value={urlRef} onChange={(e) => setURLRef(e.target.value)}/>
                <button className={cx("create-crystal-options-button", {"disabled": disabled})}
                        onClick={createSource}>Create</button>
                <CreationProgress />
            </div>
        </div>
    )
}