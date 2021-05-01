
import { useSelector } from 'react-redux';


const GetRandomClientID = () => {
    const allClientIDs = useSelector(state => state.clients.map(e => e.id))
    return allClientIDs[Math.floor(Math.random() * allClientIDs.length)]
}

const GetRandomDentistID = () => {
    const allDentistIDs = useSelector(state => state.dentists.map(e => e.id))
    const randomDentistID = allDentistIDs[Math.floor(Math.random() * allDentistIDs.length)]
    return randomDentistID
}

const GetRandomAssistentID = () => {
    const allAssistentIDs = useSelector(state => state.assistents.map(e => e.id))
    const newAssistentListIDs = [...allAssistentIDs, null]
    return newAssistentListIDs[Math.floor(Math.random() * newAssistentListIDs.length)];
}

const GetRandomDay = () => {
    const allDays = [1, 2, 3, 4, 5, "6", "7", 8, 9, 10, 11, 12, "13", "14", 15, 16, 17, 18, 19, "20", "21", 22, 23, 24, 25, 26, "27", "28"]
    const filteredDays = allDays.filter(e => typeof e !== 'string')
    return filteredDays[Math.floor(Math.random() * filteredDays.length)]
}

const GetRandomTime = () => {
    const allTimeZones = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    return allTimeZones[Math.floor(Math.random() * allTimeZones.length)];
}

const GenerateRandomAppointment = () => {
    return {
        dentistID: GetRandomDentistID(),
        clientID: GetRandomClientID(),
        assistentID: GetRandomAssistentID(),
        time: GetRandomTime(),
        dayNumber: GetRandomDay(),
    };
}

const GenerateRandomAppointments = () => {

    const filledArray = [...new Array(250)].map(() => GenerateRandomAppointment());

    //filter Duplicated Dentist Appointments
    const filterDentistArray = filledArray.filter((element, i, array) =>
        array.findIndex(e => e.dentistID === element.dentistID && e.dayNumber === element.dayNumber && e.time === element.time) === i)

    //filter Duplicated Clients Appointments
    const filteredArray = filterDentistArray.filter((element, i, array) =>
        array.findIndex(e => e.clientID === element.clientID && e.dayNumber === element.dayNumber && e.time === element.time) === i)


    //filter Duplicated Assistents Appointments
    const newFilteredArray = filteredArray.filter((element, i, array) =>
        array.findIndex(e => e.assistentID === element.assistentID && e.dayNumber === element.dayNumber && e.time === element.time) === i)

    //Slice it for 150 unique Appointments
    const allFilteredAppointments = newFilteredArray.slice(0, 150);
    return allFilteredAppointments
}


export default GenerateRandomAppointments
