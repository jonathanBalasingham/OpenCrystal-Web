import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "access": null,
    "refresh": null,
    "user": null,
    "email": null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addToken(state, action) {
            sessionStorage.setItem('token', action.payload);
            return {
                ...action.payload
            };
        },
        refreshToken(state, action) {
            return {
                ...state,
                ...action.payload
            };
        },
    }
})

export const { addToken, refreshToken } = authSlice.actions

export default authSlice.reducer

export const getAccessToken = createSelector((state) => state.authSlice, (p) =>
    sessionStorage.getItem('token')['access']
)

export const getRefreshToken = createSelector((state) => state.authSlice, (p) =>
    sessionStorage.getItem('token')['refresh']
)

export const getCurrentUser = createSelector((state) => state.authSlice, (p) =>
    p["user"]
)