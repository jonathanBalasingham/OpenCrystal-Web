import { configureStore } from '@reduxjs/toolkit'

import optionsReducer from './features/options/optionsSlice'

const store = configureStore({
    reducer: {
        // Define a top-level state field named `todos`, handled by `todosReducer`
        openOptionsPanel: optionsReducer
    }
})

export default store