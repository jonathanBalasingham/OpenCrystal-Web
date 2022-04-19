import React from "react";
import {check} from "../create/CreateAppMainCrystal";

const BondRow = ({data}) => {
    console.log("Bond Data is")
    console.log(data)
    return (
        <tr>
            <td>{check(data.Label1)}</td>
            <td>{check(data.Label2)}</td>
            <td>{check(data.Distance)}</td>
        </tr>
    )
}

export const BondTable = ({data}) => {
    return (
        <div className={"bond-info"}>
            <p>Bond Information</p>
            <table className={"bond-table"}>
                <thead>
                <tr>
                    <th colSpan="1">Label 1</th>
                    <th colSpan="1">Label 2</th>
                    <th colSpan="1">Distance</th>
                </tr>
                </thead>
                <tbody>
                {data.map(function (i) {
                    return <BondRow data={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}