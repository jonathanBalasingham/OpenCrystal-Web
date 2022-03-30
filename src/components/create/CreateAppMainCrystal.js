import cx from "classnames"
import {InputField} from "../base/InputField";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReadingFile, setCurrentMessage, getCurrentMessage} from "../../features/create/createSlice";
import { cifParser } from 'cif-to-json';
import {LoadingCustom} from "../../Loading";


const parseCIF = (fileContents) => {
    let result = cifParser(fileContents);
    console.log(result)
    return result
}

const InputItem = ({id, label}) => {
    return (
        <div className={"input-item"}>
            <label htmlFor={id}>{label}</label>
            <br/>
            <input type={"text"} id={id}/>
        </div>
    )
}


const DataItem = ({label, value}) => {
    return (
        <div className={"data-item"}>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}

const check = (item) => {
    if (item === undefined)
        return ""
    else return item
}

const AtomRow = ({data}) => {
    return (
        <tr>
            <td>{check(data._atom_site_label)}</td>
            <td>{check(data._atom_site_type_symbol)}</td>
            <td>{check(data._atom_site_fract_x)}</td>
            <td>{check(data._atom_site_fract_y)}</td>
            <td>{check(data._atom_site_fract_z)}</td>
        </tr>
    )
}

const BondRow = ({data}) => {
    return (
        <tr>
            <td>{check(data._geom_bond_atom_site_label_1)}</td>
            <td>{check(data._geom_bond_atom_site_label_2)}</td>
            <td>{check(data._geom_bond_distance)}</td>
        </tr>
    )
}

const SymmetryRow = ({data}) => {
    return (
        <tr>
            <td>{check(data._symmetry_equiv_pos_site_id)}</td>
            <td>{check(data._symmetry_equiv_pos_as_xyz)}</td>
        </tr>
    )
}

const CreationProgress = () => {
    let message = useSelector(getCurrentMessage)
    console.log(message)
    return (
        <div className={"creation-progress"}>
            {message === "" || <LoadingCustom width={"100px"} height={"100px"} />}
            <h4>{message}</h4>
        </div>
    )
}


export const CreateAppMainCrystal = ({open}) => {
    let dispatch = useDispatch()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isParsed, setIsParsed] = useState(false)
    const [cifAsJson, setCifAsJson] = useState(null)
    const [refCode, setRefCode] = useState("")
    const [atoms, setAtoms] = useState([])
    const [bonds, setBonds] = useState([])


    const changeHandler = async(event) => {
        const file = event.target.files.item(0)
        dispatch(setReadingFile(true))
        const text = await file.text();
        let parsed = parseCIF(text)
        dispatch(setReadingFile(false))
        setIsFilePicked(true);
        setCifAsJson(parsed)
        setIsParsed(true)
    };

    const createCrystal = async(event) => {
        console.log("creating crystal ")
        if (!isFilePicked) {
            dispatch(setCurrentMessage("Please Select a CIF file"))
            return
        }

        dispatch(setCurrentMessage("Checking Reference Code.."))
        fetch(`/api/crystal/${refCode}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer: `,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            }
        }).then(data => {
            let j = data.json()
            if (j.length() !== 0) {
                setCurrentMessage("Reference Code Already Exists")
                return
            } else {
                fetch(`/api/crystal`, {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer: `,
                        'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                        'Content-Length': '<calculated when request is sent>'
                    }
                })
            }
        })

        fetch('/api/molecule/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            },
            body: JSON.stringify(cifAsJson)
        })
            .then((data) => {
                if (data.status !== 200) {
                    setCurrentMessage("Error occurred during crystal creation")
                }
                data.json()
            })
        dispatch(setCurrentMessage("Adding Crystal Meta data.."))
        dispatch(setCurrentMessage("Adding Geometry"))
        dispatch(setCurrentMessage("Finalizing.."))
        dispatch(setCurrentMessage(""))
    }

    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <div className={"create-tab-crystal-meta-panel"}>
                <h6>From CIF:</h6>
                <input type="file" id="myFile" name="filename" onChange={changeHandler}/>
                <br/>
                <div>
                    <div className="create-crystal-options-meta">
                        <div className={"checked-input"}>
                            <InputItem label={"Reference Code:"} id={"new-crystal-refcode"} onChange={e => setRefCode(e.target.value)}/>
                        </div>
                        <InputItem label={"Reference Code:"} id={"new-crystal-refcode"}/>
                        <InputItem label={"Source: (Defaults to None)"} id={"new-crystal-source"}/>
                        <InputItem label={"Polymorph: (Defaults to None)"} id={"new-crystal-polymorph"}/>
                    </div>
                    <button className={"create-crystal-options-button"} onClick={createCrystal}>Create</button>
                </div>
                <br/>
                <CreationProgress/>
            </div>
            <div className={"create-tab-crystal-cif-results-panel"}>
                <h3>Crystal Information</h3>
                {isParsed && Object.keys(cifAsJson).map(function(key, index) {
                    let v = cifAsJson[key]
                    if (typeof v === "string" || v instanceof String){
                        return <DataItem label={key} value={v}/>
                    } else return undefined
                })}
                <h3>Symmetry Equivalence</h3>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="1">Position Site Id</th>
                        <th colSpan="1">Position X,Y,Z</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isParsed && cifAsJson._symmetry_equiv_pos && cifAsJson._symmetry_equiv_pos.map(function (i) {
                        return <SymmetryRow data={i}/>
                    })}
                    </tbody>
                </table>
                <h3>Atom Information</h3>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="1">Label</th>
                        <th colSpan="1">Species</th>
                        <th colSpan="1">X</th>
                        <th colSpan="1">Y</th>
                        <th colSpan="1">Z</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isParsed && cifAsJson._atom_site && cifAsJson._atom_site.map(function (i) {
                        return <AtomRow data={i}/>
                    })}
                    </tbody>
                </table>
                <h3>Bond Information</h3>
                <table>
                    <thead>
                    <tr>
                        <th colSpan="1">Bond Label 1</th>
                        <th colSpan="1">Bond Label 2</th>
                        <th colSpan="1">Distance</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isParsed && cifAsJson._geom_bond && cifAsJson._geom_bond.map(function (i) {
                        return <BondRow data={i}/>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}