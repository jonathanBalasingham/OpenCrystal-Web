import { createSlice, createSelector, current } from '@reduxjs/toolkit'

const initialState = {
    "data": [],
    "rendering": false,
    "graphtype": "amd",
    "k": 100,
    "measure": "pdd",
    "threshold": 5,
    "filtered": false,
    "k_x": 1,
    "k_y": 2,
    "ks": [1,10,100,100],
    "thresholds":[0.01, 0.02, 0.05, 0.1],
    "linkage": "single",
    "camera": {},
    "box": {"x0": 0, "x1": 0, "y0": 0, "y1":0},
    "breakout": "family",
    "menuOpen": false,
    "previewListOpen": false,
    "previewList": [],
    "crystalListOpen": false,
    "clusterPanelOpen": true,
    "searchFieldOpen": true,
    "dists": [],
    "edge_dists": [],
    "added": [],
    "removed": [],
    "modification": {field: null}
}

const compareSlice = createSlice({
    name: 'comp',
    initialState,
    reducers: {
        addComp(state, action) {
            let added = []
            if (!state["data"].includes(action.payload)) {
                added = [action.payload]
            }
            console.log("added is")
            console.log(added)

            return {
                ...state,
                "added": added,
                "removed": [],
                "modification": {field: null}
            };
        },
        addComps(state, action) {
            let added = []
            for (let i = 0; i < action.payload.length; i++) {
                if (!state["data"].includes(action.payload[i])) {
                    added = added.concat(action.payload)
                }
            }
            return {
                ...state,
                "added": added,
                "removed": [],
                "modification": {field: null}
            };
        },
        removeComp(state, action) {
            return {
                ...state,
                "removed": state["removed"].concat([action.payload]),
                "added": [],
                "modification": {field: null}
            };
        },
        clearComp(state, action){
            return {
                ...state,
                "data": [],
                "added": [],
                "removed": [],
                "modification": {field: null}
            };
        },
        setGraphType(state, action) {
            const gt  = action.payload
            return {
              ...state,
              "graphtype": gt,
                "modification": {"field": "graph_type"},
                "added": [],
                "removed": []
            };
        },
        setMeasure(state, action) {
            return {
                ...state,
                "measure": action.payload,
                "modification": {"field": "measure"},
                "added": [],
                "removed": []
            }
        },
        setK(state, action) {
            return {
                ...state,
                "k": Number(action.payload),
                "modification": {"field": "k"},
                "added": [],
                "removed": []
            }
        },
        setKx(state, action) {
            return {
                ...state,
                "k_x": Number(action.payload),
                "modification": {"field": "k_x"},
                "added": [],
                "removed": []
            }
        },
        setKy(state, action) {
            return {
                ...state,
                "k_y": Number(action.payload),
                "modification": {"field": "k_y"},
                "added": [],
                "removed": []
            }
        },
        setThreshold(state, action) {
            return {
                ...state,
                "filtered": false,
                "threshold": Number(action.payload)
            }
        },
        setFiltered(state, action) {
            return {
                ...state,
                "filtered": true,
            }
        },
        setMaxThreshold(state, action) {
            return {
                ...state,
                "max_threshold": Number(action.payload)
            }
        },
        setThresholds(state, action) {
            return {
                ...state,
                "thresholds": action.payload
            }
        },
        setKs(state, action) {
            return {
                ...state,
                "ks": action.payload
            }
        },
        setLinkage(state, action) {
            return {
                ...state,
                "linkage": action.payload,
                "modification": {"field": "linkage"},
                "added": [],
                "removed": []
            }
        },
        setRendering(state, action) {
            return {
                ...state,
                "rendering": action.payload
            }
        },
        setCamera(state, action) {
            return {
                ...state,
                "camera": action.payload,
            }
        },
        setBox(state, action) {
            return {
                ...state,
                "box": action.payload,
            }
        },
        setMenuOpen(state, action) {
            return {
                ...state,
                "menuOpen": action.payload,
            }
        },
        toggleMenu(state, action){
            state["menuOpen"] = !state["menuOpen"]
            return state
        },
        togglePreviewList(state, action){
            state["previewListOpen"] = !state["previewListOpen"]
            return state
        },
        openPreviewList(state, action){
            state["previewListOpen"] = true
            return state
        },
        toggleCrystalList(state, action){
            state["crystalListOpen"] = !state["crystalListOpen"]
            return state
        },
        addToPreviewList(state, action) {
            let newState = state["previewList"]
            if (!state["previewList"].includes(action.payload))
                newState = state["previewList"].concat([action.payload])

            return {
                ...state,
                "previewList": newState
            };
        },
        removeFromPreviewList(state, action) {
            return {
                ...state,
                "previewList": state["previewList"].filter(x => x !== action.payload)
            };
        },
        toggleSearchField(state, action){
            state["searchFieldOpen"] = !state["searchFieldOpen"]
            return state
        },
        toggleClusterPanel(state, action){
            state["clusterPanelOpen"] = !state["clusterPanelOpen"]
            return state
        },
        setBreakout(state, action) {
            return {
                ...state,
                "added": [],
                "removed": [],
                "field": "breakout",
                "breakout": action.payload
            }
        },
        setDists(state, action) {
            state["dists"] = action.payload
            return state
        },
        setEdgeDists(state, action) {
            state["edge_dists"] = action.payload
            return state
        },
        setAdded(state, action) {
            state["added"] = [action.payload]
            return state
        },
        setRemoved(state, action) {
            state["removed"] = [action.payload]
            state["added"] = []
            return state
        },
        setModification(state, action) {
            state["modification"] = action.payload
            return state
        },
        setResolved(state, action) {
            state["data"] = state["data"].filter(x => !state["removed"].includes(x))
            state["data"] = state["data"].concat(state["added"])
        }
    }
})

