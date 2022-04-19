import React from "react";
import {check} from "../create/CreateAppMainCrystal";

const UnitCellRow = ({data}) => {
    console.log("Bond Data is")
    console.log(data)
    return (
        <tr>
            <td>{check(data.A)}</td>
            <td>{check(data.B)}</td>
            <td>{check(data.C)}</td>
            <td>{check(data.Alpha)}</td>
            <td>{check(data.Beta)}</td>
            <td>{check(data.Gamma)}</td>
            <td>{check(data.CellVolume)}</td>
        </tr>
    )
}

export const UnitCellTable = ({data}) => {
    return (
        <div className={"unitcell-info"}>
            <p>Unit Cell Information</p>
            <table className={"unitcell-table"}>
                <thead>
                <tr>
                    <th colSpan="1">A</th>
                    <th colSpan="1">B</th>
                    <th colSpan="1">C</th>
                    <th colSpan="1">Alpha</th>
                    <th colSpan="1">Beta</th>
                    <th colSpan="1">Gamma</th>
                    <th colSpan="1">Cell Volume</th>
                </tr>
                </thead>
                <tbody>
                <UnitCellRow data={data}/>
                </tbody>
            </table>
        </div>
    )
}