import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    viewOpened: false,
    currentObject: null,
    currentContent: "molecule",
};

const viewSlice = createSlice({
    name: 'viewOpened',
    initialState,
    reducers: {
        openView(state, action) {
            console.log("Opening modal")
            state["viewOpened"] = true;
            return state;
        },
        closeView(state, action) {
            console.log("Closing modal")
            state["viewOpened"] = false;
            return state;
        },
        changeContent(state, action){
            console.log("Changing content");
            state["currentContent"] = action.payload;
            return state;
        },
        changeObject(state, action) {
            state["currentObject"] = action.payload;
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

export const { openView, closeView, changeContent, change, changeObject } = viewSlice.actions

export default viewSlice.reducer

export const getViewOpened = createSelector((state) => state.viewSlice, (p) =>
    p["viewOpened"]
)

export const getObject = createSelector((state) => state.viewSlice, (p) =>
    p["currentObject"]
)

export const getContent = createSelector((state) => state.viewSlice, (p) =>
    p["currentContent"]
)

