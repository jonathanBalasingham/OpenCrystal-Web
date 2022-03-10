import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    currentObject: undefined,
};

const viewSlice = createSlice({
    name: 'previewOpened',
    initialState,
    reducers: {
        addView(state, action) {
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

export const { change, addView } = viewSlice.actions

export default viewSlice.reducer

export const getViewObject = createSelector((state) => state.viewSlice, (p) =>
    p["currentObject"]
)


