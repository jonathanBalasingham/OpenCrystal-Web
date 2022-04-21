import {Button, Form} from "react-bootstrap";
import {BsChevronDown, BsChevronRight} from "react-icons/all";
import {handleTickBox} from "../../features/home/homeSlice";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import cx from "classnames"
import {CrystalTable} from "./CrystalTable";


export const SubsetAccordion = ({dataset}) => {
    let dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [loaded, setLoaded] = useState(false)
    let token = useSelector(getAccessToken)

    const addSubset = () => {

    }

    const handleClick = () => {
        setOpen(!open)
        if (!loaded) {
            setLoading(true)
            fetch(`/api/search/crystal/subset/${dataset.Name}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer:${token}`,
                },
            })
                .then(data => data.json())
                .then((d) => {
                    setLoading(false)
                    setData(d.data)
                    setLoaded(true)
                })
        }
    }

    if (loading)
        return <div></div>

    return (
        <div className={"accordion"}>
            <div className={"accordion-header"} >
                <div className={"group-1"}>
                    <button className={"query-result-open-button"} onClick={handleClick}>
                        {open ? <BsChevronDown /> : <BsChevronRight/>}
                    </button>
                    <Form.Check aria-label="option 1" onChange={() => dispatch(handleTickBox(dataset.name))}/>
                    <p>{dataset.Name}</p>
                </div>
                <p>{`Size: ${dataset.Crystals}`}</p>
                <Button onClick={addSubset}>
                    Compare
                </Button>
            </div>
            <div className={cx("accordion-body", {"open": open})}>
                <CrystalTable data={data} />
            </div>
        </div>
    )
}