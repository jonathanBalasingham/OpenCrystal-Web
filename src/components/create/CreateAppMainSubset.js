import cx from "classnames";
import {InputItem} from "./CreateAppMainCrystal";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {
    getCurrentMessage,
    getStatus,
    getSubsetMessage,
    getSubsetStatus,
    setSubsetMessage, setSubsetStatus
} from "../../features/create/createSlice";
import {LoadingCustom} from "../../Loading";
import {BsCheckCircle, BsXCircle} from "react-icons/bs";

const CreationProgress = () => {
    let message = useSelector(getSubsetMessage)
    let status = useSelector(getSubsetStatus)
    return (
        <div className={"creation-progress"}>
            {!(status === "complete") || <BsCheckCircle size={60}/>}
            {!(status === "loading") || <LoadingCustom width={"100px"} height={"100px"} />}
            {!(status === "failed") || <BsXCircle size={60}/>}
            <h4>{message}</h4>
        </div>
    )
}


export const CreateAppMainSubset = ({open}) => {
    const [name, setName] = useState("")
    const [refCodes, setRefCodes] = useState([])
    const [refCodeText, setRefCodeText] = useState("")
    const [disabled, setDisabled] = useState(true)
    const dispatch = useDispatch()
    let token = useSelector(getAccessToken)

    const createSubset = async() => {
        if (!disabled) {
            dispatch(setSubsetMessage("Creating Subset.."))
            dispatch(setSubsetStatus("loading"))
            fetch(`/api/subset/create`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer: ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "name": name,
                    "refcodes": refCodes,
                })
            }).then((resp) => {
                if (resp.status !== 200) {
                    resp.json()
                        .then((data) => {
                            dispatch(setSubsetMessage(`Creation Failed: ${data["message"] || ""}`))
                            dispatch(setSubsetStatus("failed"))
                        })
                } else {
                    resp.json()
                        .then((data) => {
                            dispatch(setSubsetStatus("complete"))
                            dispatch(setSubsetMessage("Creation Successful."))
                        })
                }
            })
        }
    }

    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <div className={"create-subset-panel"}>
                <InputItem label={"Subset Name:"} value={name} onChange={(e) => {
                    setName(e.target.value)
                    setDisabled(e.target.value === "" || refCodes.length === 0)
                }}/>
                <label>Reference Codes (Comma-Separated):</label>
                <textarea className={"create-panel-text-area"}
                    value={refCodeText} onChange={(e) => {
                    setRefCodeText(e.target.value)
                    let r  = e.target.value.split(",").map((x) => {
                        return x.trim()
                    })
                    setRefCodes(r)
                    setDisabled(e.target.value === "" || r.length === 0)
                    console.log(refCodes)
                }}/>
                <button className={cx("create-crystal-options-button", {"disabled": disabled})}
                        onClick={createSubset}>Create</button>
                <CreationProgress />
            </div>
        </div>
    )
}