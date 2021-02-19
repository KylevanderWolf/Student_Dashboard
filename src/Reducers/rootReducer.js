
import { combineReducers } from 'redux'
import formDataReducer from './formDataReducer'
import filterReducer from './filterReducer'

const rootReducer = combineReducers({
    formData: formDataReducer,
    filteredArray: filterReducer
})

export default rootReducer