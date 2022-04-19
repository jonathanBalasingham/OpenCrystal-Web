import cx from "classnames";
import React, {useState} from "react";
import {Controls, Molecule, MoleculeView} from "../PreviewPanel";
import {Canvas} from "@react-three/fiber";
import {AtomRow, DataItem} from "../create/CreateAppMainCrystal";
import {AtomTable} from "./AtomTable";
import {BondTable} from "./BondTable";


export const CrystalAccordionBody = ({data}) => {
    const [active, setActive] = useState("Crystal")
    console.log(`Data is ${data}`)
    console.log(data)

    return (
        <>
            <div className={"part-1"}>
                <div className={"top-bar"}>
                    <button className={cx("", {"active": active === "Crystal"})} onClick={() => setActive("Crystal")}>About</button>
                    <button className={cx("", {"active": active === "Geometry"})} onClick={() => setActive("Geometry")}>Geometry</button>
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
                {
                    active === "Geometry" &&
                    <div className={"tables"}>
                        <AtomTable data={data.atoms}/>
                        <BondTable data={data.bonds}/>
                    </div>
                }
                {
                    active === "Atoms" &&
                    <AtomTable data={data.atoms}/>
                }
                {
                    active === "Bonds" &&
                    <BondTable data={data.bonds}/>
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