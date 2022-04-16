import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "openApp": "compare",
    "width": 0,
    "height": 0,
}

const appSlice = createSlice({
    name: 'openApplication',
    initialState,
    reducers: {
        openViewApp(state, action) {
            state["openApp"] = "view"
            return state;
        },
        openCompareApp(state, action) {
            state["openApp"] = "compare"
            return state;
        },
        openCreateApp(state, action) {
            state["openApp"] = "create"
            return state
        },
        setSize(state, action) {
            state["width"] = action.payload.width
            state["height"] = action.payload.height
            return state
        },
        openHomeApp(state, actions) {
            state["openApp"] = "home"
            return state
        }
    }
})

export const { openCompareApp, openViewApp, openCreateApp, setSize, openHomeApp } = appSlice.actions

export default appSlice.reducer

export const getOpenApp = createSelector((state) => state.appSlice, (p) =>
    p["openApp"]
)

export const getWidth = createSelector((state) => state.appSlice, (p) =>
    p["width"]
)

export const getHeight = createSelector((state) => state.appSlice, (p) =>
    p["height"]
)