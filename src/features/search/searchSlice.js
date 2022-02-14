import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    searchPanelOpened: false,
    currentContent: "results",
    resultSize: 100,
    facet: "name",
    k: 100,
    n: 2,
    results: {
        "data": [],
        "loading": false,
    },
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
        changeContent(state, action){
            console.log("Changing content");
            state["currentContent"] = action.payload;
            return state;
        },
        change(state, action){
            return {
                ...state,
                ...action.payload
            };
        },
    }
})

export const { openSearchPanel, closeSearchPanel, changeContent, change } = searchPanelSlice.actions

export default searchPanelSlice.reducer

export const getSearchPanelOpened = createSelector((state) => state.searchPanelSlice, (p) =>
    p["searchPanelOpened"]
)

export const getContent = createSelector((state) => state.searchPanelSlice, (p) =>
    p["currentContent"]
)

export const getK = createSelector((state) => state.searchPanelSlice, (p) =>
    p["k"]
)
export const getFacet = createSelector((state) => state.searchPanelSlice, (p) =>
    p["facet"]
)
export const getResultSize = createSelector((state) => state.searchPanelSlice, (p) =>
    p["resultSize"]
)

export const getResults = createSelector((state) => state.searchPanelSlice, (p) =>
    p["results"]
)
