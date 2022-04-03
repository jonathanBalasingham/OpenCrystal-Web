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
    currentMessage: "",
    source: "",
    status: undefined,
    coordinateSystem: "fract",
    sourceStatus: undefined,
    subsetStatus: undefined,
    sourceMessage: "",
    subsetMessage: "",
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
        },
        setSource(state, action) {
            state["source"] = action.payload
            return state
        },
        setCoordinateSystem(state, action) {
            state["coordinateSystem"] = action.payload
            return state
        },
        setStatus(state, action) {
            state["status"] = action.payload
            return state
        },
        setSubsetStatus(state, action) {
            state["subsetStatus"] = action.payload
            return state
        },
        setSourceStatus(state, action) {
            state["sourceStatus"] = action.payload
            return state
        },
        setSourceMessage(state, action) {
            state["sourceMessage"] = action.payload
            return state
        },
        setSubsetMessage(state, action) {
            state["subsetMessage"] = action.payload
            return state
        }
    }
})

export const { openCreateModal, closeCreateModal, setTab,
                setReadingFile, setCurrentMessage, setAtoms,
                setBonds, setCrystal, setUnitCell, setSource,
                setCoordinateSystem, setStatus, setSourceStatus, setSubsetStatus,
                setSourceMessage, setSubsetMessage} = createModalSlice.actions

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

export const getSource = createSelector((state) => state.createModalSlice, (p) =>
    p["source"]
)

export const getCoordinateSystem = createSelector((state) => state.createModalSlice, (p) =>
    p["coordinateSystem"]
)

export const getStatus = createSelector((state) => state.createModalSlice, (p) =>
    p["status"]
)

export const getSubsetStatus = createSelector((state) => state.createModalSlice, (p) =>
    p["subsetStatus"]
)

export const getSourceStatus = createSelector((state) => state.createModalSlice, (p) =>
    p["sourceStatus"]
)

export const getSourceMessage = createSelector((state) => state.createModalSlice, (p) =>
    p["sourceMessage"]
)


export const getSubsetMessage = createSelector((state) => state.createModalSlice, (p) =>
    p["subsetMessage"]
)



