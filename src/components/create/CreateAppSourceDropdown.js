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
        if (e.target.value === "") {
            fetch(`/api/source/${e.target.value}`, {
                headers: {
                    'Authorization': `Bearer:${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        resp.json()
                            .then((data) => {
                                setOptions(data["data"])
                            })
                    }
                })
        } else {
            fetch(`/api/search/source/${e.target.value}?match=partial`, {
                headers: {
                    'Authorization': `Bearer:${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((resp) => {
                    if (resp.status === 200) {
                        resp.json()
                            .then((data) => {
                                setOptions(data["data"])
                            })
                    }
                })
        }
    }

    return (
        <div>
            <label htmlFor={"sources-dropdown"}>{"Source"}</label>
            <br/>
            <input id="sources-dropdown" type="text" list="sources-datalist"
                   onChange={(e) => getSources(e)}
                   value={source}/>
            <datalist id="sources-datalist" onChange={e => getSources(e)}>
                <option value={0} label={"User"}>User</option>
                { options.map((x) => {
                    return <option value={x.ID} label={x.name }>{x.name}</option>
                }) }
            </datalist>
        </div>
    )
}