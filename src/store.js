import { configureStore } from '@reduxjs/toolkit'

import optionsReducer from './features/options/optionsSlice'
import settingsReducer from './features/settings/settingsFooterSlice'

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        openOptionsPanel: optionsReducer,
        settingsModalSlice: settingsReducer
    }
})

export default store