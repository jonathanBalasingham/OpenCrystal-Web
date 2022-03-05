import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAccessToken} from "../features/auth/authSlice";
import CloseIcon from '@mui/icons-material/Close';
import ListIcon from '@mui/icons-material/List';
import SettingsIcon from '@mui/icons-material/Settings';
import {getViewOpened, getContent, changeContent, getObject, closeView} from "../features/view/viewSlice";
import { Canvas, useFrame, Color, useThree} from '@react-three/fiber'
import { OrbitControls, TransformControls, ContactShadows, useGLTF, useCursor } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import * as THREE from "three";



const ELEMENT_COLOR = {
    "H": "red",
    "O": "white",
    "C": "black",
}

const H_SIZE = 0.2

const ELEMENT_SIZE = {
    "H": H_SIZE,
    "O": H_SIZE * 2,
    "C": H_SIZE * 2,
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

const modes = ['translate', 'rotate', 'scale']
const state = proxy({ current: null, mode: 0 })

function ViewPanelSettings({}){
    let dispatch = useDispatch()

    return (
        <div id="view-panel-settings">

        </div>
    )
}

function Atom(props) {
    // This reference gives us direct access to the THREE.Mesh object
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((state, delta) => {
        ref.current.rotation.y += 0.005; ref.current.rotation.x += 0.01
    })

    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry args={[getSize(props['symbol'])]} />
            <meshBasicMaterial wireframe={false} color={ELEMENT_COLOR[props['symbol']]} />
        </mesh>
    )
}


function Line({ start, end }) {
    const ref = useRef()
    useLayoutEffect(() => {
        ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
    }, [start, end])
    return (
        <line ref={ref}>
            <bufferGeometry />
            <lineBasicMaterial color="grey" />
        </line>
    )
}


function Bond(props) {
    const ref = useRef()
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    const object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( 0xffffff ) );

    const position1 = props["position1"]
    const position2 = props["position2"]

    const start = new THREE.Vector3(position1.x, position1.y, position1.z);
    const end = new THREE.Vector3(position2.x, position2.y, position2.z);
    start.multiplyScalar( 75 );
    end.multiplyScalar( 75 );
    object.position.copy( start );
    object.position.lerp( end, 0.5 );
    object.scale.set( 5, 5, start.distanceTo( end ) );
    object.lookAt( end );

    return (
        <mesh
            position={[position1.x, position1.y, position1.z]}
            ref={ref}
            scale={clicked ? 1 : 1}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <boxGeometry args={[1,1,1]}/>
            <meshBasicMaterial wireframe={false} color={"0xffffff"} />
        </mesh>
    )
}

function Controls() {
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


function MoleculeView() {
    let currentObject = useSelector(getObject)
    const [dataset, setDataset] = useState(null);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch(`/api/molecule/full/${currentObject}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(data => data.json())
            .then((d) => {
                setDataset(d)
                setLoading(false)
            })
    }, [currentObject])

    let atoms = <div className="no-atom-geometry-content">
        <p>No Geometry found.</p>
    </div>

    if (dataset != null && !loading && dataset.motif) {

        let atomSet = dataset["motif"].map((i) => {
            return (
                <Atom position={[i["x"], i["y"], i["z"]]} symbol={i["symbol"]} />
            )
        })

        let bondSet = dataset["bonds"].map((i) => {
            return (
                <Line start={[i["position1"][0], i["position1"][1], i["position1"][2]]}
                      end={[i["position2"][0], i["position2"][1], i["position2"][2]]}/>
            )
        })

        atoms =
            <Canvas id="view-panel-canvas" style={{"height": "400px", "width": "95%"}}
                    camera={{ position: [10, 10, 10], fov: 62 }}>
                <ambientLight />
                <pointLight position={[1, 1, 1]} />
                <group>
                    { atomSet }
                    { bondSet }
                </group>
                <Controls/>
            </Canvas>

    }
    return (
        <>
            <p className="view-title">{currentObject}</p>
            { atoms }
        </>
    )
}


function ViewPanel({}) {
    let dispatch = useDispatch()

    let token = useSelector(getAccessToken)
    let modalOpened = useSelector(getViewOpened)
    let currentContent = useSelector(getContent)

    let vis  = 'none'
    if (modalOpened)
        vis = 'block'

    let content = <div/>
    if (modalOpened){
        if (currentContent === "settings")
            content = <ViewPanelSettings/>;
        else if (currentContent === "molecule")
            content = <MoleculeView/>
    }
    return (
        <div id="view-panel" style={{'display': vis}}>
            <div className="close-button-container">
                <button onClick={() => dispatch(closeView(false))}>
                    <CloseIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("settings"))}>
                    <SettingsIcon fontSize={"small"}/>
                </button>
                <button onClick={() => dispatch(changeContent("results"))}>
                    <ListIcon fontSize={"small"}/>
                </button>
            </div>
            {content}
            <a href={`https://www.ccdc.cam.ac.uk/structures/Search?Ccdcid=${currentContent}&DatabaseToSearch=Published`}>See on CCDC</a>
        </div>
    )

}

export default ViewPanel;