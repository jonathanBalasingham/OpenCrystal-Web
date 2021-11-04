import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    settingsModalOpened: false,
    potentialBackend: "",
    backend: ""
};

const settingsModalSlice = createSlice({
    name: 'settingsModalOpened',
    initialState,
    reducers: {
        openSettingsModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state["settingsModalOpened"] = true;
            return state;
        },
        closeSettingsModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state["settingsModalOpened"] = false;
            return state;
        },
        changePotentialBackend(state, action) {
            let url = action.payload
            console.log("Potential url is " + url)
            state["potentialBackend"] = url
            return state;
        },
        setNewBackend(state, action) {
            let url = action.payload
            state['backend'] = url
            return state
        }
    }
})

export const { openSettingsModal, closeSettingsModal, changePotentialBackend, setNewBackend } = settingsModalSlice.actions

export default settingsModalSlice.reducer

export const getSettingsModalOpened = createSelector((state) => state.settingsModalSlice, (p) =>
    p["settingsModalOpened"]
)

export const getPotentialBackend = createSelector((state) => state.settingsModalSlice, (p) =>
    p["potentialBackend"]
)

export const getBackend = createSelector((state) => state.settingsModalSlice, (p) =>
    p["backend"]
)