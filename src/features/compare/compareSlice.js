import { createSlice, createSelector, current } from '@reduxjs/toolkit'

const initialState = {
    "data": [],
    "rendering": false,
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
    }
})

export const { addComp, removeComp } = compareSlice.actions

export default compareSlice.reducer

export const getComp = createSelector((state) => state.compareSlice, (p) =>
    p["data"]
)

export const isRendering = createSelector((state) => state.compareSlice, (p) => p["rendering"])