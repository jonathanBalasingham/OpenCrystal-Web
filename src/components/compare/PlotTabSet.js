import * as React from "react";
import { Graph } from "react-d3-graph";
import './Compare.css'
import  'csv-parser'
import {edges} from './sample_data'
import {Tabs, TabList, TabPanel, Tab} from 'react-tabs'

export function PlotSetTab({}) {

// graph payload (with minimalist structure)
    const data = {
        nodes:
            [{"id":"0","label":"HXACAN","class":"orthorhombic polymorph II"},
                {"id":"1","label":"HXACAN01","class":"monoclinic polymorph I"},
                {"id":"2","label":"HXACAN04","class":"monoclinic polymorph I"},
                {"id":"3","label":"HXACAN06","class":"monoclinic polymorph I"},
                {"id":"4","label":"HXACAN07","class":"monoclinic polymorph I"},
                {"id":"5","label":"HXACAN08","class":"orthorhombic polymorph II"},
                {"id":"6","label":"HXACAN09","class":"monoclinic polymorph I"},
                {"id":"7","label":"HXACAN10","class":"monoclinic polymorph I"},
                {"id":"8","label":"HXACAN11","class":"monoclinic polymorph I"},
                {"id":"9","label":"HXACAN12","class":"monoclinic polymorph I"},
                {"id":"10","label":"HXACAN13","class":"monoclinic polymorph I"},
                {"id":"11","label":"HXACAN14","class":"monoclinic polymorph I"},
                {"id":"12","label":"HXACAN15","class":"monoclinic polymorph I"},
                {"id":"13","label":"HXACAN16","class":"monoclinic polymorph I"},
                {"id":"14","label":"HXACAN17","class":"monoclinic polymorph I"},
                {"id":"15","label":"HXACAN18","class":"monoclinic polymorph I"},
                {"id":"16","label":"HXACAN19","class":"monoclinic polymorph I"},
                {"id":"17","label":"HXACAN21","class":"orthorhombic polymorph II"},
                {"id":"18","label":"HXACAN22","class":"orthorhombic polymorph II"},
                {"id":"19","label":"HXACAN23","class":"orthorhombic polymorph II"},
                {"id":"20","label":"HXACAN24","class":"orthorhombic polymorph II"},
                {"id":"21","label":"HXACAN25","class":"orthorhombic polymorph II"},
                {"id":"22","label":"HXACAN26","class":"monoclinic polymorph I"},
                {"id":"23","label":"HXACAN27","class":"monoclinic polymorph I"},
                {"id":"24","label":"HXACAN28","class":"monoclinic polymorph I"},
                {"id":"25","label":"HXACAN29","class":"polymorph III"},
                {"id":"26","label":"HXACAN30","class":"monoclinic polymorph I"},
                {"id":"27","label":"HXACAN31","class":"orthorhombic polymorph II"},
                {"id":"28","label":"HXACAN32","class":"orthorhombic polymorph II"},
                {"id":"29","label":"HXACAN33","class":"orthorhombic polymorph II"},
                {"id":"30","label":"HXACAN34","class":"monoclinic polymorph I"},
                {"id":"31","label":"HXACAN35","class":"monoclinic polymorph I"},
                {"id":"32","label":"HXACAN36","class":"monoclinic polymorph I"},
                {"id":"33","label":"HXACAN37","class":"orthorhombic polymorph II"},
                {"id":"34","label":"HXACAN38","class":"orthorhombic polymorph II"},
                {"id":"35","label":"HXACAN39","class":"form III-m polymorph"},
                {"id":"36","label":"HXACAN40","class":"form III-o polymorph"},
                {"id":"37","label":"HXACAN41","class":"orthorhombic polymorph II"},
                {"id":"38","label":"HXACAN42","class":"orthorhombic polymorph II"},
                {"id":"39","label":"HXACAN43","class":"monoclinic polymorph I"},
                {"id":"40","label":"HXACAN44","class":"orthorhombic polymorph II"},
                {"id":"41","label":"HXACAN45","class":"orthorhombic polymorph II"},
                {"id":"42","label":"HXACAN46","class":"orthorhombic polymorph II"},
                {"id":"43","label":"HXACAN47","class":"None"},
                {"id":"44","label":"HXACAN48","class":"None"},
                {"id":"45","label":"HXACAN49","class":"monoclinic polymorph I"},
                {"id":"46","label":"HXACAN50","class":"None"},
                {"id":"47","label":"HXACAN51","class":"monoclinic polymorph I"},
                {"id":"48","label":"HXACAN52","class":"monoclinic polymorph I"},
                {"id":"49","label":"HXACAN53","class":"monoclinic polymorph I"},
                {"id":"50","label":"HXACAN54","class":"monoclinic polymorph I"},
                {"id":"51","label":"HXACAN57","class":"monoclinic polymorph I"},
                {"id":"52","label":"ACSALA","class":"polymorph I"},
                {"id":"53","label":"ACSALA01","class":"polymorph I"},
                {"id":"54","label":"ACSALA02","class":"polymorph I"},
                {"id":"55","label":"ACSALA03","class":"polymorph I"},
                {"id":"56","label":"ACSALA04","class":"polymorph I"},
                {"id":"57","label":"ACSALA05","class":"polymorph I"},
                {"id":"58","label":"ACSALA06","class":"polymorph I"},
                {"id":"59","label":"ACSALA07","class":"polymorph I"},
                {"id":"60","label":"ACSALA08","class":"polymorph I"},
                {"id":"61","label":"ACSALA09","class":"polymorph I"},
                {"id":"62","label":"ACSALA10","class":"polymorph I"},
                {"id":"63","label":"ACSALA11","class":"polymorph I"},
                {"id":"64","label":"ACSALA12","class":"polymorph I"},
                {"id":"65","label":"ACSALA13","class":"polymorph II"},
                {"id":"66","label":"ACSALA14","class":"polymorph I"},
                {"id":"67","label":"ACSALA15","class":"polymorph II"},
                {"id":"68","label":"ACSALA17","class":"polymorph II"},
                {"id":"69","label":"ACSALA19","class":"II polymorph"},
                {"id":"70","label":"ACSALA20","class":"II polymorph"},
                {"id":"71","label":"ACSALA21","class":"polymorph I"},
                {"id":"72","label":"ACSALA23","class":"None"},
                {"id":"73","label":"ACSALA24","class":"None"},
                {"id":"74","label":"ACSALA25","class":"polymorph I"},
                {"id":"75","label":"ACSALA26","class":"None"},
                {"id":"76","label":"ACSALA27","class":"None"},
                {"id":"77","label":"ACSALA28","class":"polymorph I"},
                {"id":"78","label":"ACSALA29","class":"polymorph I"}],
        links: edges,
    };

// the graph configuration, just override the ones you need
    const myConfig = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 120,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        },
        //staticGraph: true,
    };

    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };


    return (
        <div>

        </div>
    )
}