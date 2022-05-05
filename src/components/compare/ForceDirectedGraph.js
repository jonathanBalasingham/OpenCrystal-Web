import React, {useEffect, useState, useCallback} from "react";
import ForceGraph2D from 'react-force-graph-2d';
import {
    getBreakout,
    getComp,
    getK,
    getMeasure,
    getThreshold,
    setMaxThreshold
} from "../../features/compare/compareSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {Loading} from "../../Loading";
import {getHeight, getWidth, setSize} from "../../features/app/appSlice";


const ForceWrapper = ({data}) => {
    let width = useSelector(getWidth)
    let height = useSelector(getHeight)

    console.log(width, height)

    return (
        <ForceGraph2D
            id={"my-force-graph"}
            width={width}
            height={height}
            graphData={data}
            nodeAutoColorBy="group"
            nodeLabel="id"
        />
    )
}


export const ForceDirectedGraph = ({size}) => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)
    const [dataReady, setDataReady] = useState(false)
    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());
    const [hoverNode, setHoverNode] = useState(null);

    let measure = useSelector(getMeasure)
    let token = useSelector(getAccessToken)
    let names = useSelector(getComp)
    let breakout = useSelector(getBreakout)
    let k = useSelector(getK)
    let dispatch = useDispatch()
    let threshold = useSelector(getThreshold)
    dispatch(setSize({"height": size.height, "width": size.width}))


    const NODE_R = 0

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
                let url = `/api/compare/force/${measure}/${k}?threshold=${threshold}&names=${d["callback"]}&breakout=${breakout}`
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
                        setData(dataset);
                        dispatch(setMaxThreshold(dataset.max * 1.05))
                        requestAnimationFrame(() => {
                            setDataReady(true)
                            setLoading(false)
                        });
                    });
            })

    }, [breakout, dispatch, k, measure, names]);


    const updateHighlight = () => {
        setHighlightNodes(highlightNodes);
        setHighlightLinks(highlightLinks);
    };

    const handleNodeHover = node => {
        highlightNodes.clear();
        highlightLinks.clear();
        if (node) {
            highlightNodes.add(node);
            node.neighbors.forEach(neighbor => highlightNodes.add(neighbor));
            node.links.forEach(link => highlightLinks.add(link));
        }

        setHoverNode(node || null);
        updateHighlight();
    };

    const handleLinkHover = link => {
        highlightNodes.clear();
        highlightLinks.clear();

        if (link) {
            highlightLinks.add(link);
            highlightNodes.add(link.source);
            highlightNodes.add(link.target);
        }

        updateHighlight();
    };

    const paintRing = useCallback((node, ctx) => {
        // add ring just for highlighted nodes
        ctx.beginPath();
        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
        ctx.fillStyle = node === hoverNode ? 'red' : 'orange';
        ctx.fill();
    }, [hoverNode]);



    if (loading)
        return (
            <Loading style={{"display": "grid",
                "justify-content": "center",
                "align-content": "center",
                "height": "100vh",
                "background": "transparent"}}/>
        )
    if (!dataReady)
        return null;


    let filteredLinks = data.links.filter((link) => {
        return link.value < threshold
    })

    let filteredData = {
        nodes: data.nodes,
        links: filteredLinks
    }

    console.log(filteredData)
    return (
        <div className={"force-graph-wrapper"}>
            <ForceWrapper data={filteredData}/>
        </div>
    )
}