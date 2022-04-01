import cx from "classnames";
import {InputItem} from "./CreateAppMainCrystal";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {getCurrentMessage} from "../../features/create/createSlice";
import {LoadingCustom} from "../../Loading";

const CreationProgress = ({message}) => {
    console.log(message)
    return (
        <div className={"creation-progress"}>
            {message === "" || <LoadingCustom width={"100px"} height={"100px"} />}
            <h4>{message}</h4>
        </div>
    )
}


export const CreateAppMainSource = ({open}) => {
    const [name, setName] = useState("")
    const [urlRef, setURLRef] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [currentMessage, setCurrentMessage] = useState("")

    let token = useSelector(getAccessToken)

    const createSource = async() => {
        if (!disabled) {
            setCurrentMessage("Creating Source..")
            fetch(`/api/source/`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer: ${token}`,
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
                            setCurrentMessage(`Creation Failed: ${data["message"] || ""}`)
                        })
                } else {
                    resp.json()
                        .then((data) => {
                            setCurrentMessage("Creation Successful.")
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
                <CreationProgress message={currentMessage}/>
            </div>
        </div>
    )
}