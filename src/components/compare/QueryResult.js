import React, {useState} from 'react'
import {FaPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addComp} from "../../features/compare/compareSlice";
import {BsChevronRight, BsChevronDown} from "react-icons/all";


export function QueryResult({data}) {
    const dispatch = useDispatch()
    const addToComparison = (e) => {
        console.log(e.target.id);
        let name = e.target.id.replace("-add-button", "").replace("-add-crystal-button", "")
        console.log("name is" + name)
        dispatch(addComp(name))
    }

    const [open, setOpen] = useState(false)

    let dis = open ? "block" : "none"
    let border = open ? "none" : "2px solid var(--defaultborder)"

    return (
        <div id={data["name"] + "-accordion"} className={"query-result-accordion"}>
            <div className="query-result" id={data["name"] + "-result"} >
                <button id={data["name"] + "-open-button"} className={"query-result-open-button"} onClick={() => setOpen(!open)}>
                    {open ? <BsChevronDown /> : <BsChevronRight/>}
                </button>
                <h4 className={"query-result-name"}>{data["name"]}</h4>
                <h6 className={"query-result-id"}>{data["family"]}</h6>
                <p className={"query-result-source"}>{data["Source"]["name"]}</p>
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
                <button id={data["name"] + "-add-family-button"} className={"query-result-dropdown-button"} onClick={e => addToComparison(e)}>
                    Add Family
                </button>
            </div>
        </div>
    )
}