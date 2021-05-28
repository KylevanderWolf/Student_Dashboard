
const correctWeekLabels = (state = [], { type, payload }) => {
    switch (type) {
        case 'SHOW_WEEK_LABELS':
            return payload
        default:
            return state
    }
}

export default correctWeekLabels