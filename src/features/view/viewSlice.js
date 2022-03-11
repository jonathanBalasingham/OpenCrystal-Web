import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    currentObject: undefined,
    menuOpen: false,
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
        setMenuOpen(state, action) {
            return {
                ...state,
                "menuOpen": action.payload,
            }
        },
    }
})

export const { change, addView, setMenuOpen } = viewSlice.actions

export default viewSlice.reducer

export const getViewObject = createSelector((state) => state.viewSlice, (p) =>
    p["currentObject"]
)

export const getMenuOpen = createSelector((state) => state.viewSlice, (p) => p["menuOpen"])



