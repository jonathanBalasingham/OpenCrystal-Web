import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../features/auth/authSlice";
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';

import {
    getPreviewOpened,
    getContent,
    changeContent,
    getObject,
    closePreview,
    getX,
    getY,
} from "../features/preview/previewSlice";
import { removeFromPreviewList, addToPreviewList, openPreviewList } from "../features/compare/compareSlice";
import { Canvas, useFrame, Color, useThree} from '@react-three/fiber'
import { OrbitControls, TransformControls, ContactShadows, useGLTF, useCursor } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import * as THREE from "three";
import {LoadingCustom} from "../Loading";
import {addVecs, cellParamsToMatrix, toCartesian} from "./base/geometry";




const ELEMENT_COLOR = {
    "H": "red",
    "O": "white",
    "C": "black",
}

const H_SIZE = 0.2

const ELEMENT_SIZE = {
    "H": H_SIZE,
    "O": H_SIZE,
    "C": H_SIZE,
}

const getSize = (sym) => {
    let s = ELEMENT_SIZE[sym]
    if (s === undefined){
        return H_SIZE
    } else return s
}

const CPK = {
    h: [ 255, 255, 255 ],
    he: [ 217, 255, 255 ],
    li: [ 204, 128, 255 ],
    be: [ 194, 255, 0 ],
    b: [ 255, 181, 181 ],
    c: [ 144, 144, 144 ],
    n: [ 48, 80, 248 ],
    o: [ 255, 13, 13 ],
    f: [ 144, 224, 80 ],
    ne: [ 179, 227, 245 ],
    na: [ 171, 92, 242 ],
    mg: [ 138, 255, 0 ],
    al: [ 191, 166, 166 ],
    si: [ 240, 200, 160 ],
    p: [ 255, 128, 0 ],
    s: [ 255, 255, 48 ],
    cl: [ 31, 240, 31 ],
    ar: [ 128, 209, 227 ],
    k: [ 143, 64, 212 ],
    ca: [ 61, 255, 0 ],
    sc: [ 230, 230, 230 ],
    ti: [ 191, 194, 199 ],
    v: [ 166, 166, 171 ],
    cr: [ 138, 153, 199 ],
    mn: [ 156, 122, 199 ],
    fe: [ 224, 102, 51 ],
    co: [ 240, 144, 160 ],
    ni: [ 80, 208, 80 ],
    cu: [ 200, 128, 51 ],
    zn: [ 125, 128, 176 ],
    ga: [ 194, 143, 143 ],
    ge: [ 102, 143, 143 ],
    as: [ 189, 128, 227 ],
    se: [ 255, 161, 0 ],
    br: [ 166, 41, 41 ],
    kr: [ 92, 184, 209 ],
    rb: [ 112, 46, 176 ],
    sr: [ 0, 255, 0 ],
    y: [ 148, 255, 255 ],
    zr: [ 148, 224, 224 ],
    nb: [ 115, 194, 201 ],
    mo: [ 84, 181, 181 ],
    tc: [ 59, 158, 158 ],
    ru: [ 36, 143, 143 ],
    rh: [ 10, 125, 140 ],
    pd: [ 0, 105, 133 ],
    ag: [ 192, 192, 192 ],
    cd: [ 255, 217, 143 ],
    in: [ 166, 117, 115 ],
    sn: [ 102, 128, 128 ],
    sb: [ 158, 99, 181 ],
    te: [ 212, 122, 0 ],
    i: [ 148, 0, 148 ],
    xe: [ 66, 158, 176 ],
    cs: [ 87, 23, 143 ],
    ba: [ 0, 201, 0 ],
    la: [ 112, 212, 255 ],
    ce: [ 255, 255, 199 ],
    pr: [ 217, 255, 199 ],
    nd: [ 199, 255, 199 ],
    pm: [ 163, 255, 199 ],
    sm: [ 143, 255, 199 ],
    eu: [ 97, 255, 199 ],
    gd: [ 69, 255, 199 ],
    tb: [ 48, 255, 199 ],
    dy: [ 31, 255, 199 ],
    ho: [ 0, 255, 156 ],
    er: [ 0, 230, 117 ],
    tm: [ 0, 212, 82 ],
    yb: [ 0, 191, 56 ],
    lu: [ 0, 171, 36 ],
    hf: [ 77, 194, 255 ],
    ta: [ 77, 166, 255 ],
    w: [ 33, 148, 214 ],
    re: [ 38, 125, 171 ],
    os: [ 38, 102, 150 ],
    ir: [ 23, 84, 135 ],
    pt: [ 208, 208, 224 ],
    au: [ 255, 209, 35 ],
    hg: [ 184, 184, 208 ],
    tl: [ 166, 84, 77 ],
    pb: [ 87, 89, 97 ],
    bi: [ 158, 79, 181 ],
    po: [ 171, 92, 0 ],
    at: [ 117, 79, 69 ],
    rn: [ 66, 130, 150 ],
    fr: [ 66, 0, 102 ],
    ra: [ 0, 125, 0 ],
    ac: [ 112, 171, 250 ],
    th: [ 0, 186, 255 ],
    pa: [ 0, 161, 255 ],
    u: [ 0, 143, 255 ],
    np: [ 0, 128, 255 ],
    pu: [ 0, 107, 255 ],
    am: [ 84, 92, 242 ],
    cm: [ 120, 92, 227 ],
    bk: [ 138, 79, 227 ],
    cf: [ 161, 54, 212 ],
    es: [ 179, 31, 212 ],
    fm: [ 179, 31, 186 ],
    md: [ 179, 13, 166 ],
    no: [ 189, 13, 135 ],
    lr: [ 199, 0, 102 ],
    rf: [ 204, 0, 89 ],
    db: [ 209, 0, 79 ],
    sg: [ 217, 0, 69 ],
    bh: [ 224, 0, 56 ],
    hs: [ 230, 0, 46 ],
    mt: [ 235, 0, 38 ],
    ds: [ 235, 0, 38 ],
    rg: [ 235, 0, 38 ],
    cn: [ 235, 0, 38 ],
    uut: [ 235, 0, 38 ],
    uuq: [ 235, 0, 38 ],
    uup: [ 235, 0, 38 ],
    uuh: [ 235, 0, 38 ],
    uus: [ 235, 0, 38 ],
    uuo: [ 235, 0, 38 ]
};

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 0 })

