const filterReducer = (state = [], { type, payload }) => {
    switch (type) {

        case 'ADD_FILTER':
            return payload
        default:
            return state
    }
}

export default filterReducer
