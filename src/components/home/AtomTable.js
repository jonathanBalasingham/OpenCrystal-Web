import React from "react";


const check_and_round = (num) => {
    if (isNaN(num))
        return num
    else
        return num.toFixed(4)
}

const AtomRow = (data) => {
    console.log("Atom row is")
    console.log(data.data)
    return (
        <tr>
            <td>{data.data["Label"]}</td>
            <td>{data.data["Symbol"]}</td>
            <td>{check_and_round(data.data["X"])}</td>
            <td>{check_and_round(data.data["Y"])}</td>
            <td>{check_and_round(data.data["Z"])}</td>
        </tr>
    )
}

export const AtomTable = ({data}) => {
    console.log(data)
    return (
        <div className={"atom-info"}>
            <p>Atom Information</p>
            <table className={"atom-table"}>
                <thead>
                <tr>
                    <th colSpan="1">Label</th>
                    <th colSpan="1">Species</th>
                    <th colSpan="1">X</th>
                    <th colSpan="1">Y</th>
                    <th colSpan="1">Z</th>
                </tr>
                </thead>
                <tbody>
                {data.map(function (i) {
                    return <AtomRow data={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}