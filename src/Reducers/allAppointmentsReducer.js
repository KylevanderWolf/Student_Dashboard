
const allAppointmentsReducer = (state = [], { type, payload }) => {
    switch (type) {

        case 'ADD_ALL_APPOINTMENTS':
            return payload

        case 'DELETE_APPOINTMENT':
            const duplicatedAppointments = [...state]
            const newAppointmentList = duplicatedAppointments.filter(element => element !== payload)
            return newAppointmentList

        case 'CHANGE_APPOINTMNENT':
            const allAppointments = [...state]
            const newAppointmentsWithDeletedAppointment = allAppointments.filter(e => e !== payload.oldAppointmentInfo)
            const newAppointmentsWithNewAppointment = [...newAppointmentsWithDeletedAppointment, payload.newAppointmentInfo]
            return newAppointmentsWithNewAppointment

        case 'ADD_NEW_APPOINTMENT':
            return [
                ...state,
                payload
            ]

        default:
            return state
    }
}

export default allAppointmentsReducer