function ViewPanelSettings({}){
    let dispatch = useDispatch()

    return (
        <div id="view-panel-settings">

        </div>
    )
}


const getElementColor = (e) => {
    let rgb = CPK[e]
    return rgbToHex(rgb[0], rgb[1], rgb[2])
}

function Atom(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    //useFrame((state, delta) => {
    //    ref.current.rotation.y += 0.005; ref.current.rotation.x += 0.01
    // })

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry args={[getSize(props['symbol'])]} />
            <meshBasicMaterial wireframe={false} color={getElementColor(props['symbol'].toLowerCase())} />
        </mesh>
    )
}


function Line({ start, end, color }) {
    const ref = useRef()
    useLayoutEffect(() => {
        ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
    }, [start, end])
    return (
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color={color} />
        </line>
    )
}


export function Controls() {
    // Get notified on changes to state
    const snap = useSnapshot(state)
    const scene = useThree((state) => state.scene)
    return (
        <>
            {/* As of drei@7.13 transform-controls can refer to the target by children, or the object prop */}
            {snap.current && <TransformControls object={scene.getObjectByName(snap.current)} mode={modes[snap.mode]} />}
            {/* makeDefault makes the controls known to r3f, now transform-controls can auto-disable them when active */}
            <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} />
        </>
    )
}

export const UnitCell = ({dataset}) => {
    let uc = cellParamsToMatrix(dataset.unitCell["A"], dataset.unitCell["B"], dataset.unitCell["C"],
        dataset.unitCell["Alpha"], dataset.unitCell["Beta"], dataset.unitCell["Gamma"])

    let s = [0,0,0]

    return (
        <group>
            <Line start={s} end={uc[0]} color={"red"}/>
            <Line start={s} end={uc[1]} color={"blue"}/>
            <Line start={s} end={uc[2]} color={"green"}/>

            <Line start={uc[1]} end={addVecs(uc[0], uc[1])} color={"grey"}/>
            <Line start={uc[2]} end={addVecs(uc[2], uc[1])} color={"grey"}/>
            <Line start={uc[2]} end={addVecs(uc[2], uc[1])} color={"grey"}/>
            <Line start={uc[2]} end={addVecs(uc[2], uc[0])} color={"grey"}/>

            <Line start={uc[0]} end={addVecs(uc[0], uc[1])} color={"grey"}/>
            <Line start={uc[1]} end={addVecs(uc[1], uc[2])} color={"grey"}/>
            <Line start={uc[0]} end={addVecs(uc[0], uc[2])} color={"grey"}/>
            <Line start={addVecs(uc[0], uc[2])} end={addVecs(addVecs(uc[0], uc[2]), uc[1])} color={"grey"}/>
            <Line start={addVecs(uc[1], uc[2])} end={addVecs(addVecs(uc[1], uc[2]), uc[0])} color={"grey"}/>
            <Line start={addVecs(uc[0], uc[1])} end={addVecs(addVecs(uc[0], uc[2]), uc[1])} color={"grey"}/>

        </group>
    )
}


