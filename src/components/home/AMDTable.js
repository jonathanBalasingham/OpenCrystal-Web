import React from "react";
import {check} from "../create/CreateAppMainCrystal";

const AMDRow = ({k, amd}) => {

    return (
        <tr>
            <td>{k}</td>
            <td>{amd.toFixed(6)}</td>
        </tr>
    )
}

export const AMDTable = ({data}) => {
    return (
        <div className={"amd-info"}>
            <p>Average-Minimum-Distance</p>
            <table className={"amd-table"}>
                <thead>
                <tr>
                    <th colSpan="1">Neighbor</th>
                    <th colSpan="1">AMD</th>
                </tr>
                </thead>
                <tbody>
                {data.map(function (i, ind) {
                    return <AMDRow k={ind+1} amd={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}