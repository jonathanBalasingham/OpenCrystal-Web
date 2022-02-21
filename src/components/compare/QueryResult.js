import React, {useState} from 'react'
import {FaPlus} from "react-icons/fa";
import {useDispatch, useSelector} from "react-redux";
import {addComp, addComps} from "../../features/compare/compareSlice";
import {BsChevronRight, BsChevronDown} from "react-icons/all";
import {getFacet} from "../../features/search/searchSlice";


async function getFamily(e) {
    let name = e.target.id.replace("-add-family-button", "")
    return fetch(`/api/compare/family/${name}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

async function getSubset(name) {
    return fetch(`/api/subset/${name}`, {
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => data.json())
}

export function QueryResult({data}) {
    const dispatch = useDispatch()
    const addToComparison = (e) => {
        let name = e.target.id.replace("-add-button", "").replace("-add-crystal-button", "")
        dispatch(addComp(name))
    }

    const addSubset = async(e) => {
        let name = e.target.id.replace("-add-button", "")
        const res = await getSubset(name)
        dispatch(addComps(res["names"]))
    }


    const [open, setOpen] = useState(false)

    const addFamily = async(e) => {
        const res = await getFamily(e)
        dispatch(addComps(res["names"]))
    }

    let dis = open ? "block" : "none"
    let type = useSelector(getFacet)

    if (type === "subset") {
        return (
            <div className="query-result" id={data["name"] + "-result"} >
                <h5 className={"query-result-name"} style={{"font-size":"15px"}}>{`${data["name"]}`}</h5>
                <h6 className={"query-result-id"}>{`Entries: ${data["entries"]}`}</h6>
                <button id={data["name"] + "-add-button"} className={"query-result-quick-add-button"} onClick={e => addSubset(e)}>
                    +
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
                    <p className={"query-result-source"}>{data["source"]["name"]}</p>
                    <button id={data["name"] + "-add-button"} className={"query-result-quick-add-button"} onClick={e => addToComparison(e)}>
                        +
                    </button>
                </div>
                <div id={data["name"] + "-dropdown"} className={"query-result-dropdown"}  style={{'display': dis}}>
                    <p>Polymorph:</p>
                    <p>Geometry: </p>
                    <p>Disordered:</p>
                    <p style={{'margin-bottom': '6px'}}>Family Members:</p>
                    <button id={data["name"] + "-add-crystal-button"} className={"query-result-dropdown-button"} onClick={e => addToComparison(e)}>
                        Add Crystal
                    </button>
                    <button id={data["name"] + "-add-family-button"} className={"query-result-dropdown-button"} onClick={e => addFamily(e)}>
                        Add Family
                    </button>
                </div>
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
                    <button id={data["name"] + "-add-button"} className={"query-result-quick-add-button"} onClick={e => addToComparison(e)}>
                        +
                    </button>
                </div>
                <div id={data["name"] + "-dropdown"} className={"query-result-dropdown"}  style={{'display': dis}}>
                    <p>Polymorph:</p>
                    <p>Geometry: </p>
                    <p>Disordered:</p>
                    <p style={{'margin-bottom': '6px'}}>Family Members:</p>
                    <button id={data["name"] + "-add-crystal-button"} className={"query-result-dropdown-button"} onClick={e => addToComparison(e)}>
                        Add Crystal
                    </button>
                    <button id={data["name"] + "-add-family-button"} className={"query-result-dropdown-button"} onClick={e => addFamily(e)}>
                        Add Family
                    </button>
                </div>
            </div>
        )
    }

}