import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    createModalOpened: false,
};

const createModalSlice = createSlice({
    name: 'createModalOpened',
    initialState,
    reducers: {
        openCreateModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            console.log("Opening modal")
            state["createModalOpened"] = true;
            return state;
        },
        closeCreateModal(state, action) {
            // ✅ This "mutating" code is okay inside of createSlice!
            state["createModalOpened"] = false;
            return state;
        },
    }
})

export const { openCreateModal, closeCreateModal } = createModalSlice.actions

export default createModalSlice.reducer

export const getCreateModalOpened = createSelector((state) => state.createModalSlice, (p) =>
    p["createModalOpened"]
)
