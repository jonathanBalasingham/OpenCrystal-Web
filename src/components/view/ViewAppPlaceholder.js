import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";
import * as React from "react";
import {Canvas,} from "@react-three/fiber";
import {Controls, } from "../PreviewPanel";
import * as THREE from "three";
import {MeshBasicMaterial} from "three";


export const Plane = () => {
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper( 400, 40, 0x0000ff, 0x808080 );
    const m = new THREE.Mesh(gridHelper, new MeshBasicMaterial())
    return (
        <primitive object={gridHelper} position={[-5, -5, -5]} />
    );
}


export function ViewAppPlaceHolder(props) {
    return (
        <div id="view-app-placeholder">
            <Canvas className="view-app-canvas" style={{"height": "100%", "width": "100%"}}
                    camera={{ position: [10, 10, 10], fov: 62 }}>
                <ambientLight />
                <pointLight position={[1, 1, 1]} />
                <Plane/>
                <Controls/>
            </Canvas>
        </div>
    )
}