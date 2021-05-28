


const selectedWeekReducer = (state = "W1", { type, payload }) => {
    switch (type) {
        case 'SELECTED_WEEK':
            return payload
        default:
            return state
    }
}

export default selectedWeekReducer