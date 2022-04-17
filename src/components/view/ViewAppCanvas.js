import * as React from "react";
import {useSelector} from "react-redux";
import {getObject} from "../../features/preview/previewSlice";
import {useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Molecule, Controls, UnitCell} from "../PreviewPanel";
import {getComp} from "../../features/compare/compareSlice";
import {Plane, ViewAppPlaceHolder} from "./ViewAppPlaceholder";
import {Loading} from "../../Loading";
import "./view.scss"
import {getViewObject} from "../../features/view/viewSlice";
import { ViewAppElementSettings} from "./ViewAppElementSettings";
import {getAccessToken} from "../../features/auth/authSlice";

export const ViewAppCanvas = () => {
    let currentObject = useSelector(getViewObject)
    let token = useSelector(getAccessToken)

    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/crystal/id/${currentObject}`, {
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then((d) => {
                let id = d["id"]
                fetch(`/api/crystal/molecule/${id}`, {
                    headers: {
                        'Authorization': `Bearer:${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(data => data.json())
                    .then((d) => {
                        setDataset(d)
                        setLoading(false)
                    })
            })
    }, [currentObject])

    if (currentObject === undefined) {
        return (
            <ViewAppPlaceHolder/>
        )
    }

    if (loading)
        return (
            <Loading style={{"display": "grid",
                "justify-content": "center",
                "align-content": "center",
                "height": "100vh",
                "background": "var(--defaultprimary)"}}/>
        )

    let content = <div className="no-atom-geometry-content">
        <p>No Geometry found.</p>
    </div>



    if (dataset != null && !loading && dataset.atoms) {

        content =
            <>
                <Canvas className="view-app-canvas"
                        camera={{ position: [10, 10, 10], fov: 62 }}>
                    <ambientLight />
                    <pointLight position={[1, 1, 1]} />
                    <Molecule dataset={dataset} rotY={0.00} rotX={0.0} center={false}/>
                    <UnitCell dataset={dataset}/>
                    <Plane/>
                    <Controls/>
                </Canvas>
                <ViewAppElementSettings/>
            </>

    }
    return (
        <div className={"view-app-main-canvas"}>
            { content }
        </div>
    )
}