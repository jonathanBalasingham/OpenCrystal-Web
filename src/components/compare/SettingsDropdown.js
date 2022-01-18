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
    getMaxThreshold,
    getKx,
    getKy,
    setKx,
    setKy,
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

function AMDControls() {
    const dispatch = useDispatch()
    let k_x = useSelector(getKx)
    let k_y = useSelector(getKy)

    return  (
        <>
            <p>{`X-Axis: ${k_x}`}</p>
            <input type="range" id="k_x" name="k_x" onChange={e => dispatch(setKx(e.target.value))}
                   min="1" max="200" value={k_x} step="1" />
            <p>{`Y-Axis: ${k_y}`}</p>
            <input type="range" id="k_y" name="k_y" onChange={e => dispatch(setKy(e.target.value))}
                   min="1" max="200" value={k_y} step="1" />
        </>
    )
}

const AMDSettings = () => {
    return (
        <AMDControls/>
    )
}

export const settingsMap = {"mst": MSTSettings(),
                            "full": ThresholdSettings(),
                            "dendrogram": DendrogramSettings(),
                            "map": MapSettings(),
                            "amd": AMDSettings()
}