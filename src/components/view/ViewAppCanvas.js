import * as React from "react";
import {useSelector} from "react-redux";
import {getObject} from "../../features/preview/previewSlice";
import {useEffect, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {Molecule, Controls} from "../PreviewPanel";
import {getComp} from "../../features/compare/compareSlice";
import {Plane, ViewAppPlaceHolder} from "./ViewAppPlaceholder";
import {Loading} from "../../Loading";
import "./view.scss"
import {getViewObject} from "../../features/view/viewSlice";
import {OpenViewMenu, ViewAppMenu} from "./ViewAppMenu";

export const ViewAppCanvas = () => {
    let currentObject = useSelector(getViewObject)

    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/molecule/full/${currentObject}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then((d) => {
                setDataset(d)
                setLoading(false)
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



    if (dataset != null && !loading && dataset.motif) {

        content =
            <>
                <Canvas className="view-app-canvas"
                        camera={{ position: [10, 10, 10], fov: 62 }}>
                    <ambientLight />
                    <pointLight position={[1, 1, 1]} />
                    <Molecule dataset={dataset} rotY={0.005} rotX={0.0}/>
                    <Plane/>
                    <Controls/>
                </Canvas>
                <ViewAppMenu/>
            </>

    }
    return (
        <div className={"view-app-main-canvas"}>
            { content }
        </div>
    )
}