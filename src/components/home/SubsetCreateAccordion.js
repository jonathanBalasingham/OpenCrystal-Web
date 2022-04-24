import cx from "classnames"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {Badge, Button, Form} from "react-bootstrap";
import {
    closeSubsetCreate, flushCreateSubset,
    getCreateSubsetOpen
} from "../../features/home/homeSlice";
import {CrystalTable} from "./CrystalTable";

export const SubsetCreateAccordion = () => {
    const dispatch = useDispatch()
    const [bodyOpen, setBodyOpen] = useState(false)
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [refCodes, setRefCodes] = useState([])
    const [refCodeText, setRefCodeText] = useState("")
    const [disabled, setDisabled] = useState(true)
    const [previewData, setPreviewData] = useState([])
    let open = useSelector(getCreateSubsetOpen)

    let token = useSelector(getAccessToken)
    
    const getPreview = () => {
        if (refCodes.length > 0) {
            fetch(`/api/crystal/by/refcode`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer:${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "RefCodes": refCodes,
                })
            }).then((data) => {
                if (data.status === 401) {
                    window.location.reload()
                } else if (data.status === 200) {
                    data.json().then((d) => {
                        setPreviewData(d["data"])
                    })
                }
            })
        }
    }


    const createSubset = () => {
        setMessage("Creating Subset..")
        fetch(`/api/subset/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "Name": name,
                "CrystalIds": refCodes,
            })
        }).then((resp) => {
            if (resp.status !== 200) {
                resp.json()
                    .then((data) => {
                        setMessage(`Creation Failed: ${data["message"] || ""}`)
                    })
            } else {
                resp.json()
                    .then((data) => {
                        setMessage("Creation Successful.")
                        fetch(`/api/search/subset/${name}?match=exact&aggregate=true`, {
                            headers: {
                                'Authorization': `Bearer:${token}`,
                                'Content-Type': 'application/json',
                            },
                        }).then(data => data.json())
                            .then(d => {
                                dispatch(flushCreateSubset(d.data))
                                setBodyOpen(false)
                                setRefCodeText("")
                                setRefCodes([])
                                setName("")
                                setMessage("")
                                setDisabled(true)
                                dispatch(closeSubsetCreate(false))
                            })
                    })
            }
        })
    }


    return (
        <>
            <div className="home-app-create-accordion">
                <div className={cx("create-accordion-header", {"open": open})}>
                    <Badge bg="primary">New</Badge>
                    <Form.Group className="mb-0" controlId="exampleForm.ControlInput1">
                        <Form.Label>Subset Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="" value={name} onChange={(e) => {
                            setName(e.target.value)
                            setBodyOpen(true)
                        }}/>
                    </Form.Group>
                    <p style={{"fontSize": "11px"}}>{message}</p>
                    <div style={{"display": "flex"}}>
                        <Button variant="danger" size="sm" style={{"marginRight": "10px"}} onClick={() => {
                            setName("")
                            setBodyOpen(false)
                            setRefCodeText("")
                            setRefCodes([])
                            dispatch(closeSubsetCreate(false))
                        }}>
                            Discard
                        </Button>
                        {
                            disabled && <Button variant="success" size="sm" disabled>
                                Create
                            </Button>
                        }
                        {
                            !disabled && <Button size="sm" variant="success" onClick={createSubset}>
                                Create
                            </Button>
                        }
                    </div>
                </div>
                <div className={cx("create-accordion-body", {"open": bodyOpen})} style={{"display": "flex", "alignItems":"stretch"}}>
                    <div style={{"width": "40%"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" style={{"height": "80%"}}>
                            <Form.Label>Reference Codes (comma-seperated)</Form.Label>
                            <Form.Control as="textarea" rows={3} value={refCodeText} style={{"height": "90%", "fontSize": "13px"}}
                                          onChange={(e) => {
                                              setRefCodeText(e.target.value)
                                              let r  = e.target.value.split(",").map((x) => {
                                                  return x.trim()
                                              })
                                              setRefCodes(r)
                                              setDisabled(e.target.value === "" || r.length === 0)
                                              console.log(refCodes)
                                          }}/>
                        </Form.Group>
                        <Button style={{"width": "100%"}} onClick={getPreview}>Preview</Button>
                    </div>
                    <div style={{"flexGrow": 1, "padding": "10px 20px", "maxWidth": "60%"}}>
                        <CrystalTable data={previewData}/>
                    </div>
                </div>
            </div>
        </>
    )
}