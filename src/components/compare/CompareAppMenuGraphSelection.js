import * as React from "react";
import { CompareAppMenuGraphSelectionButton } from "./CompareAppMenuGraphSelectionButton"

export const CompareAppMenuGraphSelection = () =>{
    // Removed:
    //             <CompareAppMenuGraphSelectionButton label={"circle"} text={"Circle"} />
    //             <CompareAppMenuGraphSelectionButton label={"sunburst"} text={"Sunburst"} />

    return (
        <div className="plot-app-menu-graph-selection">
            <CompareAppMenuGraphSelectionButton label={"amd"} text={"AMD"} />
            <CompareAppMenuGraphSelectionButton label={"mst"} text={"MST"} />
            <CompareAppMenuGraphSelectionButton label={"full"} text={"Threshold"} />
            <CompareAppMenuGraphSelectionButton label={"map"} text={"MDS"} />
            <CompareAppMenuGraphSelectionButton label={"force"} text={"FDL"} />
            <CompareAppMenuGraphSelectionButton label={"pmfg"} text={"PMFG"} />
            <CompareAppMenuGraphSelectionButton label={"kkg"} text={"Kamada-Kawai"} />
            <CompareAppMenuGraphSelectionButton label={"pca"} text={"PCA"} />
        </div>
    )
}

