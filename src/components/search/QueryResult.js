import React, {useState} from 'react'
import {FaPlus} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {addComp, addComps} from "../../features/compare/compareSlice";
import {BsChevronRight, BsChevronDown} from "react-icons/all";
import {getCompType, getFacet} from "../../features/search/searchSlice";
import {getOpenApp} from "../../features/app/appSlice";
import {addView} from "../../features/view/viewSlice";
import {QueryResultDropdownData} from "./QueryResultDropdownData";
import BlockIcon from "@mui/icons-material/Block"
import AddIcon from "@mui/icons-material/Add"
import cx from "classnames"
import "./search.scss"
import {getAccessToken} from "../../features/auth/authSlice";


async function getFamily(e, token) {
    let name = e.target.id.replace("-add-family-button", "")
    return fetch(`/api/compare/family/${name}`, {
        headers: {
            'Authorization': `Bearer:${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function getSubset(name, token) {
    return fetch(`/api/subset/${name}`, {
        headers: {
            'Authorization': `Bearer: ${token}`,
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

export function QueryResult({data}) {
    let currentApp = useSelector(getOpenApp)
    const dispatch = useDispatch()
    const [name, setName] = useState(data["name"])
    let token = useSelector(getAccessToken)


    const addCrystal = (e) => {
        if (currentApp === "compare") {
            if (data["Has3dStructure"] && !data["IsDisordered"]) {
                dispatch(addComp(name))
            }
        } else if (currentApp === "view") {
            if (data["Has3dStructure"]) {
                dispatch(addView(name))
            }
        }
    }

    const addSubset = async(name) => {
        const res = await getSubset(name, token)
        dispatch(addComps(res["names"]))
    }


    const [open, setOpen] = useState(false)

    const addFamily = async(e) => {
        const res = await getFamily(e, token)
        dispatch(addComps(res["names"]))
    }

    let dis = open ? "block" : "none"
    let type = useSelector(getFacet)
    let compType = useSelector(getCompType)

    let addButton = <button id={data["name"] + "-add-button"} className={"query-result-quick-add-button"} onClick={e => addCrystal(e)}>
        <AddIcon/>
    </button>

    if (currentApp === "compare") {
        if (!data["Has3dStructure"] || data["IsDisordered"]){
            addButton  = <button className={"query-result-quick-add-button"}>
                <BlockIcon/>
            </button>
        }
    } else if (currentApp === "view") {
        if (!data["Has3dStructure"]){
            addButton  = <button className={"query-result-quick-add-button"}>
                <BlockIcon/>
            </button>
        }
    }


    let dropdown =  <div id={data["name"] + "-dropdown"} className={"query-result-dropdown"}  style={{'display': dis}}>
        <QueryResultDropdownData label={"Composition:"} value={data["Composition"]}/>
        <QueryResultDropdownData label={"Prime Composition:"} value={data["PrimeComposition"]}/>
        <QueryResultDropdownData label={"Chemical Name:"} value={data["ChemicalName"]}/>
        <QueryResultDropdownData label={"Polymorph:"} value={data["Polymorph"]}/>
        <QueryResultDropdownData label={"Has 3D Structure:"} value={data["Has3dStructure"]}/>
        <QueryResultDropdownData label={"Is Disordered:"} value={data["IsDisordered"]}/>
        <div className={"query-result-dropdown-button-row"}>
            <button id={data["name"] + "-add-crystal-button"}
                    className={cx("query-result-dropdown-button", {"disabled": !data["Has3dStructure"] || (data["IsDisordered"] && currentApp === "compare")})}
                    onClick={() => addCrystal()}>
                Add Crystal
            </button>
            <button id={data["name"] + "-add-family-button"} className={"query-result-dropdown-button"} onClick={e => addFamily(e)}>
                Add Family
            </button>
        </div>
    </div>


    if (type === "subset") {
        return (
            <div className="query-result" id={data["name"] + "-result"} >
                <h5 className={"query-result-name"} style={{"font-size":"15px"}}>{`${data["name"]}`}</h5>
                <h6 className={"query-result-id"}>{`Entries: ${data["entries"]}`}</h6>
                <button id={data["name"] + "-add-button"} className={"query-result-quick-add-button"} onClick={() => addSubset(data["name"])}>
                    <AddIcon/>
                </button>
            </div>
        )
    } else if (type === "name") {
        return (
            <div id={data["name"] + "-accordion"} className={"query-result-accordion"}>
                <div className="query-result" id={data["name"] + "-result"} >
                    <button id={data["name"] + "-open-button"} className={"query-result-open-button"} onClick={() => setOpen(!open)}>
                        {open ? <BsChevronDown /> : <BsChevronRight/>}
                    </button>
                    <h4 className={"query-result-name"}>{data["name"]}</h4>
                    <h6 className={"query-result-id"}>{data["family"]}</h6>
                    <p className={"query-result-source"}>{data["Source"]["name"]}</p>
                    {addButton}
                </div>
                {dropdown}
            </div>
        )
    } else if (type === "similarity") {
        return (
            <div id={data["name"] + "-accordion"} className={"query-result-accordion"}>
                <div className="query-result" id={data["name"] + "-result"} >
                    <button id={data["name"] + "-open-button"} className={"query-result-open-button"} onClick={() => setOpen(!open)}>
                        {open ? <BsChevronDown /> : <BsChevronRight/>}
                    </button>
                    <div className="query-result-name-with-sim">
                        <h4>{data["name"]}</h4>
                        <p>{`Distance: ${data["distance"]}`}</p>
                    </div>
                    <h6 className={"query-result-id"}>{data["family"]}</h6>
                    <p className={"query-result-source"}>{data["source"]["name"]}</p>
                    {addButton}
                </div>
                {dropdown}
            </div>
        )
    } else if (type === "composition") {
        let k = "Composition"
        if (compType === "coprime"){
            k = "PrimeComposition"
        }
        return (
            <div id={data["name"] + "-accordion"} className={"query-result-accordion"}>
                <div className="query-result" id={data["name"] + "-result"} >
                    <button id={data["name"] + "-open-button"} className={"query-result-open-button"} onClick={() => setOpen(!open)}>
                        {open ? <BsChevronDown /> : <BsChevronRight/>}
                    </button>
                    <div className="query-result-name-with-sim">
                        <h4>{data["name"]}</h4>
                        <p>{`${data[k]}`}</p>
                    </div>
                    <h6 className={"query-result-id"}>{data["family"]}</h6>
                    <p className={"query-result-source"}>{data["Source"]["name"]}</p>
                    {addButton}
                </div>
                {dropdown}
            </div>
        )
    }

}