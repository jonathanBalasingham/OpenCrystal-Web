import {useDispatch, useSelector} from "react-redux";
import {getSource, setSource} from "../../features/create/createSlice";
import {getAccessToken} from "../../features/auth/authSlice";
import React, {useState} from "react";


export const CreateAppSourceDropdown = () => {
    let dispatch = useDispatch()
    let source = useSelector(getSource)
    let token = useSelector(getAccessToken)
    const [options, setOptions] = useState([])

    const getSources = (e) => {
        dispatch(setSource(e.target.value))
        fetch(`/api/sources/${source}`, {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json',
        })
            .then((resp) => {
                if (resp.status === 200) {
                    resp.json()
                        .then((data) => {
                            setOptions(data)
                        })
                }
            })
    }

    return (
        <div>
            <label htmlFor={"sources-dropdown"}>{"Source"}</label>
            <br/>
            <input id="sources-dropdown" type="text" list="sources-datalist"
                   onChange={(e) => getSources(e)} />
            <datalist id="sources-datalist" onChange={e => getSources(e)}>
                <option value={0}>User</option>
                { options.map((x) => {
                    return <option value={x.id.value}>{x.name}</option>
                }) }
            </datalist>
        </div>
    )
}