import {CirclePacking, ResponsiveCirclePacking} from '@nivo/circle-packing'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getComp, getKs, getLinkage, getThresholds, setMaxThreshold} from "../../features/compare/compareSlice";
import {getAccessToken} from "../../features/auth/authSlice";
import {constant, keyBy, mapValues} from "lodash";
import * as React from "react";
import {CompareAppMenu} from "./CompareAppMenu";
import {Loading} from "../../Loading";


export const MyResponsiveCirclePacking = ({}) => {
    const [zoomedId, setZoomedId] = useState("")
    const [dataReady, setDataReady] = useState(false);
    const [dataset, setDataset] = useState(null);

    let thresholds = useSelector(getThresholds)
    let linkage = useSelector(getLinkage)
    let ks = useSelector(getKs)
    let token = useSelector(getAccessToken)
    let names = useSelector(getComp)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        setLoading(true)
        fetch('/api/compare/job', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
                'Content-Length': '<calculated when request is sent>'
            },
            body: JSON.stringify({"names": names})
        })
            .then((data) => data.json())
            .then((d) => {
                let url = `/api/compare/circle/amd/${'[' + ks.join(',') + ']'}?linkage=${linkage}&thresholds=${'[' + thresholds.join(',') + ']'}&names=${d["callback"]}`
                return url
            })
            .then(url => {
                fetch(url)
                    .then(res => res.json())
                    .then((dataset) => {
                        setDataset(dataset);
                        setLoading(false)
                        requestAnimationFrame(() => setDataReady(true));
                    });
            })
    }, [ks, linkage, names, thresholds]);

    if (loading)
        return (
            <Loading style={{"display": "grid",
                "justify-content": "center",
                "align-content": "center",
                "height": "100vh",
                "background": "var(--defaultprimary)"}}/>
        )

    if (!dataset) return null;

    return (
        <>
            <ResponsiveCirclePacking
                data={dataset}
                margin={{top: 10, right: 0, bottom: 20, left: 20}}
                id="name"
                value="loc"
                colors={{scheme: 'nivo'}}
                childColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'brighter',
                            0.4
                        ]
                    ]
                }}
                padding={4}
                enableLabels={true}
                labelsFilter={function (n) {
                    return 2 === n.node.depth
                }}
                labelsSkipRadius={10}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            2
                        ]
                    ]
                }}
                borderWidth={1}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            0.5
                        ]
                    ]
                }}
                defs={[
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'none',
                        color: 'inherit',
                        rotation: -45,
                        lineWidth: 5,
                        spacing: 8
                    }
                ]}
                fill={[
                    {
                        match: {
                            depth: 1
                        },
                        id: 'lines'
                    }
                ]}
                zoomedId={zoomedId}
                motionConfig="slow"
                onClick={node => {
                    console.log(node)
                    setZoomedId(zoomedId === node.id ? null : node.id)
                    console.log(zoomedId)
                }}
            />
            <CompareAppMenu />
        </>
    )
}