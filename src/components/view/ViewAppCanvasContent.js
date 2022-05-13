import {Molecule, UnitCell} from "../PreviewPanel";
import * as React from "react";
import {useSelector} from "react-redux";
import {getViewObject} from "../../features/view/viewSlice";
import {getAccessToken} from "../../features/auth/authSlice";
import {useEffect, useState} from "react";


export const ViewAppCanvasContent = ({dataset}) => {

    if (dataset == null)
        return

    return (
        <>
            {
                dataset.atoms &&
                Object.keys(dataset.atoms).map((x, i) => {
                    return <Molecule dataset={{ ...dataset, "atoms": dataset.atoms[x]}}
                                     rotY={0.00} rotX={0.0} center={false} />
                })

            }
            <UnitCell dataset={dataset}/>
        </>
    )
}