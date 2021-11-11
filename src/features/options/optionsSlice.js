import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "openOptionsPanel": "NONE",
    "openApplicationBay": "View-app"
}

const openOptionsPanelSlice = createSlice({
    name: 'openApplication',
    initialState,
    reducers: {
        viewToggled(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            if (state["openOptionsPanel"] === "View-panel")
                state["openOptionsPanel"] = "NONE"
            else {
                state["openOptionsPanel"] = "View-panel"
                state["openApplicationBay"] = "View-app"
            }

            return state;
        },
        compareToggled(state, action) {
            if (state["openOptionsPanel"] === "Compare-panel")
                state["openOptionsPanel"] = "NONE"
            else {
                state["openOptionsPanel"] = "Compare-panel"
                state["openApplicationBay"] = "Compare-app"
            }

            return state;
        },
        databaseToggled(state, action) {
            if (state["openOptionsPanel"] === "Database-panel")
                state["openOptionsPanel"] = "NONE"
            else {
                state["openOptionsPanel"] = "Database-panel"
                state["openApplicationBay"] = "Database-app"
            }
            return state;
        },
        settingsToggled(state, action) {
            if (state["openOptionsPanel"] === "Settings-panel")
                state["openOptionsPanel"] = "NONE"
            else {
                state["openOptionsPanel"] = "Settings-panel"
                state["openApplicationBay"] = "Settings-app"
            }
            return state;
        }
    }
})

export const { viewToggled, compareToggled, databaseToggled, settingsToggled } = openOptionsPanelSlice.actions

export default openOptionsPanelSlice.reducer

export const getOpenOptionsPanel = createSelector((state) => state.openOptionsPanelSlice, (p) =>
    p["openOptionsPanel"]
)

export const getOpenApplicationBay = createSelector((state) => state.openOptionsPanelSlice, (p) =>
    p["openApplicationBay"]
)