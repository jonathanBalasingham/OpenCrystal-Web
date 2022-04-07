import "./styles.css";

import React, { useEffect, useState } from "react";
import {SigmaContainer, ZoomControl, FullScreenControl, ForceAtlasControl, useSigma} from "react-sigma-v2";
import getNodeProgramImage from "sigma/rendering/webgl/programs/node.image";
import { omit, mapValues, keyBy, constant } from "lodash";
import {ForceAtlas2} from 'react-sigma';
import GraphSettingsController from "./GraphSettingsController";
import GraphEventsController from "./GraphEventsController";
import GraphDataController from "./GraphDataController";
import DescriptionPanel from "./DescriptionPanel";
import ClustersPanel from "./ClustersPanel";
import SearchField from "./SearchField";
import drawLabel from "../canvas-utils";
import { CompareAppMenu } from "../CompareAppMenu";
import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {
    getBox, getBreakout,
    getCamera,
    getComp,
    getGraphType,
    getK,
    getKx, getKy,
    getMeasure,
    getThreshold, setCamera,
    setMaxThreshold, setRendering
} from "../../../features/compare/compareSlice";
import {Loading} from "../../../Loading";
import PreviewPanel from "../../PreviewPanel";
import {getAccessToken} from "../../../features/auth/authSlice";


function XYAxis() {
    let box = useSelector(getBox)
    let gt = useSelector(getGraphType)
    let amdx = useSelector(getKx)
    let amdy = useSelector(getKy)
    let xlab = "x"
    let ylab = "y"
    if (gt === "amd") {
        xlab = `AMD ${amdx}`
        ylab = `AMD ${amdy}`
    }
    let dispatch = useDispatch()
    let sigma = useSigma()

    useEffect(() => {
        console.log("inside request animation frame")
        let point01 = sigma.viewportToGraph({x: 0, y: 0})
        let dims = sigma.getDimensions()
        let point00 = sigma.viewportToGraph({x: 0, y: dims.height})
        let point11 = sigma.viewportToGraph({x: dims.width, y: dims.height})

        let box = {"x0": point01.x,
            "y1": point01.y,
            "y0": point00.y,
            "x1": point11.x
        }
        dispatch(setCamera(box))
    });
    let axisNeeded = gt === "amd" || gt === "mds"
    if (!axisNeeded)
        return (
            <div></div>
        )

    return (
        <div id="xy-axis-outer">
            <div id="xy-axis-inner">

            </div>
            <div id="tick-upper-left" className="tick">
                <p>{box["y1"].toFixed(2)}</p>
            </div>
            <div id={"y-label"}>
                <p>{ylab}</p>
            </div>
            <div id="tick-lower-left" className="tick">
                <p>{`(${box["x0"].toFixed(2)}, ${box["y0"].toFixed(2)})`}</p>
            </div>
            <div id={"x-label"}>
                <p>{xlab}</p>
            </div>
            <div id="tick-lower-right" className="tick">
                <p>{box["x1"].toFixed(2)}</p>
            </div>
        </div>
    )
}

const Root = () => {
    const dispatch = useDispatch()
    let token = useSelector(getAccessToken)
    let names = useSelector(getComp)
    let graphType = useSelector(getGraphType)
    let k = useSelector(getK)
    let k_x = useSelector(getKx)
    let k_y = useSelector(getKy)
    let measure = useSelector(getMeasure)
    let breakout = useSelector(getBreakout)

    const [showContents, setShowContents] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [loading, setLoading] = useState(false)
    const [dataset, setDataset] = useState(null);
    const [filtersState, setFiltersState] = useState({
        clusters: {},
        tags: {},
    });
    const [hoveredNode, setHoveredNode] = useState(null);
    const [hoveredEdge, setHoveredEdge] = useState(null)

    // Load data on mount:
    useEffect(() => {
        console.log("Hitting Python API")
        setLoading(true)
        fetch('/api/compare/job', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer: ${token}`,
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            },
            body: JSON.stringify({"names": names})
        })
            .then((data) => data.json())
            .then((d) => {
                let url = `/api/compare/${graphType}/${measure}/${k}?threshold=${5}&names=${d["callback"]}&breakout=${breakout}`
                if (graphType === "amd"){
                    url = `/api/compare/${graphType}/${k_x}/${k_y}?names=${d["callback"]}&breakout=${breakout}&edge_k=${k}`
                }
                return url
            })
            .then(url => {
                fetch(url, {
                    headers: {
                        'Authorization': `Bearer: ${token}`,
                    }
                })
                    .then((res) => res.json())
                    .then((dataset) => {
                        setDataset(dataset);
                        dispatch(setMaxThreshold(dataset.max))
                        setFiltersState({
                            clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
                            tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
                        });
                        requestAnimationFrame(() => {
                            setDataReady(true)
                            setLoading(false)
                        });
                    });
            })

    }, [breakout, dispatch, graphType, k, k_x, k_y, measure, names]);


    if (loading)
        return (
            <Loading style={{"display": "grid",
                             "justify-content": "center",
                             "align-content": "center",
                             "height": "100vh",
                             "background": "var(--defaultprimary)"}}/>
        )
    if (!dataReady)
        return null;


    return (
        <div id="app-root" className={showContents ? "show-contents" : ""}>
            <SigmaContainer
                graphOptions={{ type: "undirected" }}
                initialSettings={{
                    nodeProgramClasses: { image: getNodeProgramImage() },
                    labelRenderer: drawLabel,
                    defaultNodeType: "image",
                    defaultEdgeType: "line",
                    labelDensity: 0.07,
                    labelGridCellSize: 60,
                    labelRenderedSizeThreshold: 15,
                    labelFont: "Lato, sans-serif",
                    zIndex: false,
                    minCameraRatio: 0.1,
                    maxCameraRatio: 1,
                    renderEdgeLabels: true,
                }}
                className="react-sigma"
            >
                <GraphSettingsController hoveredNode={hoveredNode} hoveredEdge={hoveredEdge} />
                <GraphEventsController setHoveredNode={setHoveredNode} setHoveredEdge={setHoveredEdge} />
                <GraphDataController dataset={dataset} filters={filtersState} />
                {dataReady && (
                    <>
                        <XYAxis/>
                        <PreviewPanel/>
                        <div className="contents">
                            <div className="ico">
                                <button
                                    type="button"
                                    className="ico hide-contents"
                                    onClick={() => setShowContents(false)}
                                    title="Show caption and description"
                                >
                                    <GrClose />
                                </button>
                            </div>
                            <div className={"panels"}>
                                <SearchField filters={filtersState} />
                                <ClustersPanel
                                    clusters={dataset.clusters}
                                    filters={filtersState}
                                    setClusters={(clusters) =>
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters,
                                        }))
                                    }
                                    toggleCluster={(cluster) => {
                                        setFiltersState((filters) => ({
                                            ...filters,
                                            clusters: filters.clusters[cluster]
                                                ? omit(filters.clusters, cluster)
                                                : { ...filters.clusters, [cluster]: true },
                                        }));
                                    }}
                                />
                            </div>
                        </div>
                    </>
                )}
            </SigmaContainer>
        </div>
    );

};

export default Root;
