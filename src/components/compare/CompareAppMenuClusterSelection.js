import * as React from "react";
import { CompareAppMenuGraphSelectionButton } from "./CompareAppMenuGraphSelectionButton"
import {useDispatch, useSelector} from "react-redux";
import {getBreakout, getGraphType, setBreakout} from "../../features/compare/compareSlice";

export const CompareAppMenuClusterSelection = () => {
    let dispatch = useDispatch()
    let breakout = useSelector(getBreakout)
    let graphType = useSelector(getGraphType)

    if (graphType === "circle" || graphType === "sunburst") {
        return <div>

        </div>
    }

    const changeBreakout = (e) => {
        dispatch(setBreakout(e.target.value))
    }

    return (
        <>
            <h6>CLUSTER BY</h6>
            <div className="plot-app-menu-cluster-selection">
                <select className={"cluster-facet"} value={breakout} onChange={(e) => changeBreakout(e)}>
                    <option value={"family"}>Family</option>
                    <option value={"polymorph"}>Polymorph</option>
                    <option value={"composition"}>Composition</option>
                    <option value={"prime_composition"}>Prime Composition</option>
                </select>
            </div>
        </>
    )
}

