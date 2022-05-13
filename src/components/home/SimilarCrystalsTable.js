import React, {useState} from "react";
import {ButtonGroup, Button, Spinner} from "react-bootstrap";

const SimilarCrystalRow = ({datum}) => {
    let d = datum.Distance
    if (datum.Distance === undefined)
        d = "N/A"
    else
        d = d.toFixed(6)


    return (
        <tr>
            <td>{datum.name}</td>
            <td>{datum.family}</td>
            <td>{datum.Polymorph}</td>
            <td>{datum.Source.name}</td>
            <td>{d}</td>
        </tr>
    )
}

export const SimilarCrystalsTable = ({data, pddData, loading}) => {
    const [rankBy, setRankBy] = useState("amd")
    let c = {}
    for (var row in data) {
        c[data[row].name] = data[row]
    }
    let sortable = [];
    for (var i in pddData) {
        sortable.push([i, pddData[i]]);
    }
    sortable.sort(function(a, b) {
        return a[1] - b[1];
    });

    return (
        <div>
            <p style={{"margin": "5px 25px"}}>Similar Crystals</p>
            <ButtonGroup aria-label="Basic example" style={{"margin-left": "25px"}}>
                <Button variant="primary" onClick={() => setRankBy("amd")} size={"sm"}>AMD</Button>
                <Button variant="primary" disabled={pddData === undefined || pddData === {}} onClick={() => setRankBy("pdd")} size={"sm"}>PDD</Button>
            </ButtonGroup>
            <table className={"amd-table"}>
                <thead>
                <tr>
                    <th colSpan="1">Reference Code</th>
                    <th colSpan="1">Family</th>
                    <th colSpan="1">Polymorph</th>
                    <th colSpan="1">Source</th>
                    <th colSpan="1">Distance</th>
                </tr>
                </thead>
                <tbody>
                {
                    loading &&
                    <div style={{"display": "grid", "width": "100%",
                        "height": "100%", "placeItems": "center"}}>
                        <Spinner animation="border" variant="primary" />
                    </div>
                }
                { !loading && rankBy === "amd" && data.map(function (i) {
                    return <SimilarCrystalRow datum={i}/>
                })}
                { !loading && rankBy === "pdd" && sortable && sortable.map(function (i) {
                    if (!c[i[0]])
                        return undefined
                    return <SimilarCrystalRow datum={{...c[i[0]], "Distance": i[1]}}/>
                })}
                </tbody>
            </table>
        </div>
    )
}