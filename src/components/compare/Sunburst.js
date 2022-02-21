import { ResponsiveSunburst } from '@nivo/sunburst'
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getComp, getKs, getLinkage, getThresholds} from "../../features/compare/compareSlice";
import {getAccessToken} from "../../features/auth/authSlice";


const flatten = data =>
    data.reduce((acc, item) => {
        if (item.children) {
            return [...acc, item, ...flatten(item.children)]
        }

        return [...acc, item]
    }, [])

const findObject = (data, name) => data.find(searchedName => searchedName.name === name)


export const MyResponsiveSunburst = () => {
    const [dataReady, setDataReady] = useState(false);
    const [dataset, setDataset] = useState(null);

    let thresholds = useSelector(getThresholds)
    let linkage = useSelector(getLinkage)
    let ks = useSelector(getKs)
    let token = useSelector(getAccessToken)
    let names = useSelector(getComp)

    useEffect(() => {
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
                let url = `/api/compare/sunburst/amd/${'[' + ks.join(',') + ']'}?linkage=${linkage}&thresholds=${'[' + thresholds.join(',') + ']'}&names=${d["callback"]}`
                return url
            })
            .then(url => {
                fetch(url)
                    .then(res => res.json())
                    .then((dataset) => {
                        setDataset(dataset);
                        requestAnimationFrame(() => setDataReady(true));
                    });
            })
    }, [ks, linkage, names, thresholds]);

    if (!dataset) return null;


    return (
    <ResponsiveSunburst
        data={dataset}
        margin={{top: 10, right: 10, bottom: 10, left: 10}}
        id="name"
        value="loc"
        cornerRadius={2}
        borderColor={{theme: 'background'}}
        colors={{scheme: 'nivo'}}
        childColor={{
            from: 'color',
            modifiers: [
                [
                    'brighter',
                    0.1
                ]
            ]
        }}
        enableArcLabels={true}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.4
                ]
            ]
        }}
        transitionMode="pushIn"
        onClick={clickedData => {
            const foundObject = findObject(flatten(dataset.children), clickedData.id)
            if (foundObject && foundObject.children) {
                setDataset(foundObject)
            }
        }}
    />)
}
