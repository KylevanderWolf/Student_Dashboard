
const SelectedStudentReducer = (state = [], { type, payload }) => {
    switch (type) {
        case 'SELECTED_STUDENT_NAMES':
            return payload
        default:
            return state
    }
}

export default SelectedStudentReducer