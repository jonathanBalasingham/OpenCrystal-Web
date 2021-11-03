import { combineReducers } from 'redux'

import optionsReducer from './features/options/optionsSlice'

const rootReducer = combineReducers({
    // Define a top-level state field named `todos`, handled by `todosReducer`
    openOptionsPanel: optionsReducer
})

export default rootReducer