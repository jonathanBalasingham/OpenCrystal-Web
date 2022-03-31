import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
    "access": null,
    "refresh": null,
    "user": null,
    "email": null,
    "loggedIn": false,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addAccessToken(state, action) {
            sessionStorage.setItem('access', action.payload);
            return {
                ...state,
                "access": action.payload,
            };
        },
        addRefreshToken(state, action) {
            sessionStorage.setItem('refresh', action.payload);
            return {
                ...state,
                "refresh": action.payload,
            };
        },
        addUser(state, action) {
            return {
                ...state,
                "user": action.payload,
            }
        },
        setLoggedIn(state, action) {
            return {
                ...state,
                ...action.payload
            }
        }
    }
})

export const { setLoggedIn, addUser, addAccessToken, addRefreshToken } = authSlice.actions

export default authSlice.reducer

export const getAccessToken = createSelector((state) => state.authSlice, (p) => {
    return p['access']
})

export const getRefreshToken = createSelector((state) => state.authSlice, (p) => {
    return p['refresh']
})

export const getCurrentUser = createSelector((state) => state.authSlice, (p) =>
    p["user"]
)

export const getLoggedIn = createSelector((state) => state.authSlice, (p) =>
    p["loggedIn"]
)