import cx from "classnames"
import React, {useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getCreateCrystalOpen, closeCrystalCreate} from "../../features/home/homeSlice";
import {Badge, Button, Form} from "react-bootstrap"
import {cifParser} from "cif-to-json";
import {setCurrentMessage, setReadingFile} from "../../features/create/createSlice";
import {extractAtoms, extractBonds, extractCrystalMetaData, extractUnitCell} from "../create/CreateAppMainCrystal";

export const CrystalCreateAccordion = () => {
    let open = useSelector(getCreateCrystalOpen)
    let dispatch = useDispatch()
    const [bodyOpen, setBodyOpen] = useState(false)
    const [refCode, setRefCode] = useState("")
    const [validRefCode, setValidRefCode] = useState(false)
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [isParsed, setIsParsed] = useState(false)
    const [cifAsJson, setCifAsJson] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [message, setMessage] = useState("")

    const createCrystal = () => {
        setMessage("Creating Crystal..")
        setMessage("Extracting meta data..")
        let crystal = extractCrystalMetaData(cifAsJson)
        setMessage("Extracting atoms..")
        let atoms = extractAtoms(cifAsJson, id)
        setMessage("Extracting bonds..")
        let bonds = extractBonds(cifAsJson, id)
        setMessage("Extracting unit cell..")
        let unitCell = extractUnitCell(cifAsJson, id)
        setMessage("Checking Reference Code..")
    }

    const checkReferenceCode = (refCode) => {
        return false
    }

    const parseCIF = (fileContents) => {
        let result = cifParser(fileContents);
        console.log(result)
        return result
    }

    const changeHandler = async(event) => {
        console.log("handling change")
        const file = event.target.files.item(0)
        dispatch(setReadingFile(true))
        const text = await file.text();
        let parsed = parseCIF(text)
        dispatch(setReadingFile(false))
        setIsFilePicked(true)
        setCifAsJson(parsed)
        setIsParsed(true)
    };

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
                    }}/>
                </Form.Group>
                <Form.Group controlId="formFileSm" className="mb-3">
                    <Form.Label>Small file input example</Form.Label>
                    <Form.Control type="file" size="sm" onChange={changeHandler}/>
                </Form.Group>
                <p>{message}</p>
                <div style={{"display": "flex"}}>
                    <Button size="sm" variant="danger" onClick={() => {
                        dispatch(closeCrystalCreate(""))
                        setIsFilePicked(false)
                        setIsParsed(false)
                        setRefCode("")
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
            <div className={cx("create-accordion-body", {"open": isFilePicked && isParsed})}>

            </div>
        </div>
    )
}