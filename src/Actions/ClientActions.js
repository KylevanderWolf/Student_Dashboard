export const addClientAppointment = (clientInfo) => {
    return {
        type: 'ADD_NEW_CLIENT',
        payload: clientInfo
    }
}
