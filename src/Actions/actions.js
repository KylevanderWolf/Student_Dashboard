export const formData = (data) => {
    return {
        type: 'FORMDATA',
        payload: data
    }
}

export const addFavorite = (data) => {
    return {
        type: 'ADD_FAVORITE',
        payload: data
    }
}

export const filteredArray = (data) => {
    return {
        type: 'ADD_FILTER',
        payload: data
    }
}
