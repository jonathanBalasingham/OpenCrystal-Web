import React from "react";

const SimilarCrystalRow = ({datum}) => {

    return (
        <tr>
            <td>{datum.name}</td>
            <td>{datum.family}</td>
            <td>{datum.Polymorph}</td>
            <td>{datum.Source.name}</td>
            <td>{datum.Distance.toFixed(6)}</td>
        </tr>
    )
}

export const SimilarCrystalsTable = ({data}) => {
    return (
        <div>
            <p style={{"margin": "5px 25px"}}>Similar Crystals</p>
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
                {data.map(function (i) {
                    return <SimilarCrystalRow datum={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}