import React from "react";


const PDDRow = ({pdd}) => {

    return (
        <tr>
            {
                pdd.map(function (x) {
                    return <td>{x.toFixed(6)}</td>
                })
            }
        </tr>
    )
}

export const PDDTable = ({data}) => {
    return (
        <div className={"pdd-info"}>
            <p>Point-wise Distance Distribution</p>
            <table className={"pdd-table"}>
                <thead>
                <tr>
                    {
                        data[0].map(function (i, ind) {
                            if (ind === 0)
                                return <th colSpan="1">Weight</th>
                            return <th colSpan="1">{`Neighbor ${ind}`}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {data.map(function (i, ind) {
                    return <PDDRow pdd={i}/>
                })}
                </tbody>
            </table>
        </div>
    )
}