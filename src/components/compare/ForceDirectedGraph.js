import React, {useEffect, useState, useCallback} from "react";
import ForceGraph2D from 'react-force-graph-2d';
import {getBreakout, getComp, getK, getMeasure, setMaxThreshold} from "../../features/compare/compareSlice";
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../../features/auth/authSlice";
import {Loading} from "../../Loading";


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
                let url = `/api/compare/force/${measure}/${k}?threshold=${5}&names=${d["callback"]}&breakout=${breakout}`
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
                        dispatch(setMaxThreshold(dataset.max))
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
                "background": "var(--defaultprimary)"}}/>
        )
    if (!dataReady)
        return null;


    console.log(size)
    return (
        <ForceGraph2D
            width={size.width}
            height={size.height}
            graphData={data}
            nodeRelSize={NODE_R}
            autoPauseRedraw={false}
            linkWidth={link => highlightLinks.has(link) ? 5 : 1}
            linkDirectionalParticles={4}
            linkDirectionalParticleWidth={link => highlightLinks.has(link) ? 4 : 0}
            nodeCanvasObjectMode={node => highlightNodes.has(node) ? 'before' : undefined}
            nodeCanvasObject={paintRing}
            onNodeHover={handleNodeHover}
            onLinkHover={handleLinkHover}

        />
    )
}