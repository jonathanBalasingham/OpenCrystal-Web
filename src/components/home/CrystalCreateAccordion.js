import cx from "classnames"
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    closeCrystalCreate,
    flushCreateCrystal,
    getCreateCrystalOpen
} from "../../features/home/homeSlice";
import {Badge, Button, Form} from "react-bootstrap"
import {cifParser} from "cif-to-json";
import {setReadingFile} from "../../features/create/createSlice";
import {extractAtoms, extractBonds, extractCrystalMetaData, extractUnitCell} from "./CIFHelpers";
import {DataItem} from "../create/CreateAppMainCrystal";
import {AtomTable} from "./AtomTable";
import {BondTable} from "./BondTable";
import {UnitCellTable} from "./UnitCellTable";
import {SymmetryTable} from "./SymmetryTable";
import {getAccessToken} from "../../features/auth/authSlice";
import {SimilarCrystalsTable} from "./SimilarCrystalsTable";


export const CrystalCreateAccordion = () => {
    let open = useSelector(getCreateCrystalOpen)
    let dispatch = useDispatch()
    let token = useSelector(getAccessToken)
    const [bodyOpen, setBodyOpen] = useState(false)
    const [pickedFile, setPickedFile] = useState("")
    const [refCode, setRefCode] = useState("")
    const [validRefCode, setValidRefCode] = useState(false)
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isParsed, setIsParsed] = useState(false)
    const [cifAsJson, setCifAsJson] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [message, setMessage] = useState("")
    const [atoms, setAtoms] = useState([])
    const [bonds, setBonds] = useState([])
    const [crystal, setCrystal] = useState({})
    const [unitCell, setUnitCell] = useState({})
    const [polymorph, setPolymorph] = useState("")
    const [family, setFamily] = useState("")
    const [active, setActive] = useState("Crystal")
    const [sourceOptions, setSourceOptions] = useState([])
    const [source, setSource] = useState("")
    const [similarCrystals, setSimilarCrystals] = useState([])

    const createCrystal = () => {
        setMessage("Creating Crystal..")
        fetch(`/api/create/crystal/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Crystal": {
                    ...crystal,
                    "Polymorph": polymorph,
                    "SourceID": parseInt(source) || 0,
                    "name": refCode,
                    "family": family,
                },
                "Atoms": atoms,
                "Bonds": bonds,
                "UnitCell": unitCell,
            })
        }).then((resp) => {
            if (resp.status === 401)
                window.location.reload()

            if (resp.status !== 200) {
                resp.json()
                    .then((data) => {
                        setMessage(`Creation Failed: ${data["message"] || ""}`)
                    })
            } else {
                resp.json()
                    .then((data) => {
                        setMessage("Creation Successful.")
                        fetch(`/api/search/crystal/name/${refCode}?match=exact`, {
                            headers: {
                                'Authorization': `Bearer:${token}`,
                                'Content-Type': 'application/json',
                            },
                        }).then(data => data.json())
                            .then(d => {
                                setIsParsed(false)
                                dispatch(flushCreateCrystal(d.data))
                                setBodyOpen(false)
                                setRefCode("")
                                setFamily("")
                                setMessage("")
                                setDisabled(true)
                                setPolymorph("")
                                setSource("")
                                setAtoms([])
                                setBonds([])
                                setCrystal({})
                                setUnitCell({})
                                setSimilarCrystals([])
                                dispatch(closeCrystalCreate(false))
                            })
                    })
            }
        })

    }

    // I need a way to check if the cif was parsed correctly
    useEffect(() => {
        if (!isParsed)
            return

        console.log("retrieving ")
        fetch(`/api/search/preview/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Crystal": {
                    ...crystal,
                    "Polymorph": polymorph,
                    "SourceID": parseInt(source) || 0,
                    "name": refCode,
                    "family": family,
                },
                "Atoms": atoms,
                "Bonds": bonds,
                "UnitCell": unitCell,
            })
        }).then((data) => {
            if (data.status === 401) {
                window.location.reload()
            } else if (data.status === 200) {
                data.json().then((d) => {
                    setSimilarCrystals(d.data)
                })
            }
        })
    }, [isParsed, pickedFile])

    useEffect(() => {
        let d = refCode.trim() !== "" && family.trim() !== "" && source !== "" && isParsed
        console.log(`Running use effect, getting ${d}`)
        setDisabled(!d)
    }, [refCode, family, source, isParsed])

    const checkReferenceCode = (refCode) => {
        return false
    }

    const parseCIF = (fileContents) => {
        return cifParser(fileContents)
    }

    const changeHandler = async(event) => {
        const file = event.target.files.item(0)
        setPickedFile(file)
        dispatch(setReadingFile(true))
        const text = await file.text();
        let parsed = parseCIF(text)
        dispatch(setReadingFile(false))
        setIsFilePicked(true)
        setCifAsJson(parsed)
        setCrystal(extractCrystalMetaData(parsed))
        setMessage("Extracting atoms..")
        setAtoms(extractAtoms(parsed))
        setMessage("Extracting bonds..")
        setBonds(extractBonds(parsed))
        setMessage("Extracting unit cell..")
        setUnitCell(extractUnitCell(parsed))
        setMessage("Done.")
        setIsParsed(true)
        setBodyOpen(true)
    };

    const getSources = (e) => {
        setSource(e.target.value)
        console.log(`source is ${e.target.value}`)
        if (e.target.value === "") return
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
                            setSourceOptions(data["data"])
                            console.log(data["data"])
                        })
                }
            })
    }

    return (
        <div className="home-app-create-accordion">
            <div className={cx("create-accordion-header", {"open": open})}>
                <div style={{"display": "flex","align-items": "center"}}>
                    <Badge bg="primary">New</Badge>
                </div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Reference Code</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="" value={refCode} onChange={(e) => {
                        setRefCode(e.target.value)
                        setValidRefCode(checkReferenceCode(e.target.value))
                        setFamily(e.target.value.replace(/\d+$/, ""))
                    }}/>
                </Form.Group>
                <Form.Group className="mb-1" controlId="exampleForm.ControlInput2">
                    <Form.Label>Family</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="" value={family} onChange={(e) => {
                        setFamily(e.target.value)
                    }}/>
                </Form.Group>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Small file input example</Form.Label>
                    <Form.Control type="file" size="sm" onChange={changeHandler}/>
                </Form.Group>
                <div style={{"display": "flex"}}>
                    <Button size="sm" variant="danger" onClick={() => {
                        dispatch(closeCrystalCreate(""))
                        setIsFilePicked(false)
                        setIsParsed(false)
                        setRefCode("")
                        setSimilarCrystals([])
                    }} style={{"margin": "0 10px"}}>
                        Discard
                    </Button>
                    {
                        disabled && <Button variant="success" size="sm" disabled>
                            Create
                        </Button>
                    }
                    {
                        !disabled && <Button size="sm" variant="success" onClick={createCrystal}>
                            Create
                        </Button>
                    }
                </div>
            </div>
            <div className={cx("create-accordion-body", {"open": isFilePicked && isParsed && bodyOpen})}>
                <div className={"top-bar"}>
                    <button className={cx("", {"active": active === "Crystal"})} onClick={() => setActive("Crystal")}>About</button>
                    <button className={cx("", {"active": active === "Geometry"})} onClick={() => setActive("Geometry")}>Geometry</button>
                    <button className={cx("", {"active": active === "UnitCell"})} onClick={() => setActive("UnitCell")}>Unit Cell</button>
                </div>
                { active === "Crystal" && isParsed &&
                    <div style={{"display": "flex"}}>
                        <div style={{"width": "50%"}}>
                            {
                                Object.keys(crystal).map(function(key, index) {
                                    let v = crystal[key]
                                    if (typeof v === "string" || v instanceof String){
                                        return <DataItem label={key.charAt(0).toUpperCase() + key.slice(1) + ":"} value={v}/>
                                    } else return undefined
                                })
                            }
                            <div className="data-item">
                                <p>Polymorph</p>
                                <Form.Control size="sm" type="text" placeholder="Polymorph Label" value={polymorph}
                                              style={{"maxWidth": "30%", "background": "white"}}
                                              onChange={(e) => {
                                                  setPolymorph(e.target.value)
                                              }}/>
                            </div>
                            <div className="data-item">
                                <p>Source</p>
                                <Form.Control size="sm" id="accordion-sources-dropdown" type="text" list="accordion-sources-datalist"
                                              style={{"maxWidth": "30%", "background": "white"}} placeholder={"Source name"}
                                              onChange={(e) => {
                                                  getSources(e)
                                              }}
                                              value={source}/>
                                <datalist id="accordion-sources-datalist" onChange={(e) => {
                                    getSources(e)
                                }}>
                                    <option value={0} label={"User"}>User</option>
                                    { sourceOptions.map((x) => {
                                        return <option value={x.ID} label={x.name }>{x.name}</option>
                                    }) }
                                </datalist>
                            </div>
                        </div>
                        <div style={{"width": "50%"}}>
                            <SimilarCrystalsTable data={similarCrystals}/>
                        </div>
                    </div>
                }
                {
                    active === "Geometry" && isParsed &&
                    <div className={"tables"}>
                        <AtomTable data={atoms}/>
                        <BondTable data={bonds}/>
                    </div>
                }
                {
                    active === "UnitCell" && isParsed &&

                    <div className={"tables"}>
                        <UnitCellTable data={unitCell}/>
                        <SymmetryTable data={unitCell.SymmetryOperators}/>
                    </div>
                }
            </div>
        </div>
    )
}