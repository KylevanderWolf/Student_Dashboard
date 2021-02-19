

const formDataReducer = (state = [], { type, payload }) => {
    switch (type) {

        case 'FORMDATA':
            return [
                payload,
                ...state,
            ]

        case 'ADD_FAVORITE':
            return state.map((item) => {
                // Find the item with the matching id
                if (item.id === payload.id) {
                    // Return a new object
                    return {
                        ...item,  // copy the existing item
                        favorite: payload.favorite  // replace the email addr
                    }
                }
                // Leave every other item unchanged
                return item;
            });

        default:
            return state
    }
}

export default formDataReducer

