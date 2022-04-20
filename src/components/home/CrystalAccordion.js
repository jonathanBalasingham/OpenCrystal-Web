import cx from "classnames"
import React, {useState} from "react";
import {Button, Form} from "react-bootstrap"
import {BsChevronDown, BsChevronRight} from "react-icons/all";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {LoadingCustom} from "../../Loading";
import {CrystalAccordionBody} from "./CrystalAccordionBody";
import {addComp} from "../../features/compare/compareSlice";
import {addView} from "../../features/view/viewSlice";
import {openCompareApp, openViewApp} from "../../features/app/appSlice";
import {handleTickBox} from "../../features/home/homeSlice";


export const CrystalAccordion = ({dataset}) => {
    let dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [dataReady, setDataReady] = useState(false)
    let token = useSelector(getAccessToken)


    const handleClick = () => {
        setOpen(!open)
        if (!loaded) {
            setLoading(true)
            fetch(`/api/crystal/molecule/${dataset.ID}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer:${token}`,
                },
            })
                .then(data => data.json())
                .then((d) => {
                    setLoading(false)
                    setData(d)
                    setDataReady(true)
                    setLoaded(true)
                })
        }
    }

    console.log(`dataready is ${dataReady}`)

    return (
        <div className={"crystal-accordion"}>
            <div className={cx("crystal-accordion-header", {"open": open})}>
                <div className={"group-1"}>
                    <button className={"query-result-open-button"} onClick={handleClick}>
                        {open ? <BsChevronDown /> : <BsChevronRight/>}
                    </button>
                    <Form.Check aria-label="option 1" onChange={() => dispatch(handleTickBox(dataset.name))}/>
                    <p>{dataset.name}</p>
                </div>
                <p>{dataset.CreatedAt}</p>
                <div className="button-set">
                    <Button size="sm" onClick={() => {
                        dispatch(openCompareApp(""))
                        dispatch(addComp(dataset.name))
                    }}>
                        Compare
                    </Button>
                    <Button size="sm" onClick={() => {
                        dispatch(openViewApp(""))
                        dispatch(addView(dataset.name))
                    }}>
                        View
                    </Button>
                </div>
            </div>
            <div className={cx("crystal-accordion-body", {"open": open})}>
                { loading && <LoadingCustom/> }
                { dataReady && <CrystalAccordionBody data={data}/>}
            </div>
        </div>
    )
}