export const Molecule = ({dataset, rotX, rotY, center}) => {
    const ref = useRef()
    let bondLocations = {}
    let uc = null
    if (dataset.unitCell) {
        uc = cellParamsToMatrix(dataset.unitCell["A"], dataset.unitCell["B"], dataset.unitCell["C"],
            dataset.unitCell["Alpha"], dataset.unitCell["Beta"], dataset.unitCell["Gamma"])
    }
    let c = [0,0,0]
    if (center) {
        c = toCartesian(uc, dataset.center)
    }

    useFrame((state, delta) => {
        ref.current.rotation.y += rotY;
        ref.current.rotation.x += rotX;
    })

    let atomSet = dataset["atoms"].map((i) => {
        let mp = toCartesian(uc, [i["X"], i["Y"], i["Z"]])
        mp[0] -= c[0]
        mp[1] -= c[1]
        mp[2] -= c[2]
        bondLocations[i["Label"]] = mp

        return (
            <Atom position={mp} symbol={i["Symbol"]} />
        )
    })

    let bondSet = dataset["bonds"].map((i) => {
        if (i.Label1 === null || i.Label2 === null) {
            return
        }
        let s = bondLocations[i["Label1"]]
        let e = bondLocations[i["Label2"]]

        return (
            <Line start={s}
                  end={e}/>
        )
    })

    return (
        <group ref={ref}>
            { atomSet }
            { bondSet }
        </group>
    )
}


export function MoleculeView({name}) {
    let token = useSelector(getAccessToken)
    console.log("inside molecule view")
    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/crystal/id/${name}`, {
            headers: {
                'Authorization': `Bearer:${token}`,
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then((d) => {
                let id = d["id"]
                fetch(`/api/crystal/molecule/${id}`, {
                    headers: {
                        'Authorization': `Bearer:${token}`,
                        'Content-Type': 'application/json'
                    }
                }).then(data => data.json())
                    .then((d) => {
                        setDataset(d)
                        setLoading(false)
                    })
            })
    }, [name])

    if (loading) {
        return <LoadingCustom width={"100%"} height={"100%"} innerHeight={"95%"} innerWidth={"50px"}/>
    }

    let atoms;
    if (!loading) {
        atoms = <div className="no-atom-geometry-content">
            <p>No Geometry found.</p>
        </div>
    }
    console.log("Dataset: ")
    console.log(dataset)
    if (dataset != null && !loading && dataset.atoms) {

        atoms =
            <Canvas className="preview-panel-canvas"
                    camera={{ position: [7, 7, 7], fov: 62 }}>
                <ambientLight />
                <pointLight position={[1, 1, 1]} />
                <Molecule dataset={dataset} rotX={0.001} rotY={0.005} center={true}/>
                <Controls/>
            </Canvas>

    }
    return (
        <>
            { atoms }
        </>
    )
}

export const PreviewListItem = ({name}) => {
    const dispatch = useDispatch()

    return (
        <div className="preview-list-item">
            <div className="top-container">
                <div className={"left-content"}>
                    <p className="preview-title">{name}</p>
                </div>
                <div className={"right-content"}>
                    <a href={`https://www.ccdc.cam.ac.uk/structures/Search?Ccdcid=${name}&DatabaseToSearch=Published`}
                       target={"_blank"}
                       style={{"color": "var(--default-text)"}}>CCDC</a>
                    <button onClick={() => dispatch(removeFromPreviewList(name))}>
                        <CloseIcon fontSize={"small"}/>
                    </button>
                </div>
            </div>
            <MoleculeView name={name}/>
        </div>
    )
}


function PreviewPanel({}) {
    let dispatch = useDispatch()

    let modalOpened = useSelector(getPreviewOpened)
    let currentContent = useSelector(getContent)
    let x = useSelector(getX)
    let y = useSelector(getY)
    let currentObject = useSelector(getObject)


    let vis  = 'none'
    if (modalOpened)
        vis = 'block'

    let content = <div/>
    if (modalOpened){
        if (currentContent === "settings")
            content = <ViewPanelSettings/>;
        else if (currentContent === "molecule")
            content = <MoleculeView name={currentObject}/>
    }
    return (
        <div className="preview-panel" style={{'display': vis, "left": `${x}px`, "top": `${y}px`}}>
            <div className="top-container">
                <div className={"left-content"}>
                    <p className="preview-title">{currentObject}</p>
                </div>
                <div className={"right-content"}>
                    <a href={`https://www.ccdc.cam.ac.uk/structures/Search?Ccdcid=${currentObject}&DatabaseToSearch=Published`}
                       target={"_blank"}
                       style={{"color": "var(--default-text)"}}>CCDC</a>
                    <button onClick={() => {
                        dispatch(addToPreviewList(currentObject))
                        dispatch(openPreviewList(""))
                        dispatch(closePreview(false))
                    }}>
                        <AddIcon fontSize={"small"}/>
                    </button>
                    <button onClick={() => dispatch(closePreview(false))}>
                        <CloseIcon fontSize={"small"}/>
                    </button>
                </div>
            </div>
            {content}
        </div>
    )

}

export default PreviewPanel;