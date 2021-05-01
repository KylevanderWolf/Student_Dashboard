
import { combineReducers } from 'redux'
import clientReducer from '../Reducers/clientReducer'
import dentistReducer from '../Reducers/dentistReducer'
import assistentReducer from '../Reducers/assistentReducer'
import AllAppointments from '../Reducers/allAppointmentsReducer'

const rootReducer = combineReducers({
    dentists: dentistReducer,
    assistents: assistentReducer,
    clients: clientReducer,
    allAppointments: AllAppointments,
})

export default rootReducer

