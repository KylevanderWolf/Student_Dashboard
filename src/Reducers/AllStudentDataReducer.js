
const allStudentDataReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'ALL_STUDENT_DATA':
            return payload
        default:
            return state
    }
}

export default allStudentDataReducer