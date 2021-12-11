import { createSlice, createSelector, current } from '@reduxjs/toolkit'

const initialState = {
    "data": [],
    "rendering": false,
    "graphtype": "full",
    "k": 100,
    "measure": "pdd",
    "threshold": 5,
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
        setThreshold(state, action) {
            return {
                ...state,
                "threshold": Number(action.payload)
            }
        },
        setMaxThreshold(state, action) {
            return {
                ...state,
                "max_threshold": Number(action.payload)
            }
        }
    }
})

export const { addComp, removeComp, setGraphType, clearComp, setK, setMeasure, setThreshold, setMaxThreshold } = compareSlice.actions

export default compareSlice.reducer

export const getComp = createSelector((state) => state.compareSlice, (p) =>
    p["data"]
)

export const isRendering = createSelector((state) => state.compareSlice, (p) => p["rendering"])

export const getGraphType = createSelector((state) => state.compareSlice, (p) => p["graphtype"])

export const getK = createSelector((state) => state.compareSlice, (p) => p["k"])

export const getMeasure = createSelector((state) => state.compareSlice, (p) => p["measure"])

export const getThreshold = createSelector((state) => state.compareSlice, (p) => p["threshold"])

export const getMaxThreshold = createSelector((state) => state.compareSlice, (p) => p["max_threshold"])
