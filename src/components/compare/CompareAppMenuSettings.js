import * as React from "react";
import './Compare.scss'
import '../../App.scss'
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
    setKy, setLinkage, getKs, setKs, getThresholds, setThresholds, getGraphType
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
                   min="1" max="200" value={k} step="1" className={"range-style"} />
            <p>{`Edge Threshold: ${threshold.toFixed(6)}`}</p>
            <input type="range" id="threshold" name="threshold"
                   onChange={e => dispatch(setThreshold(e.target.value))}
                   min="0" max={maxThresh} value={threshold} step={maxThresh / 100} className={"range-style"}  />
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

function CircleControls() {
    const dispatch = useDispatch()
    let ks = useSelector(getKs)
    let thresholds = useSelector(getThresholds)

    const replaceKs = (val, ind) => {
        let kscopy = [...ks]
        kscopy[ind] = val
        dispatch(setKs(kscopy))
    }

    const replaceThresholds = (val, ind) => {
        let thresholds_copy = [...thresholds]
        thresholds_copy[ind] = val
        dispatch(setThresholds(thresholds_copy))
    }

    return  (
        <>
            <p>{`Linkage:`}</p>
            <select name="Linkage:" id="linkage-select" onChange={ e => dispatch(setLinkage(e.target.value))}>
                <option value="single">Single</option>
                <option value="average">Average</option>
                <option value="complete">Complete</option>
            </select>
            <p>{`Layer Nearest-Neighbors: ${ks}`}</p>
            <input type="range" id="ks1" name="ks1" onChange={e => replaceKs(e.target.value, 0)}
                   min="1" max="1000" value={ks[0]} step="1" className={"range-style"}  />
            <input type="range" id="ks2" name="ks2" onChange={e => replaceKs(e.target.value, 1)}
                   min="1" max="1000" value={ks[1]} step="1" className={"range-style"} />
            <input type="range" id="ks3" name="ks3" onChange={e => replaceKs(e.target.value, 2)}
                   min="1" max="1000" value={ks[2]} step="1" className={"range-style"} />
            <input type="range" id="ks4" name="ks4" onChange={e => replaceKs(e.target.value, 3)}
                   min="1" max="1000" value={ks[3]} step="1" className={"range-style"} />
            <p>{`Layer Distance Threshold: ${thresholds}`}</p>
            <input type="range" id="threshold1" name="threshold1" onChange={e => replaceThresholds(e.target.value, 0)}
                   min="0.001" max="1" value={thresholds[0]} step="0.001" className={"range-style"} />
            <input type="range" id="threshold2" name="threshold2" onChange={e => replaceThresholds(e.target.value, 1)}
                   min="0.001" max="1" value={thresholds[1]} step="0.001" className={"range-style"} />
            <input type="range" id="threshold3" name="threshold3" onChange={e => replaceThresholds(e.target.value, 2)}
                   min="0.001" max="1" value={thresholds[2]} step="0.001" className={"range-style"} />
            <input type="range" id="threshold4" name="threshold4" onChange={e => replaceThresholds(e.target.value, 3)}
                   min="0.001" max="1" value={thresholds[3]} step="0.001" className={"range-style"} />

        </>
    )
}

const AMDSettings = () => {
    return (
        <AMDControls/>
    )
}


function AMDControls() {
    const dispatch = useDispatch()
    let k_x = useSelector(getKx)
    let k_y = useSelector(getKy)
    let maxThresh = useSelector(getMaxThreshold)
    let threshold = useSelector(getThreshold)
    let k = useSelector(getK)

    return  (
        <>
            <p>{`X-Axis: AMD ${k_x}`}</p>
            <input type="range" id="k_x" name="k_x" onChange={e => dispatch(setKx(e.target.value))}
                   min="1" max="200" value={k_x} step="1" className={"range-style"} />
            <p>{`Y-Axis: AMD ${k_y}`}</p>
            <input type="range" id="k_y" name="k_y" onChange={e => dispatch(setKy(e.target.value))}
                   min="1" max="200" value={k_y} step="1" className={"range-style"} />
            <p>{`Edge Nearest Neighbors: ${k}`}</p>
            <input type="range" id="k" name="k" onChange={e => dispatch(setK(e.target.value))}
                   min="1" max="200" value={k} step="1" className={"range-style"} />
            <p>{`Edge Threshold: ${threshold.toFixed(6)}`}</p>
            <input type="range" id="threshold" name="threshold"
                   onChange={e => dispatch(setThreshold(e.target.value))}
                   min="0" max={maxThresh} value={threshold} step={maxThresh / 100} className={"range-style"}  />
        </>
    )
}


const CircleSettings = () => {
    return (
        <CircleControls/>
    )
}

const settingsMap = {"mst": MSTSettings(),
                            "full": ThresholdSettings(),
                            "dendrogram": DendrogramSettings(),
                            "map": MapSettings(),
                            "amd": AMDSettings(),
                            "circle": CircleSettings(),
                            "sunburst": CircleSettings(),
}

export const CompareAppMenuSettings = () => {
    let plotType = useSelector(getGraphType)
    console.log(plotType)
    return (
        <>
            {settingsMap[plotType]}
        </>
    )
}