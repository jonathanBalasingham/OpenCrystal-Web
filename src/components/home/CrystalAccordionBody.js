import cx from "classnames";
import React, {useState} from "react";
import {Controls, Molecule, MoleculeView} from "../PreviewPanel";
import {Canvas} from "@react-three/fiber";
import {AtomRow, DataItem} from "../create/CreateAppMainCrystal";
import {AtomTable} from "./AtomTable";
import {BondTable} from "./BondTable";
import {UnitCellTable} from "./UnitCellTable";
import {SymmetryTable} from "./SymmetryTable";
import {AMDTable} from "./AMDTable";
import {getAccessToken} from "../../features/auth/authSlice";
import {useSelector} from "react-redux";
import {PDDTable} from "./PDDTable";


export const CrystalAccordionBody = ({data}) => {
    const [active, setActive] = useState("Crystal")
    const [metricsLoaded, setMetricsLoaded] = useState(false)
    const [AMDs, setAMDs] = useState(null)
    const [PDDs, setPDDs] = useState(null)
    let token  = useSelector(getAccessToken)
    console.log(`Data is ${data}`)
    console.log(data)

    const getMetrics = (e) => {
        setActive(e)
        if (!metricsLoaded) {
            fetch(`/api/invariant/amd/${data.crystal.ID}/20`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer:${token}`,
                },
            })
                .then(data => data.json())
                .then((d) => {
                    setAMDs(d.data)
                    fetch(`/api/invariant/pdd/${data.crystal.ID}/20`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer:${token}`,
                        },
                    })
                        .then(data => data.json())
                        .then((d) => {
                            setPDDs(d.data)
                            setMetricsLoaded(true)
                        })
                })

        }
    }

    return (
        <>
            <div className={"part-1"}>
                <div className={"top-bar"}>
                    <button className={cx("", {"active": active === "Crystal"})} onClick={() => setActive("Crystal")}>About</button>
                    <button className={cx("", {"active": active === "Geometry"})} onClick={() => setActive("Geometry")}>Geometry</button>
                    <button className={cx("", {"active": active === "UnitCell"})} onClick={() => setActive("UnitCell")}>Unit Cell</button>
                    <button className={cx("", {"active": active === "AMD"})} onClick={() => getMetrics("AMD")}>AMD</button>
                    <button className={cx("", {"active": active === "PDD"})} onClick={() => getMetrics("PDD")}>PDD</button>
                </div>
                { active === "Crystal" &&
                    Object.keys(data.crystal).map(function(key, index) {
                        let v = data.crystal[key]
                        if (key === "Source") {
                            return <DataItem label={key.charAt(0).toUpperCase() + key.slice(1) + " name:"} value={v.name}/>
                        }

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
                    active === "UnitCell" &&
                    <div className={"tables"}>
                        <UnitCellTable data={data.unitCell}/>
                        <SymmetryTable data={data.unitCell.SymmetryOperators}/>
                    </div>
                }
                {
                    active === "AMD" && metricsLoaded &&
                    <div className={"tables"}>
                        <AMDTable data={AMDs}/>
                    </div>
                }
                {
                    active === "PDD" && metricsLoaded &&
                    <div className={"tables"}>
                        <PDDTable data={PDDs}/>
                    </div>
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