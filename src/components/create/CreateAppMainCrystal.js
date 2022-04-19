import cx from "classnames"
import {InputField} from "../base/InputField";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    setReadingFile,
    setCurrentMessage,
    getCurrentMessage,
    getCoordinateSystem, getSource,
    getStatus, setStatus
} from "../../features/create/createSlice";
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
import {CreateAppCoordinateSwitch} from "./CreateAppCoordinateSwitch";
import {BsCheckCircle, BsXCircle} from 'react-icons/bs'


export const InputItem = ({id, label, onChange, value}) => {
    return (
        <div className={"input-item"}>
            <label htmlFor={id}>{label}</label>
            <br/>
            <input type={"text"} id={id} onChange={onChange} value={value}/>
        </div>
    )
}


export const DataItem = ({label, value}) => {
    return (
        <div className={"data-item"}>
            <p>{label}</p>
            <p>{value}</p>
        </div>
    )
}

export const check = (item) => {
    if (item === undefined)
        return ""
    else return item
}

export const AtomRow = ({data}) => {
    let coordinateSystem = useSelector(getCoordinateSystem)

    return (
        <tr>
            <td>{check(data._atom_site_label)}</td>
            <td>{check(data._atom_site_type_symbol)}</td>
            <td>{check(data[`_atom_site_${coordinateSystem}_x`])}</td>
            <td>{check(data[`_atom_site_${coordinateSystem}_y`])}</td>
            <td>{check(data[`_atom_site_${coordinateSystem}_z`])}</td>
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
    let status = useSelector(getStatus)
    console.log(message)
    return (
        <div className={"creation-progress"}>
            {!(status === "complete") || <BsCheckCircle size={60}/>}
            {!(status === "loading") || <LoadingCustom width={"100px"} height={"100px"} />}
            {!(status === "failed") || <BsXCircle size={60}/>}
            <h4>{message}</h4>
        </div>
    )
}

function gcd(a, b) {
    if (a === 0)
        return b;
    return gcd(b % a, a);
}

function findGCD(arr, n) {
    let result = arr[0];
    for (let i = 1; i < n; i++) {
        result = gcd(arr[i], result);

        if (result === 1) {
            return 1;
        }
    }
    return result;
}

const prime_comp = (composition) => {
    if (composition) {
        if (composition.includes("."))
            return composition
        else {
            let re = /[a-zA-Z]+\d+[.]?/g
            let matches = [...composition.matchAll(re)]
            let counts = matches.map((x) => x[0])

            let elems = counts.map((x) => {
                const re = /[a-zA-Z]+/g
                return [...x.matchAll(re)]
            }).map((x) => x[0][0])

            let elem_counts = counts.map((x) => {
                const re = /[\d]+/g
                return [...x.matchAll(re)]
            }).map((x) => parseInt(x[0]))
            const gcd_counts = findGCD(elem_counts, elem_counts.length)
            const prime_counts = elem_counts.map((x) => x / gcd_counts)
            let prime_comp = ""
            for (let i = 0; i < elems.length; i++){
                prime_comp += elems[i] + prime_counts[i] + " "
            }
            return prime_comp.slice(0, -1)
        }
    } else {
        return ""
    }
}

const extractCrystalMetaData = (cifAsJson) => {
    console.log("inside extract cmd")
    console.log(cifAsJson)
    return {
        "MnemonicId": 0,
        "Composition": cifAsJson["_chemical_formula_sum"] || "",
        "PrimeComposition": prime_comp(cifAsJson["_chemical_formula_sum"]) || "",
        "ChemicalName": cifAsJson["_chemical_name_common"] || "",
        "Has3dStructure": cifAsJson["_atom_site"] === undefined || true,
        "IsDisordered": cifAsJson["_atom_site"]["_atom_site_disorder_group"] || false,
    }
}

const removeTrailing = (str) => {
    if (str)
        return safeParse(str.split("(")[0])
    else
        return undefined
}

const extractAtoms = (cifAsJson, id) => {
    if (cifAsJson["_atom_site"]) {
        return cifAsJson["_atom_site"].map((atom) => {
            return {
                "CrystalID": id,
                "X": removeTrailing(atom["_atom_site_fract_x"]),
                "X_cart": removeTrailing(atom["_atom_site_cartn_x"]),
                "Y": removeTrailing(atom["_atom_site_fract_y"]),
                "Y_cart": removeTrailing(atom["_atom_site_cartn_y"]),
                "Z": removeTrailing(atom["_atom_site_fract_z"]),
                "Z_cart": removeTrailing(atom["_atom_site_cartn_z"]),
                "Label": atom["_atom_site_label"],
                "Symbol": atom["_atom_site_type_symbol"]
            }
        })
    } else {
        return []
    }
}

const extractBonds = (cifAsJson, id) => {
    if (cifAsJson["_geom_bond"]) {
        return cifAsJson["_geom_bond"].map((bond) => {
            return {
                "CrystalID": id,
                "Label1": bond["_geom_bond_atom_site_label_1"],
                "Label2": bond["_geom_bond_atom_site_label_2"],
                "Distance": removeTrailing(bond["_geom_bond_distance"]),
            }
        })
    } else {
        return []
    }
}

const safeParse = (val) => {
    if (val)
        return parseFloat(val)
    else return undefined
}

const extractUnitCell = (cifAsJson, id) => {
    let symm = "("
    if (cifAsJson._space_group_symop_operation_xyz) {
        symm += cifAsJson._space_group_symop_operation_xyz.reduce((total, n) => "'" + n._space_group_symop_operation_xyz + "'," + total, "")
    } else if (cifAsJson._symmetry_equiv_pos) {
        symm += cifAsJson._symmetry_equiv_pos.reduce((total, n) => "'" + n._symmetry_equiv_pos_as_xyz + "'," + total, "")
    }

    let final_symm = symm.slice(0, -1) + ")"

    return {
        "CrystalID": id,
        "A": safeParse(cifAsJson["_cell_length_a"]),
        "B": safeParse(cifAsJson["_cell_length_b"]),
        "C": safeParse(cifAsJson["_cell_length_c"]),
        "Alpha": safeParse(cifAsJson["_cell_angle_alpha"]),
        "Beta": safeParse(cifAsJson["_cell_angle_beta"]),
        "Gamma": safeParse(cifAsJson["_cell_angle_gamma"]),
        "CellVolume": safeParse(cifAsJson["_cell_volume"]),
        "SymmetryOperators": final_symm
    }
}




export const CreateAppMainCrystal = ({open}) => {
    let dispatch = useDispatch()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isParsed, setIsParsed] = useState(false)
    const [cifAsJson, setCifAsJson] = useState(null)
    const [refCode, setRefCode] = useState("")
    const [polymorph, setPolymorph] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [family, setFamily] = useState("")

    let token = useSelector(getAccessToken)
    let refreshToken = useSelector(getRefreshToken)
    let user = useSelector(getCurrentUser)
    let source = useSelector(getSource)

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
        setDisabled(refCode === "" || false || family === "")
    };

    const createCrystal = async(event) => {
        if (disabled)
            return

        dispatch(setStatus("loading"))
        fetch("/api/token/refresh", {
            method: "POST",
            headers: {
                "Authorization": `Bearer:${token}`,
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
                    resp.json()
                        .then((r) => {
                            console.log(r)
                            let jwt = {
                                "access": r.access,
                                "refresh": r.refresh,
                                "user": user
                            }
                            sessionStorage.setItem('token', JSON.stringify(jwt))
                            dispatch(addAccessToken(jwt["access"]))
                            dispatch(addRefreshToken(jwt["refresh"]))
                        })
                }
            })

        if (refCode === "") {
            dispatch(setCurrentMessage("Please enter a Reference Code"))
            dispatch(setStatus("failed"))
            return
        }

        if (!isFilePicked) {
            dispatch(setCurrentMessage("Please Select a CIF file"))
            dispatch(setStatus("failed"))
            return
        }

        dispatch(setCurrentMessage("Extracting meta data.."))
        let crystal = extractCrystalMetaData(cifAsJson)

        fetch(`/api/crystal/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...crystal,
                "Polymorph": polymorph,
                "SourceID": parseInt(source) || 0,
                "name": refCode,
                "family": family,
            })
        }).then((resp) => {
            dispatch(setCurrentMessage("Adding Crystal Meta data.."))
            if (resp.status !== 200) {
                dispatch(setCurrentMessage("Crystal Creation Failed."))
                dispatch(setStatus("failed"))
            } else {
                resp.json().then((data) => {
                    console.log(data)
                    let id = data["data"]["ID"]
                    dispatch(setCurrentMessage("Extracting atoms.."))
                    let atoms = extractAtoms(cifAsJson, id)
                    dispatch(setCurrentMessage("Extracting bonds.."))
                    let bonds = extractBonds(cifAsJson, id)
                    dispatch(setCurrentMessage("Extracting unit cell.."))
                    let unitCell = extractUnitCell(cifAsJson, id)
                    dispatch(setCurrentMessage("Checking Reference Code.."))
                    fetch(`/api/crystal/${id}`, {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer:${token}`,
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            "atoms": atoms,
                            "bonds": bonds,
                            "unitCell": unitCell,
                        })
                    }).then((data) => {
                        if (data.status !== 200) {
                            dispatch(setCurrentMessage("Error occurred during crystal creation"))
                            dispatch(setStatus("failed"))
                        } else {
                            dispatch(setStatus("complete"))
                            dispatch(setCurrentMessage("Crystal Creation Successful"))
                        }
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
                <CreateAppCoordinateSwitch/>
                <div>
                    <div className="create-crystal-options-meta">
                        <InputItem label={"Reference Code:"} id={"new-crystal-refcode"}
                                   value={refCode}
                                   onChange={(e) => {
                                       setRefCode(e.target.value)
                                       setFamily(e.target.value.replace(/\d+$/, ""))
                                       console.log(refCode)
                                       console.log(family)
                                       setDisabled(e.target.value === "" || !isFilePicked || e.target.value.replace(/\d+$/, "") === "")
                                       console.log(disabled)
                                   }} />
                        <InputItem label={"Family:"} id={"new-crystal-family"}
                                   value={family}
                                   onChange={(e) => {
                                       setFamily(e.target.value)
                                       setDisabled(refCode === "" || !isFilePicked || e.target.value === "")
                                   }}
                                    />
                        <CreateAppSourceDropdown/>
                        <InputItem label={"Polymorph: (Defaults to None)"} id={"new-crystal-polymorph"}
                                   onChange={(e) => setPolymorph(e.target.value)} />
                    </div>
                    <button className={cx("create-crystal-options-button", {"disabled": disabled})} onClick={createCrystal}>Create</button>
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