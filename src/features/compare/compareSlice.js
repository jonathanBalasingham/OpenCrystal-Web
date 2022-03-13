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
    "menuOpen": false,
    "previewListOpen": false,
    "previewList": [],
    "crystalListOpen": false,
}

const compareSlice = createSlice({
    name: 'comp',
    initialState,
    reducers: {
        addComp(state, action) {
            let newState = state["data"]
            if (!state["data"].includes(action.payload))
                newState = state["data"].concat([action.payload])

            return {
                ...state,
                "data": newState
            };
        },
        addComps(state, action) {
            let newState = state["data"]
            for (let i = 0; i < action.payload.length; i++) {
                if (!state["data"].includes(action.payload[i]))
                    newState = newState.concat([action.payload[i]])
            }
            return {
                ...state,
                "data": newState
            };
        },
        removeComp(state, action) {
            return {
                ...state,
                "data": state["data"].filter(x => x !== action.payload)

            };
        },
        clearComp(state, action){
            return {
                ...state,
                "data": []
            };
        },
        setGraphType(state, action) {
            const gt  = action.payload
            return {
              ...state,
              "graphtype": gt
            };
        },
        setMeasure(state, action) {
            return {
                ...state,
                "measure": action.payload
            }
        },
        setK(state, action) {
            return {
                ...state,
                "k": Number(action.payload)
            }
        },
        setKx(state, action) {
            return {
                ...state,
                "k_x": Number(action.payload)
            }
        },
        setKy(state, action) {
            return {
                ...state,
                "k_y": Number(action.payload)
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
                "linkage": action.payload
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
        }
    }
})

export const { addComp, addComps, removeComp, setGraphType, clearComp, setK, setKx, setKy,
            setMeasure, setThreshold, setMaxThreshold, setThresholds, setKs, setLinkage,
            setRendering, setCamera, setBox, setMenuOpen, toggleMenu, togglePreviewList,
            toggleCrystalList, removeFromPreviewList, addToPreviewList } = compareSlice.actions

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
