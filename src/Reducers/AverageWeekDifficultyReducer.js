const AverageDifficultyScorePerWeek = (state = [], { type, payload }) => {
    switch (type) {
        case 'AVERAGE_DIFFICULTY_SCORE':
            return payload
        default:
            return state
    }
}

export default AverageDifficultyScorePerWeek