import * as React from "react";
import './Compare.css'
import {useDispatch, useSelector} from "react-redux";
import {
    getMeasure,
    getThreshold,
    setK,
    setMeasure,
    setThreshold,
    getK,
    getMaxThreshold
} from "../../features/compare/compareSlice";



function GraphControls(){
    const dispatch = useDispatch()
    let threshold = useSelector(getThreshold)
    let k = useSelector(getK)
    let measure = useSelector(getMeasure)
    let maxThresh = useSelector(getMaxThreshold)

    return (
        <>
            <p>{`Nearest Neighbors: ${k}`}</p>
            <input type="range" id="k" name="k" onChange={e => dispatch(setK(e.target.value))}
                   min="1" max="200" value={k} step="1" />
            <p>{`Edge Threshold: ${threshold.toFixed(6)}`}</p>
            <input type="range" id="threshold" name="threshold"
                   onChange={e => dispatch(setThreshold(e.target.value))}
                   min="0" max={maxThresh} value={threshold} step={maxThresh / 100} />
            <p>{`Measure: ${measure.toUpperCase()}`}</p>
            <div style={{'display': 'inline-block'}}>
                <button className="graph-control-button"
                        onClick={() => dispatch(setMeasure("pdd"))}>PDD</button>
                <button className="graph-control-button"
                        onClick={() => dispatch(setMeasure("amd"))}>AMD</button>
            </div>
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

function MapSettings() {
    return (
        <>
            <GraphControls/>

        </>
    )
}

export const settingsMap = {"mst": MSTSettings(),
                            "full": ThresholdSettings(),
                            "dendrogram": DendrogramSettings(),
                            "map": MapSettings()}