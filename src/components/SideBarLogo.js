import * as React from "react";
import Ball from "../Logo";
import {Canvas} from "@react-three/fiber";


export const SideBarLogo = () => {
    return (
        <div id="side-bar-logo">
            <Canvas style={{'height': '50px', 'width': '50px'}}>
                <ambientLight />
                <pointLight position={[2, 2, 2]} />
                <Ball position={[0, 0, 0]} />
            </Canvas>
            <div style={{"margin-left": "5px"}}>
                <p style={{"font-size": "x-small", "margin-bottom": "-3px", "font-family": "monospace"}}>Open</p>
                <p style={{"font-size": "x-small", "margin-left":"8px", "font-family": "monospace"}}>Crystal</p>
            </div>
        </div>
    )
}