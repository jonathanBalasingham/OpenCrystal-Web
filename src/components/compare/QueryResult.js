import React from 'react'
import {FaPlus} from "react-icons/fa";
import {useDispatch} from "react-redux";
import {addComp} from "../../features/compare/compareSlice";


export function QueryResult(data) {
    const dispatch = useDispatch()
    const addToComparison = (e) => {
        console.log(e.target.id);
        let name = e.target.id.replace("-add-button", "")
        console.log("name is" + name)
        dispatch(addComp(name))
    }

    return (
        <div className="query-result" id={data["name"] + "-result"}>
            <h4 className={"query-result-name"}>{data["name"]}</h4>
            <button id={data["name"] + "-add-button"} className={"query-result-button"} onClick={e => addToComparison(e)}>
                +
            </button>
            <h6 className={"query-result-id"}>{data["family"]}</h6>
            <p className={"query-result-source"}>{data["Source"]["name"]}</p>
        </div>
    )
}