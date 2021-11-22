import { configureStore } from '@reduxjs/toolkit'

import optionsReducer from './features/options/optionsSlice'
import settingsReducer from './features/settings/settingsFooterSlice'
import authReducer from './features/auth/authSlice'

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        openOptionsPanelSlice: optionsReducer,
        settingsModalSlice: settingsReducer,
        authSlice: authReducer
    }
})

export default store