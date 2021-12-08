import * as React from "react";
import './Compare.css'
import {useDispatch, useSelector} from "react-redux";
import {getMeasure, getThreshold, setK, setMeasure, setThreshold, getK} from "../../features/compare/compareSlice";



function GraphControls(){
    const dispatch = useDispatch()
    let threshold = useSelector(getThreshold)
    let k = useSelector(getK)
    let measure = useSelector(getMeasure)

    return (
        <>
            <p>{`Nearest Neighbors: ${k}`}</p>
            <input type="range" id="k" name="k" onChange={e => dispatch(setK(e.target.value))}
                   min="1" max="200" value={k} step="1" />
            <p>{`Edge Threshold: ${threshold}`}</p>
            <input type="range" id="threshold" name="threshold"
                   onChange={e => dispatch(setThreshold(e.target.value))}
                   min="0" max="5" value={threshold} step="0.05" />
            <p>{`Measure: ${measure.toUpperCase()}`}</p>
            <select name="measure" id="measure"
                onChange={e => dispatch(setMeasure(e.target.value))}>
                <option value="pdd">PDD</option>
                <option value="amd">AMD</option>
            </select>
        </>
    )
}

function ThresholdSettings() {
    return (
        <>
            <GraphControls/>
        </>
    )
}


function MSTSettings() {
    return (
        <>
            <GraphControls/>
        </>
    )
}

function DendrogramSettings() {
    return (
        <>
            <p>Dendrogram</p>
        </>
    )
}

export const settingsMap = {"mst": MSTSettings(),
                            "full": ThresholdSettings(),
                            "dendrogram": DendrogramSettings()}