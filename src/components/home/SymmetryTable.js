import React from "react";


const SymmetryRow = ({data}) => {
    return (
        <tr>
            <td>{data}</td>
        </tr>
    )
}


export const SymmetryTable = ({data}) => {
    let splitSym = data.
        replaceAll("(", "").
        replaceAll(")", "").
        replaceAll(" ", "").
        replaceAll("\",", ":").
        replaceAll("\',", ":").
        replaceAll("\"", "").
        replaceAll("'", "").
        split(":")

    return (
        <div className={"symmetry-info"}>
            <p>Symmetry Information</p>
            <table className={"symmetry-table"}>
                <thead>
                <tr>
                    <th colSpan="1">Symmetry</th>
                </tr>
                </thead>
                <tbody>
                {
                    splitSym.map((x) => <SymmetryRow data={x}/>)
                }
                </tbody>
            </table>
        </div>
    )
}