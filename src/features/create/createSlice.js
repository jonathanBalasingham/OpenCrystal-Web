import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    readingFile: false,
    createModalOpened: false,
    currentTab: "crystal",
    newSubsetName: "",
    newSubsetItems: [],
    crystal: {},
    atoms: [],
    bonds: [],
    setSymmetry: "",
    unitCell: {},
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
        },
        setAtoms(state, action) {
            state["atoms"] = action.payload
            return state
        },
        setBonds(state, action) {
            state["bonds"] = action.payload
            return state
        },
        setUnitCell(state, action) {
            state["unitCell"] = action.payload
            return state
        },
        setCrystal(state, action) {
            state["crystal"] = action.payload
            return state
        }
    }
})

export const { openCreateModal, closeCreateModal, setTab,
                setReadingFile, setCurrentMessage, setAtoms, setBonds, setCrystal, setUnitCell } = createModalSlice.actions

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

export const getCrystal = createSelector((state) => state.createModalSlice, (p) =>
    p["crystal"]
)

export const getUnitCell = createSelector((state) => state.createModalSlice, (p) =>
    p["unitCell"]
)

export const getAtoms = createSelector((state) => state.createModalSlice, (p) =>
    p["atoms"]
)

export const getBonds = createSelector((state) => state.createModalSlice, (p) =>
    p["bonds"]
)

