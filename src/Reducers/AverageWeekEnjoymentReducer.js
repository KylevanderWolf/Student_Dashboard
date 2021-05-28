const AverageEnjoymentScorePerWeek = (state = [], { type, payload }) => {
    switch (type) {
        case 'AVERAGE_ENJOYMENT_SCORE':
            return payload
        default:
            return state
    }
}

export default AverageEnjoymentScorePerWeek