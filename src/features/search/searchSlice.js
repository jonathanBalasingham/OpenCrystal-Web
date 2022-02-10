import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    searchPanelOpened: false,
};

const searchPanelSlice = createSlice({
    name: 'searchPanelOpened',
    initialState,
    reducers: {
        openSearchPanel(state, action) {
            console.log("Opening modal")
            state["searchPanelOpened"] = true;
            return state;
        },
        closeSearchPanel(state, action) {
            console.log("Closing modal")
            state["searchPanelOpened"] = false;
            return state;
        },
    }
})

export const { openSearchPanel, closeSearchPanel } = searchPanelSlice.actions

export default searchPanelSlice.reducer

export const getSearchPanelOpened = createSelector((state) => state.searchPanelSlice, (p) =>
    p["searchPanelOpened"]
)
