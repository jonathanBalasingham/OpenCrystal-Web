import * as React from "react";
import {useEffect, useRef} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getComp, removeComp} from "../../features/compare/compareSlice";
import {FaMinus} from "react-icons/fa";
import {QueryResult} from "./QueryResult";


export function AddedQueryResult(cname) {
    const dispatch = useDispatch()
    const addToComparison = (e) => {
        console.log(e.target.id);
        let name = e.target.id.replace("-remove-button", "")
        dispatch(removeComp(name))
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
    const endRef = useRef(null)

    const scrollToBottom = () => {
        endRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [currentComp]);

    return (
        <div id="current-crystal-list">
            {currentComp.map(AddedQueryResult)}
            <div ref={endRef} />
        </div>
    )
}
