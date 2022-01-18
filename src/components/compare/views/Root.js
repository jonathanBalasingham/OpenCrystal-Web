import "./styles.css";

import React, { useEffect, useState } from "react";
import { SigmaContainer, ZoomControl, FullScreenControl, ForceAtlasControl } from "react-sigma-v2";
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

import "react-sigma-v2/lib/react-sigma-v2.css";
import { GrClose } from "react-icons/gr";
import { BiRadioCircleMarked, BiBookContent } from "react-icons/bi";
import { BsArrowsFullscreen, BsFullscreenExit, BsZoomIn, BsZoomOut } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {
    getComp,
    getGraphType,
    getK,
    getKx, getKy,
    getMeasure,
    getThreshold,
    setMaxThreshold
} from "../../../features/compare/compareSlice";


const Root = () => {
    const dispatch = useDispatch()
    let names = useSelector(getComp)
    let graphType = useSelector(getGraphType)
    let k = useSelector(getK)
    let k_x = useSelector(getKx)
    let k_y = useSelector(getKy)
    let measure = useSelector(getMeasure)
    let threshold = useSelector(getThreshold)

    const [showContents, setShowContents] = useState(false);
    const [dataReady, setDataReady] = useState(false);
    const [dataset, setDataset] = useState(null);
    const [filtersState, setFiltersState] = useState({
        clusters: {},
        //tags: {},
    });
    const [hoveredNode, setHoveredNode] = useState(null);

    // Load data on mount:
    useEffect(() => {
        let url = `/api/compare/${graphType}/${measure}/${k}?threshold=${threshold}&names=${'["' + names.join('","') + '"]'}`
        if (graphType === "amd"){
            url = `/api/compare/${graphType}/${k_x}/${k_y}?names=${'["' + names.join('","') + '"]'}`
        }
        fetch(url)
            .then((res) => res.json())
            .then((dataset) => {
                setDataset(dataset);
                dispatch(setMaxThreshold(dataset.max))
                setFiltersState({
                    clusters: mapValues(keyBy(dataset.clusters, "key"), constant(true)),
                    //tags: mapValues(keyBy(dataset.tags, "key"), constant(true)),
                });
                requestAnimationFrame(() => setDataReady(true));
            });
    }, [dispatch, graphType, k, k_x, k_y, measure, names, threshold]);

    if (!dataset) return null;
    console.log(dataset)
    if (dataset.nodes.length === 0)
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
                }}
                className="react-sigma"
            >
                <GraphSettingsController hoveredNode={hoveredNode} />
                <GraphEventsController setHoveredNode={setHoveredNode} />
                <GraphDataController dataset={dataset} filters={filtersState} />
            </SigmaContainer>
        </div>
    );
};

export default Root;
