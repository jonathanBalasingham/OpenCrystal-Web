import * as React from "react";
import {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getComp, removeComp, getCrystalListOpen, setRemoved} from "../../features/compare/compareSlice";
import {FaMinus} from "react-icons/fa";
import {QueryResult} from "./QueryResult";
import cx from "classnames"
import {openSearchPanel} from "../../features/search/searchSlice";


export function AddedQueryResult(cname) {
    const dispatch = useDispatch()
    const addToComparison = (e) => {
        console.log(e.target.id);
        let name = e.target.id.replace("-remove-button", "")
        dispatch(setRemoved(name))
    }

    return (
        <div className="query-result-added" id={cname + "-result-added"}>
            <h4 className={"query-result-name"}>{cname}</h4>
            <button id={cname + "-remove-button"} className={"query-result-remove-button"} onClick={e => addToComparison(e)}>
                -
            </button>
        </div>
    )
}


export function CrystalList({}) {
    const currentComp = useSelector(getComp)
    let open = useSelector(getCrystalListOpen)
    const endRef = useRef(null)
    const [filter, setFilter] = useState("")

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    let filtered = currentComp
    if (filter !== ""){
        filtered = currentComp.filter(function (str) {
            let output = str.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
            console.log(`Compare ${str} to ${filter}, result is ${output}`)
            return output
        });
    }
    const numberOfResults = Math.min(200, filtered.length)
    let resultsToRender = filtered.slice(0, numberOfResults)

    console.log(`Results: ${resultsToRender}`)
    useEffect(() => {
        scrollToBottom()
    }, [currentComp]);

    return (
        <div id="current-crystal-list" className={cx("crystal-list", {"open": open})}>
            <input className={"top-filter"}  placeholder={"Filter"}
                   onChange={e => setFilter(e.target.value)} />
            {resultsToRender.map(AddedQueryResult)}
            <div ref={endRef} />
        </div>
    )
}