export const { addComp, addComps, removeComp, setGraphType, clearComp, setK, setKx, setKy,
            setMeasure, setThreshold, setMaxThreshold, setThresholds, setKs, setLinkage,
            setRendering, setCamera, setBox, setMenuOpen, toggleMenu, togglePreviewList,
            toggleCrystalList, removeFromPreviewList, addToPreviewList, openPreviewList,
            toggleClusterPanel, toggleSearchField, setBreakout, setDists, setEdgeDists,
            setModification, setRemoved, setAdded, setResolved} = compareSlice.actions

export default compareSlice.reducer

export const getComp = createSelector((state) => state.compareSlice, (p) =>
    p["data"]
)

export const isRendering = createSelector((state) => state.compareSlice, (p) => p["rendering"])

export const getGraphType = createSelector((state) => state.compareSlice, (p) => p["graphtype"])

export const getK = createSelector((state) => state.compareSlice, (p) => p["k"])
export const getKx = createSelector((state) => state.compareSlice, (p) => p["k_x"])
export const getKy = createSelector((state) => state.compareSlice, (p) => p["k_y"])
export const getMeasure = createSelector((state) => state.compareSlice, (p) => p["measure"])
export const getThreshold = createSelector((state) => state.compareSlice, (p) => p["threshold"])
export const getMaxThreshold = createSelector((state) => state.compareSlice, (p) => p["max_threshold"])
export const getThresholds = createSelector((state) => state.compareSlice, (p) => p["thresholds"])
export const getKs = createSelector((state) => state.compareSlice, (p) => p["ks"])
export const getLinkage = createSelector((state) => state.compareSlice, (p) => p["linkage"])
export const getCamera = createSelector((state) => state.compareSlice, (p) => p["camera"])
export const getBox = createSelector((state) => state.compareSlice, (p) => p["box"])
export const getMenuOpen = createSelector((state) => state.compareSlice, (p) => p["menuOpen"])
export const getPreviewList = createSelector((state) => state.compareSlice, (p) => p["previewList"])
export const getPreviewListOpen = createSelector((state) => state.compareSlice, (p) => p["previewListOpen"])
export const getSearchFieldOpen = createSelector((state) => state.compareSlice, (p) => p["searchFieldOpen"])
export const getClusterPanelOpen = createSelector((state) => state.compareSlice, (p) => p["clusterPanelOpen"])
export const getCrystalListOpen = createSelector((state) => state.compareSlice, (p) => p["crystalListOpen"])
export const getBreakout = createSelector((state) => state.compareSlice, (p) => p["breakout"])
export const getDists = createSelector((state) => state.compareSlice, (p) => p["dists"])
export const getEdgeDists = createSelector((state) => state.compareSlice, (p) => p["edge_dists"])
export const getModification = createSelector((state) => state.compareSlice, (p) => p["modification"])
export const getAdded = createSelector((state) => state.compareSlice, (p) => p["added"])
export const getRemoved = createSelector((state) => state.compareSlice, (p) => p["removed"])



