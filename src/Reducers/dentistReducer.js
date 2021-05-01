

//ALL DENTIST
const ALLDentistInfo = [
    {
        firstName: "Harm",
        surName: " van der Wijk",
        phoneNumber: "0628828316",
        email: "harmvanderwijk@tandartspraktijkbvt.nl",
        treatmentType: "Gaatjes Vullen",
        sick: false,
        id: 1,
        calenderDayIndex: 0,
        discipline: "Tandarts"
    },
    {
        firstName: "Sander",
        surName: " van Groen",
        phoneNumber: "0663279269",
        email: "sandervangroen@tandartspraktijkbvt.nl",
        treatmentType: "Kroon Zetten",
        sick: false,
        id: 2,
        calenderDayIndex: 0,
        discipline: "Tandarts"
    },
    {
        firstName: "Sjaak ",
        surName: "van Loon",
        phoneNumber: "0641985069",
        email: "sjaakvanloon@tandartspraktijkbvt.nl",
        treatmentType: "Tanden Trekken",
        sick: false,
        id: 3,
        calenderDayIndex: 0,
        discipline: "Tandarts"
    },
    {
        firstName: "Arjan ",
        surName: "van Vliet",
        phoneNumber: "0635829216",
        email: "arjanvanvliet@tandartspraktijkbvt.nl",
        treatmentType: "Kaakchirurgie",
        sick: false,
        id: 4,
        calenderDayIndex: 0,
        discipline: "Tandarts"
    },
]


const dentistReducer = (state = ALLDentistInfo, { type, payload }) => {
    switch (type) {
        case 'ADD_DENTIST':
            return [
                ...state,
                payload
            ]

        case 'SET_AVAILABLE':
            const duplicatedState = [...state]
            const correctDentist = duplicatedState.find(e => e.id === payload)
            correctDentist.sick = !correctDentist.sick
            return duplicatedState

        default:
            return state

    }
}

export default dentistReducer