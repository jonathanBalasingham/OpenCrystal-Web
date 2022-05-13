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
import {ViewAppCanvasContent} from "./ViewAppCanvasContent";

export const ViewAppCanvas = () => {
    let currentObject = useSelector(getViewObject)
    let token = useSelector(getAccessToken)

    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!currentObject)
            return

        setLoading(true)
        fetch(`/api/crystal/id/${currentObject}`, {
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then((d) => {
                let id = d["id"]
                fetch(`/api/crystal/motif/${id}`, {
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

    return (
        <div className={"view-app-main-canvas"}>
            <Canvas className="view-app-canvas"
                    camera={{ position: [10, 10, 10], fov: 62 }}>
                <ambientLight />
                <pointLight position={[1, 1, 1]} />
                {
                    dataset && dataset.atoms && dataset.unitCell &&
                    <ViewAppCanvasContent dataset={dataset}/>
                }
                <Plane/>
                <Controls/>
            </Canvas>
            <ViewAppElementSettings/>
        </div>
    )
}