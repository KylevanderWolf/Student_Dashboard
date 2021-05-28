
const StudentNameReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'STUDENT_NAMES':
            return payload
        default:
            return state
    }
}

export default StudentNameReducer