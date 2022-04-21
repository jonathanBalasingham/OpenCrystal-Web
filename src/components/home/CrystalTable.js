import {check} from "../create/CreateAppMainCrystal";
import React from "react";

const CrystalRow = ({data}) => {
    return (
        <tr>
            <td>{check(data.name)}</td>
            <td>{check(data.family)}</td>
            <td>{check(data.Composition)}</td>
            <td>{check(data.Polymorph)}</td>
            <td>{check(data.Source.name)}</td>
            <td>{check(data.CreatedAt)}</td>
        </tr>
    )
}

export const CrystalTable = ({data}) => {
    console.log("data is ")
    console.log(data)
    return (
        <div className={"crystal-info"}>
            <p style={{"marginBottom": "5px", "fontSize": "14px"}}>Crystals:</p>
            <table className={"crystal-table"}>
                <thead>
                <tr>
                    <th colSpan="1">RefCode</th>
                    <th colSpan="1">Family</th>
                    <th colSpan="1">Composition</th>
                    <th colSpan="1">Polymorph</th>
                    <th colSpan="1">Source</th>
                    <th colSpan="1">Created</th>
                </tr>
                </thead>
                <tbody>
                {data.map(function (i) {
                    return <CrystalRow data={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

