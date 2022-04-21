import cx from "classnames"
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {closeSourceCreate, flushCreateSource, getCreateSourceOpen} from "../../features/home/homeSlice";
import {Badge, Button, Form} from "react-bootstrap";
import {getAccessToken} from "../../features/auth/authSlice";

export const SourceCreateAccordion = () => {
    let dispatch = useDispatch()
    let open = useSelector(getCreateSourceOpen)
    const [name, setName] = useState("")
    const [type, setType] = useState("public")
    const [message, setMessage] = useState("")
    let token = useSelector(getAccessToken)

    const createSource = () => {
        setMessage("Creating Source...")
        fetch(`/api/source/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "name": name,
                "type": type,
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
                        fetch(`/api/search/source/${name}?match=exact`, {
                            headers: {
                                'Authorization': `Bearer:${token}`,
                                'Content-Type': 'application/json',
                            },
                        }).then(data => data.json())
                            .then(d => {
                                dispatch(flushCreateSource(d.data))
                                dispatch(closeSourceCreate(false))
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
                        <Form.Label>Source Name</Form.Label>
                        <Form.Control size="sm" type="text" placeholder="" value={name} onChange={(e) => {
                            setName(e.target.value)
                        }}/>
                    </Form.Group>
                    <Form.Group className="mb-0" >
                        <Form.Label>Source Type</Form.Label>
                        <div key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Public"
                                name="group1"
                                type="radio"
                                id={`source-create-inline-radio-1`}
                                onClick={() => setType("public")}
                            />
                            <Form.Check
                                inline
                                label="Private"
                                name="group1"
                                type="radio"
                                id={`source-create-inline-radio-2`}
                                onClick={() => setType("private")}
                            />
                        </div>
                    </Form.Group>
                    <p style={{"fontSize": "11px"}}>{message}</p>
                    <div style={{"display": "flex"}}>
                        <Button variant="danger" style={{"marginRight": "10px"}} onClick={() => {
                            setName("")
                            setType("public")
                            dispatch(closeSourceCreate(false))
                        }}>
                            Discard
                        </Button>
                        <Button variant="success" style={{"marginRight": "10px"}} onClick={createSource}>
                            Create
                        </Button>
                    </div>
                </div>
            </div>
        </>
    )
}