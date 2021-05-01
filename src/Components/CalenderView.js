import React, { useState } from 'react'
import Appbar from '../Components/Appbar'
import styled from 'styled-components'
import { Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

//STYLING
const PageWrapper = styled.div`
height: auto; 
width: auto;
display: flex;
flex-wrap: wrap;
background-color: white;
margin: 0px;
justify-content: center;
flex-direction: column;
align-items: center;
padding: 10px;
`
const Container = styled.div`
height: 70vh;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin-top: 20px;
`

const DayContainer = styled.div`
    width: 300px;
    height: 300px;
    box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`
const DayHeader = styled.div`
    width: 300px;   
    height: auto;
    padding: 10px 0px;
    display: flex;
    justify-content: space-around;
`
const DayText = styled.div`
    width: 40px;
    height: 40px;
    border-bottom: 2px solid #a2a2a2;
    display: flex;
    justify-content: center;
    align-items: center;
`
const DayNumberContainer = styled.div`
    height: auto;
    width: 300px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`
const DayNumber = styled.button`
width: 40px;
height: 40px;
background-color: ${props => props.bg};
color: ${props => props.color};
border-radius: 5px;
border: 2px solid #a2a2a2;
margin: 10px;
cursor: pointer;
border: 1px solid transparent;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
transition: 0.2s ease-in-out;
&:hover {
        box-shadow: none;
        background-color: #7866D5;
        border: 1px solid #a2a2a2;
        color: white;
        border-radius: 7px
    }
&:focus {
        box-shadow: none;
        background-color: #7866D5;
        border: 1px solid #a2a2a2;
        color: white;
        outline: none;
    }
`
const AppointmentContainer = styled.div`
height: 70vh;
width: 300px;
background-color: white;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
overflow-y: scroll;
padding: 10px;
`
const TextListItem = styled(Typography)`
display: flex;
align-items: center;
padding: 0px 10px;
`
const AppointmentContainerItem = styled.div`
height: auto;
padding: 10px;
margin: 10px 0px;
display: flex;
flex-direction: column;
border-radius: 5px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
border: ${props => props.borderColor};
background-color: ${props => props.bgColor};
`


const CalenderView = () => {
    const allAppointments = useSelector(state => state.allAppointments)
    const allClients = useSelector(state => state.clients)
    const allDentists = useSelector(state => state.dentists)
    const allAssistents = useSelector(state => state.assistents)
    const allDays = ["Ma", "Di", "Wo", "Do", "Vr"]
    const allDaynumbers = [1, 2, 3, 4, 5, "6", "7", 8, 9, 10, 11, 12, "13", "14", 15, 16, 17, 18, 19, "20", "21", 22, 23, 24, 25, 26, "27", "28"]
    const filteredWeekDays = (allDaynumbers.filter(e => typeof e !== 'string'))
    const [currentDayNumber, setCurrentDayNumber] = useState(1)
    const allDayNames = allDays.map((dayNumber, i) => <DayText key={i}>{dayNumber}</DayText>)
    const dayNumbers = filteredWeekDays.map((e, i) =>
        <DayNumber
            key={i}
            onClick={() => handleDayNumber(e, i)}
            bg={currentDayNumber === e ? `#7866D5` : `white`}
            color={currentDayNumber === e ? `white` : `black`}>
            {e}
        </DayNumber>)

    const handleDayNumber = (e, i) => {
        setCurrentDayNumber(e)
    }

    const ClientNameFromID = (id) => allClients.filter(e => e.id === id).map(e => e.firstName + e.surName)
    const DentistNameFromID = (id) => allDentists.filter(e => e.id === id).map(e => e.firstName + e.surName)
    const AssistentNameFromID = (id) => allAssistents.filter(e => e.id === id).map(e => e.firstName + e.surName)

    const CheckDentistSick = (id) => allDentists.find(e => e.id === id).sick

    const AppointmentItems = allAppointments.filter(e => e.dayNumber === currentDayNumber)
        .sort((a, b) => (a.time > b.time) ? 1 : -1)
        .map((e, i) =>
            <AppointmentContainerItem key={i}
                bgColor={CheckDentistSick(e.dentistID) ? `#F75052` : `#90E57E`}
            >
                <TextListItem variant="subtitle2" gutterBottom>Tijdstip: {e.time}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>Client: {ClientNameFromID(e.clientID)}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>Tandarts: {DentistNameFromID(e.dentistID)}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>Assistent: {e.assistentID !== null ?
                    AssistentNameFromID(e.assistentID) : "Geen Assistent"}</TextListItem>
            </AppointmentContainerItem>
        )


    return <PageWrapper>
        <Appbar />
        <TextListItem variant="h5" gutterBottom>Calender</TextListItem>
        <Container>
            <DayContainer>
                <DayHeader>{allDayNames}</DayHeader>
                <DayNumberContainer>{dayNumbers}</DayNumberContainer>
            </DayContainer>
            <AppointmentContainer>
                {AppointmentItems}
            </AppointmentContainer>
        </Container>
    </PageWrapper>
}

export default CalenderView