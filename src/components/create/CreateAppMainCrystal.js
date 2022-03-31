import cx from "classnames"
import {InputField} from "../base/InputField";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setReadingFile, setCurrentMessage, getCurrentMessage} from "../../features/create/createSlice";
import { cifParser } from 'cif-to-json';
import {LoadingCustom} from "../../Loading";
import {
    addAccessToken,
    addRefreshToken,
    getAccessToken,
    getCurrentUser,
    getRefreshToken
} from "../../features/auth/authSlice";
import {refresh} from "../base/refresh";
import {CreateAppSourceDropdown} from "./CreateAppSourceDropdown";


const InputItem = ({id, label, onChange, value}) => {
    return (
        <div className={"input-item"}>
            <label htmlFor={id}>{label}</label>
            <br/>
            <input type={"text"} id={id} onChange={onChange} value={value}/>
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

const SymmetryRow2 = ({data}) => {
    console.log(data._space_group_symop_operation_xyz)
    return (
        <tr>
            <td>{check(data._space_group_symop_operation_xyz)}</td>
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

const extractCrystalMetaData = (cifAsJson) => {
    return {
        "composition": cifAsJson["_chemical_formula_sum"],
        "chemical_name": cifAsJson["_chemical_name_common"],
        "has_3d_structure": cifAsJson["_atom_site"] === undefined || true,
        "is_disordered": cifAsJson["_atom_site"]["_atom_site_disorder_group"] || false,
    }
}

const extractAtoms = (cifAsJson) => {
    if (cifAsJson["_atom_site"]) {
        return cifAsJson["_atom_site"].map((atom) => {
            return {
                "x": atom["_atom_site_fract_x"],
                "x_cart": atom["_atom_site_cartn_x"],
                "y": atom["_atom_site_fract_y"],
                "y_cart": atom["_atom_site_cartn_y"],
                "z": atom["_atom_site_fract_z"],
                "z_cart": atom["_atom_site_cartn_z"],
                "label": atom["_atom_site_label"],
                "symbol": atom["_atom_site_type_symbol"]
            }
        })
    } else {
        return []
    }
}

const extractBonds = (cifAsJson) => {
    if (cifAsJson["_geom_bond"]) {
        return cifAsJson["_geom_bond"].map((bond) => {
            return {
                "label1": bond["_geom_bond_atom_site_label_1"],
                "label2": bond["_geom_bond_atom_site_label_2"],
                "distance": bond["_geom_bond_distance"],
            }
        })
    } else {
        return []
    }
}

const extractUnitCell = (cifAsJson) => {
    let symm = "("
    if (cifAsJson._space_group_symop_operation_xyz) {
        symm += cifAsJson._space_group_symop_operation_xyz.reduce((total, n) => "'" + n._space_group_symop_operation_xyz + "'," + total, "")
    } else if (cifAsJson._symmetry_equiv_pos) {
        symm += cifAsJson._symmetry_equiv_pos.reduce((total, n) => "'" + n._symmetry_equiv_pos_as_xyz + "'," + total, "")
    }

    let final_symm = symm.slice(0, -1) + ")"

    return {
        "a": cifAsJson["_cell_length_a"],
        "b": cifAsJson["_cell_length_b"],
        "c": cifAsJson["_cell_length_c"],
        "alpha": cifAsJson["_cell_angle_alpha"],
        "beta": cifAsJson["_cell_angle_beta"],
        "gamma": cifAsJson["_cell_angle_gamma"],
        "volume": cifAsJson["_cell_volume"],
        "symmetry_operators": final_symm
    }
}




export const CreateAppMainCrystal = ({open}) => {
    let dispatch = useDispatch()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isParsed, setIsParsed] = useState(false)
    const [cifAsJson, setCifAsJson] = useState(null)
    const [refCode, setRefCode] = useState("")
    const [source, setSource] = useState("")
    const [polymorph, setPolymorph] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [family, setFamily] = useState("")

    let token = useSelector(getAccessToken)
    let refreshToken = useSelector(getRefreshToken)
    let user = useSelector(getCurrentUser)

    const parseCIF = (fileContents) => {
        let result = cifParser(fileContents);
        console.log(result)
        return result
    }

    const changeHandler = async(event) => {
        const file = event.target.files.item(0)
        dispatch(setReadingFile(true))
        const text = await file.text();
        let parsed = parseCIF(text)
        dispatch(setReadingFile(false))
        setIsFilePicked(true)
        setCifAsJson(parsed)
        setIsParsed(true)
        setDisabled(refCode === "" || !isFilePicked)
    };

    const createCrystal = async(event) => {
        if (disabled)
            return

        /*
        fetch("/api/token/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer: ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"refresh": refreshToken})
        })
            .then((resp) => {
                if (resp.status !== 200) {
                    sessionStorage.clear()
                    dispatch(addAccessToken(undefined))
                    dispatch(addRefreshToken(undefined))
                } else {
                    let r = resp.json()
                    console.log(r)
                    let jwt = {
                        "access": r.access,
                        "refresh": r.refresh,
                        "user": user
                    }
                    sessionStorage.setItem('token', JSON.stringify(jwt))
                    dispatch(addAccessToken(jwt["access"]))
                    dispatch(addRefreshToken(jwt["refresh"]))
                    return jwt
                }
            })
        */
        if (refCode === "") {
            dispatch(setCurrentMessage("Please enter a Reference Code"))
            return
        }

        if (!isFilePicked) {
            dispatch(setCurrentMessage("Please Select a CIF file"))
            return
        }

        dispatch(setCurrentMessage("Extracting atoms.."))
        let crystal = extractCrystalMetaData(cifAsJson)
        dispatch(setCurrentMessage("Extracting atoms.."))
        let atoms = extractAtoms(cifAsJson)
        dispatch(setCurrentMessage("Extracting bonds.."))
        let bonds = extractBonds(cifAsJson)
        dispatch(setCurrentMessage("Extracting unit cell.."))
        let unitCell = extractUnitCell(cifAsJson)
        dispatch(setCurrentMessage("Checking Reference Code.."))

        fetch(`/api/crystal/meta`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer: ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...crystal,
                "polymorph": polymorph,
                "source": source,
                "name": refCode,
                "family": family,
            })
        }).then((resp) => {
            dispatch(setCurrentMessage("Adding Crystal Meta data.."))
            if (resp.status !== 200) {
                dispatch(setCurrentMessage(resp.json()["message"]))
            } else {
                resp.json().then((data) => {
                    console.log(data)
                    fetch('/api/crystal/create', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer: ${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "id": data["id"],
                            "atoms": atoms,
                            "bonds": bonds,
                            "unitCell": unitCell,
                        })
                    }).then((data) => {
                        if (data.status !== 200) {
                            dispatch(setCurrentMessage("Error occurred during crystal creation"))
                        } else {
                            dispatch(setCurrentMessage("Crystal Creation Successful"))
                        }
                        dispatch(setCurrentMessage(""))
                    })
                })
            }
        })
    }

    return (
        <div className={cx("create-tab-content", {"open": open})}>
            <div className={"create-tab-crystal-meta-panel"}>
                <h6>From CIF:</h6>
                <input type="file" id="myFile" name="filename" onChange={changeHandler}/>
                <br/>
                <div>
                    <div className="create-crystal-options-meta">
                        <InputItem label={"Reference Code:"} id={"new-crystal-refcode"}
                                   value={refCode}
                                   onChange={(e) => {
                                       setRefCode(e.target.value)
                                       setFamily(e.target.value.replace(/\d+$/, ""))
                                       setDisabled(refCode === "" || !isFilePicked || family === "")
                                       console.log(disabled)
                                   }} />
                        <InputItem label={"Family:"} id={"new-crystal-family"}
                                   value={family}
                                   onChange={(e) => {
                                       setFamily(e.target.value)
                                       setDisabled(refCode === "" || !isFilePicked || family === "")
                                   }}
                                    />
                        <CreateAppSourceDropdown/>
                        <InputItem label={"Polymorph: (Defaults to None)"} id={"new-crystal-polymorph"}
                                   onChange={(e) => setPolymorph(e.target.value)} />
                    </div>
                    <button className={cx("create-crystal-options-button", {disabled: "disabled"})} onClick={createCrystal}>Create</button>
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
                <table>
                    <thead>
                    <tr>
                        <th colSpan="1">Space Group Symmetry Operation</th>
                    </tr>
                    </thead>
                    <tbody>
                    {isParsed && cifAsJson._space_group_symop_operation_xyz && cifAsJson._space_group_symop_operation_xyz.map(function (i) {
                        return <SymmetryRow2 data={i}/>
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