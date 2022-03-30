import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    readingFile: false,
    createModalOpened: false,
    currentTab: "crystal",
    newSubsetName: "",
    newSubsetItems: [],
    setAtoms: [],
    setBonds: [],
    setSymmetry: "",
    setUnitCell: [],
    setIsDisordered: false,
    currentMessage: ""
};

const createModalSlice = createSlice({
    name: 'createModalOpened',
    initialState,
    reducers: {
        openCreateModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state["createModalOpened"] = true;
            return state;
        },
        toggleCreateModal(state, action) {
            state["createModalOpened"] = !state["createModalOpened"];
            return state;
        },
        closeCreateModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state["createModalOpened"] = false;
            return state;
        },
        setTab(state, action) {
            state["currentTab"] = action.payload;
            return state
        },
        setReadingFile(state, action) {
            state["readingFile"] = action.payload;
            return state
        },
        setCurrentMessage(state, action) {
            console.log(action.payload)
            state["currentMessage"] = action.payload
            return state
        }
    }
})

export const { openCreateModal, closeCreateModal, setTab, setReadingFile, setCurrentMessage } = createModalSlice.actions

export default createModalSlice.reducer

export const getCreateModalOpened = createSelector((state) => state.createModalSlice, (p) =>
    p["createModalOpened"]
)

export const getCurrentTab = createSelector((state) => state.createModalSlice, (p) =>
    p["currentTab"]
)

export const isReadingFile = createSelector((state) => state.createModalSlice, (p) =>
    p["readingFile"]
)

export const getCurrentMessage = createSelector((state) => state.createModalSlice, (p) =>
    p["currentMessage"]
)


