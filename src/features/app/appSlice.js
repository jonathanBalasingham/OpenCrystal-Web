import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "openApp": "compare"
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
        }
    }
})

export const { openCompareApp, openViewApp, openCreateApp } = appSlice.actions

export default appSlice.reducer

export const getOpenApp = createSelector((state) => state.appSlice, (p) =>
    p["openApp"]
)