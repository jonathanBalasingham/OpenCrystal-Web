import cx from "classnames"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {Badge, Button, Form} from "react-bootstrap";
import {
    closeSubsetCreate, flushCreateSubset,
    getCreateSubsetOpen
} from "../../features/home/homeSlice";

export const SubsetCreateAccordion = () => {
    const dispatch = useDispatch()
    const [bodyOpen, setBodyOpen] = useState(false)
    const [name, setName] = useState("")
    const [message, setMessage] = useState("")
    const [refCodes, setRefCodes] = useState([])
    const [refCodeText, setRefCodeText] = useState("")
    const [disabled, setDisabled] = useState(true)
    let open = useSelector(getCreateSubsetOpen)

    let token = useSelector(getAccessToken)


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
                            !disabled && <Button size="sm" variant="success" style={{"marginRight": "10px"}} onClick={createSubset}>
                                Create
                            </Button>
                        }
                    </div>
                </div>
                <div className={cx("create-accordion-body", {"open": bodyOpen})}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} value={refCodeText}
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
                </div>
            </div>
        </>
    )
}