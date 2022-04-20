import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "createPanelOpen": false,
    "selected": [],
    "width": 0,
    "height": 0,
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
        }
    }
})

export const { setCreatePanel, handleTickBox } = homeSlice.actions

export default homeSlice.reducer

export const getCreatePanelOpen = createSelector((state) => state.homeSlice, (p) =>
    p["createPanelOpen"]
)

export const getSelected = createSelector((state) => state.homeSlice, (p) =>
    p["selected"]
)
