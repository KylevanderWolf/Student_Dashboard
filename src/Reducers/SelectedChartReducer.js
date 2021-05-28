


const selectedChartReducer = (state = "Bar", { type, payload }) => {
    switch (type) {
        case 'SELECTED_CHART':
            return payload
        default:
            return state
    }
}

export default selectedChartReducer