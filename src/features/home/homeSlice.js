import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "createCrystalOpen": false,
    "createSourceOpen": false,
    "createSubsetOpen": false,
    "selected": [],
    "activeAccordion": "recent",
    "width": 0,
    "height": 0,
    "crystalSearchResults": [],
    "subsetSearchResults": [],
    "sourceSearchResults": []
}

const homeSlice = createSlice({
    name: 'homeApplication',
    initialState,
    reducers: {
        setCreatePanel(state, action) {
            state["createPanelOpen"] = action.payload
            return state;
        },
        handleTickBox(state, action) {
            if (!state.selected.includes(action.payload)) {
                state.selected = state.selected.concat([action.payload])
            } else {
                state.selected = state.selected.filter(x => x !== action.payload)
            }
        },
        setActiveAccordion(state, action) {
            state["activeAccordion"] = action.payload
            return state
        },
        openCrystalCreate(state, action) {
            state["createCrystalOpen"] = true
            return state
        },
        openSubsetCreate(state, action) {
            state["openSubsetCreate"] = true
            return state
        },
        openSourceCreate(state, action) {
            state["openSourceCreate"] = true
            return state
        },
        closeCrystalCreate(state, action) {
            state["createCrystalOpen"] = false
            return state
        },
        closeSubsetCreate(state, action) {
            state["createSubsetOpen"] = false
            return state
        },
        closeSourceCreate(state, action) {
            state["createSourceOpen"] = false
            return state
        },
        setCrystalSearchResults(state, action) {
            state["crystalSearchResults"] = action.payload
            return state
        },
        setSourceSearchResults(state, action) {
            state["sourceSearchResults"] = action.payload
            return state
        },
        setSubsetSearchResults(state, action) {
            state["subsetSearchResults"] = action.payload
            return state
        }
    }
})

export const { setCreatePanel, handleTickBox, setActiveAccordion, closeCrystalCreate, closeSourceCreate, closeSubsetCreate,
               openSubsetCreate, openSourceCreate, openCrystalCreate, setCrystalSearchResults, setSourceSearchResults, setSubsetSearchResults } = homeSlice.actions

export default homeSlice.reducer

export const getCreatePanelOpen = createSelector((state) => state.homeSlice, (p) =>
    p["createPanelOpen"]
)

export const getSelected = createSelector((state) => state.homeSlice, (p) =>
    p["selected"]
)

export const getActiveAccordion = createSelector((state) => state.homeSlice, (p) =>
    p["activeAccordion"]
)


export const getCreateCrystalOpen = createSelector((state) => state.homeSlice, (p) =>
    p["createCrystalOpen"]
)

export const getCreateSubsetOpen = createSelector((state) => state.homeSlice, (p) =>
    p["createSubsetOpen"]
)

export const getCreateSourceOpen = createSelector((state) => state.homeSlice, (p) =>
    p["createSourceOpen"]
)

export const getCrystalSearchResults = createSelector((state) => state.homeSlice, (p) =>
    p["crystalSearchResults"]
)

export const getSubsetSearchResults = createSelector((state) => state.homeSlice, (p) =>
    p["subsetSearchResults"]
)
export const getSourceSearchResults = createSelector((state) => state.homeSlice, (p) =>
    p["sourceSearchResults"]
)


