
const studentRouteDataReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case 'CORRECT_STUDENT_SCORES':
            return payload
        default:
            return state
    }
}

export default studentRouteDataReducer