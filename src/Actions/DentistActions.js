
export const addDentist = (dentistInfo) => {
    return {
        type: 'ADD_DENTIST',
        payload: dentistInfo
    }
}


export const makeDentistSick = (dentistInfo) => {
    return {
        type: 'SET_AVAILABLE',
        payload: dentistInfo
    }
}
