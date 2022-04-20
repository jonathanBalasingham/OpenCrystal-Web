import {useEffect, useState} from "react";
import {LoadingCustom} from "../../Loading";
import {CrystalAccordion} from "./CrystalAccordion";
import {useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {getSelected} from "../../features/home/homeSlice";


const SelectedCount = () => {
    let selected = useSelector(getSelected)
    return (
        <h6 style={{"padding": "10px 20px", "font-size": "13px", "font-style": "italic"}}>
            {`${selected.length} items selected`}</h6>
    )
}

export const CrystalAccordionList = ({}) => {
    const [dataset, setDataset] = useState(null)
    const [loading, setLoading] = useState(false)
    const [dataReady, setDataReady] = useState(false)
    let token = useSelector(getAccessToken)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/search/recent`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer:${token}`,
            },
        })
            .then(data => data.json())
            .then((d) => {
                setLoading(false)
                setDataset(d.data)
                setDataReady(true)
            })
    },[])

    if (loading) {
        return <LoadingCustom/>
    }

    if (!dataReady)
        return <div></div>

    return (
        <div className={"crystal-accordion-list"}>
            <SelectedCount/>
            {dataset.map((d) => {
                return <CrystalAccordion dataset={d}/>
            })}
        </div>
    )
}