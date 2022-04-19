import cx from "classnames";
import React, {useState} from "react";
import {Controls, Molecule, MoleculeView} from "../PreviewPanel";
import {Canvas} from "@react-three/fiber";
import {DataItem} from "../create/CreateAppMainCrystal";


export const CrystalAccordionBody = ({data}) => {
    const [active, setActive] = useState("Crystal")
    console.log(`Data is ${data}`)
    console.log(data)

    return (
        <>
            <div className={"part-1"}>
                <div className={"top-bar"}>
                    <button className={cx("", {"active": active === "Crystal"})} onClick={() => setActive("Crystal")}>About</button>
                    <button className={cx("", {"active": active === "Atoms"})} onClick={() => setActive("Atoms")}>Atoms</button>
                    <button className={cx("", {"active": active === "Bonds"})} onClick={() => setActive("Bonds")}>Bonds</button>
                    <button className={cx("", {"active": active === "UnitCell"})} onClick={() => setActive("UnitCell")}>UnitCell</button>
                </div>
                { active === "Crystal" &&
                    Object.keys(data.crystal).map(function(key, index) {
                        let v = data.crystal[key]
                        if (typeof v === "string" || v instanceof String){
                            return <DataItem label={key.charAt(0).toUpperCase() + key.slice(1) + ":"} value={v}/>
                        } else return undefined
                    })
                }
            </div>
            <div className={"part-2"}>
                <Canvas className="preview-panel-canvas"
                        camera={{ position: [7, 7, 7], fov: 62 }}>
                    <ambientLight />
                    <pointLight position={[1, 1, 1]} />
                    <Molecule dataset={data} rotX={0.001} rotY={0.005} center={true}/>
                    <Controls/>
                </Canvas>
            </div>
        </>
    )
}