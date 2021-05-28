
const initialState = {
    difficulty: true,
    enjoyment: true,
}

const selectedAverageScoreType = (state = initialState, { type, payload }) => {
    switch (type) {
        case 'SELECTED_SCORE_TYPE':
            return payload
        default:
            return state
    }
}

export default selectedAverageScoreType