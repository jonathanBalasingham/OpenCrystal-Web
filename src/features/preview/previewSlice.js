import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    previewOpened: false,
    currentObject: null,
    currentContent: "molecule",
    x: 0,
    y: 0,
};

const previewSlice = createSlice({
    name: 'previewOpened',
    initialState,
    reducers: {
        openPreview(state, action) {
            console.log("Opening modal")
            state["previewOpened"] = true;
            return state;
        },
        closePreview(state, action) {
            console.log("Closing modal")
            state["previewOpened"] = false;
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

export const { openPreview, closePreview, changeContent, change, changeObject } = previewSlice.actions

export default previewSlice.reducer

export const getPreviewOpened = createSelector((state) => state.previewSlice, (p) =>
    p["previewOpened"]
)

export const getObject = createSelector((state) => state.previewSlice, (p) =>
    p["currentObject"]
)

export const getContent = createSelector((state) => state.previewSlice, (p) =>
    p["currentContent"]
)

export const getX = createSelector((state) => state.previewSlice, (p) =>
    p["x"]
)

export const getY = createSelector((state) => state.previewSlice, (p) =>
    p["y"]
)


