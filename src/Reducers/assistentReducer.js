

//ALL ASSISTENTS
const AllAssistentInfo = [
    {
        firstName: "Mirthe ",
        surName: "Vogel",
        phoneNumber: "0628867316",
        email: "mirthevogel@tandartspraktijkbvt.nl",
        treatmentType: "Assistent",
        id: 1,
    },
    {
        firstName: "Lisa",
        surName: " Prins",
        phoneNumber: "0664379269",
        email: "lisaprins@tandartspraktijkbvt.nl",
        treatmentType: "Assistent",
        id: 2,
    },
]



const assistentReducer = (state = [...AllAssistentInfo], { type, payload }) => {
    switch (type) {
        case 'ADD_NEW_ASSISTENT':
            return [
                ...state,
                payload,
            ]

        default:
            return state
    }
}

export default assistentReducer