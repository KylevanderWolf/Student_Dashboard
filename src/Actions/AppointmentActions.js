

export const allAppointments = (allAppointments) => {
    return {
        type: 'ADD_ALL_APPOINTMENTS',
        payload: allAppointments
    }
}

export const deleteAppointment = (appointmentInfo) => {
    return {
        type: 'DELETE_APPOINTMENT',
        payload: appointmentInfo
    }
}

export const changeAppointment = (appointmentInfo) => {
    return {
        type: 'CHANGE_APPOINTMNENT',
        payload: appointmentInfo
    }
}

export const addNewAppointment = (appointmentInfo) => {
    return {
        type: 'ADD_NEW_APPOINTMENT',
        payload: appointmentInfo
    }
}
