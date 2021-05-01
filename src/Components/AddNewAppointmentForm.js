import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import CheckIcon from '@material-ui/icons/Check';
import { addNewAppointment } from '../Actions/AppointmentActions'

const DialogContainer = styled(Dialog)`
`
const DialogContentContainer = styled.div`
min-height: 60vh;
max-height: auto;
min-width: 320px;
background-color: white;
display: flex;
margin: 0px;
padding: 10px;
flex-direction: column;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const DialogHeader = styled.header`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
padding: 5px;
margin-bottom: 10px;
`
const CloseIconContainer = styled.div`
display: flex;
height: auto;
padding: 10px;
justify-content: flex-end;
`
const IconClose = styled(CloseIcon)`
cursor: pointer;
color: red;
`
const TextListItem = styled(Typography)`
display: flex;
align-items: center;
padding: 0px 10px;
`
const MainContainer = styled.div`
height: auto;
background-color: white;
padding: 10px;
`
const CurrentClientContainer = styled.div`
height: auto;
padding: 10px;
margin-bottom: 20px;
background: white;
display: flex;
align-items: center;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
border-radius: 5px;
margin-bottom: 20px;
`
const Container = styled.div`
height: 35vh;
overflow-y: scroll;
`
const ClientListItems = styled.div`
padding: 10px;
margin: 5px 0px;
border-radius: 5px;
cursor: pointer;
background-color: white;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
background-color: ${props => props.bg};
color: ${props => props.color};
`
const IconPerson = styled(PersonIcon)`
&&{
    font-size: 1.4em;
    margin-right: 10px;
}
`
const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: auto;
padding: 5px;
margin-top: auto;
`
const NextButton = styled.button`
width: auto;
height: auto;
padding: 10px;
background-color: ${props => props.secondary ? `red` : `#7866D5`};
outline: none;
color: white;
border: none;
transition: 0.2s ease-in-out;
border-radius: 5px;
cursor: pointer;
margin-top: 30px;
display: flex;
margin-left: auto;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
&:hover {
    box-shadow: none;
    border-radius: 8px;
}
`
const PrevButton = styled(NextButton)`
margin-left: 5px;
`
const TreatmentItem = styled.div`
height: auto;
padding: 10px;
border-radius: 5px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin: 10px 0px;
cursor: pointer;
background-color: ${props => props.bg};
color: ${props => props.color};
border: 1px solid transparent;
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
const IconCheck = styled(CheckIcon)`
margin-right: 5px;
`
const DentistItem = styled(TreatmentItem)`
`
const DayContainer = styled.div`
    width: 300px;
    min-height: 320px;
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
const TimeContainer = styled(Container)`
display: flex;
width: 300px;
height: 45vh;
flex-wrap: wrap;
justify-content: center;
align-items: center;
`
const TimeItem = styled(TreatmentItem)`
width: 100px;
height: 20px;
margin: 5px;
display: flex;
justify-content: center;
cursor: pointer;

`
const AssistentItem = styled(DentistItem)`
`


const AddNewAppointmentForm = ({ open, close }) => {
    const dispatch = useDispatch()
    const allClients = useSelector(state => state.clients)
    const allDentists = useSelector(state => state.dentists)
    const allAssistents = useSelector(state => state.assistents)
    const allAppointments = useSelector(state => state.allAppointments)
    const [currentClientName, setCurrentClientName] = useState("-")
    const [treatmentType, setTreatmentType] = useState("-")
    const [correctDentistIDs, setCorrectDentistIDs] = useState([])
    const [activeStep, setActiveStep] = useState(0)
    const [newAppointmentInfo, setNewAppointmentInfo] = useState({})

    useEffect(() => {
        setNewAppointmentInfo({
            dentistID: "",
            clientID: "",
            assistentID: "",
            time: "",
            dayNumber: "",
        });
        setTreatmentType("-")
        setCurrentClientName("-")
    }, [close])

    const handleClose = () => {
        close()
        setActiveStep(0)
    }

    const handleNext = () => setActiveStep(prevStep => prevStep + 1)
    const handleBack = () => setActiveStep(prevStep => prevStep - 1)


    const handleCurrentClient = (e, i) => {
        setCurrentClientName(e.firstName + e.surName)
        const currentClientID = allClients.find(el => el.firstName === e.firstName && el.surName === e.surName).id
        setNewAppointmentInfo({ ...newAppointmentInfo, clientID: currentClientID })
    }

    const ClientListItem = allClients.map((e, i) =>
        <ClientListItems key={i} onClick={() => handleCurrentClient(e, i)}
            bg={e.firstName + e.surName === currentClientName ? `#7866D5` : `white`}
            color={e.firstName + e.surName === currentClientName ? `white` : `black`}
        >
            {e.firstName + e.surName},{" "}{e.birthYear}
        </ClientListItems>
    )



    //TreatmentOptions 
    const TreatmentOptions = ["Gaatjes Vullen", "Tanden Trekken", "Kroon Zetten", "Kaakchirurgie"]
    const TreatmentItems = TreatmentOptions.map((e, i) =>
        <TreatmentItem
            key={i}
            onClick={() => handleTreatmentType(e, i)}
            bg={e === treatmentType ? `#7866D5` : `white`}
            color={e === treatmentType ? `white` : `black`}
        >
            <TextListItem variant="subtitle2">
                {e === treatmentType && <IconCheck />}
                {e}
            </TextListItem>
        </TreatmentItem>)

    const handleTreatmentType = (e, i) => {
        setTreatmentType(e);
        const currentTreatmentType = e.toString();
        const correctDentistTreatmentIDs = allDentists.filter(e => e.treatmentType === currentTreatmentType).map(e => e.id);
        setCorrectDentistIDs(correctDentistTreatmentIDs);
    }


    //Dentist Options 
    const FindDentistNameByID = (dentistID) => {
        const correctDentist = allDentists.find(e => e.id === dentistID)
        return correctDentist.firstName + correctDentist.surName
    }
    const Dentistoptions = correctDentistIDs.map((e, i) =>
        <DentistItem key={i} onClick={() => handleDentist(e, i)}
            bg={e === newAppointmentInfo.dentistID ? `#7866D5` : `white`}
            color={e === newAppointmentInfo.dentistID ? `white` : `black`}
        >
            <TextListItem variant="subtitle2">
                {e === newAppointmentInfo.dentistID && <IconCheck />}
                {FindDentistNameByID(e)}
            </TextListItem>
        </DentistItem>
    )
    const handleDentist = (e, i) => {
        setNewAppointmentInfo({ ...newAppointmentInfo, dentistID: e });
    }

    //DayNumber Options
    const allDays = ["Ma", "Di", "Wo", "Do", "Vr"]
    const allDaynumbers = [1, 2, 3, 4, 5, "6", "7", 8, 9, 10, 11, 12, "13", "14", 15, 16, 17, 18, 19, "20", "21", 22, 23, 24, 25, 26, "27", "28"]
    const filteredWeekDays = (allDaynumbers.filter(e => typeof e !== 'string'))
    const handleDayNumber = (dayNumber, i) => setNewAppointmentInfo({ ...newAppointmentInfo, dayNumber: dayNumber });


    const allDayNames = allDays.map((dayNumber, i) => <DayText key={i}>{dayNumber}</DayText>)
    const dayNumbers = filteredWeekDays.map((e, i) =>
        <DayNumber
            key={i}
            bg={e === newAppointmentInfo.dayNumber ? `#7866D5` : `white`}
            color={e === newAppointmentInfo.dayNumber ? `white` : `black`}
            onClick={() => handleDayNumber(e, i)}>
            {e}
        </DayNumber>
    )

    //TIME OPTIONS
    const allTimeZones = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    const currentTimeAppointments = allAppointments.filter(e => e.dentistID === newAppointmentInfo.dentistID &&
        e.dayNumber === newAppointmentInfo.dayNumber
    ).map(e => e.time)
    const newAvaiableTimeZones = allTimeZones.filter(e => !currentTimeAppointments.includes(e));
    const AvailableTimeZones = newAvaiableTimeZones.map((e, i) =>
        <TimeItem key={i} onClick={() => handleTimeZone(e, i)}
            bg={e === newAppointmentInfo.time ? `#7866D5` : `white`}
            color={e === newAppointmentInfo.time ? `white` : `black`}>
            <TextListItem variant="subtitle2">
                {e}
            </TextListItem>
        </TimeItem>)
    const handleTimeZone = (e, i) => setNewAppointmentInfo({ ...newAppointmentInfo, time: e });

    //ASSISTENT OPTIONS
    const NotAvailableAssistentIDs = allAppointments
        .filter(e => e.time === newAppointmentInfo.time &&
            e.dayNumber === newAppointmentInfo.dayNumber &&
            e.assistentID !== newAppointmentInfo.assistentID)
        .map(e => e.assistentID).filter(e => e !== null)

    const AllAssistentIDs = allAssistents.map(e => e.id)
    const AvailableAssistentIDs = AllAssistentIDs.filter(e => !NotAvailableAssistentIDs.includes(e));
    const AssistentNameFromID = id => allAssistents.filter(e => e.id === id).map(e => e.firstName + " " + e.surName)

    const AssistentItems = AvailableAssistentIDs.map((e, i) =>
        <AssistentItem
            key={i}
            onClick={() => handleAssistent(e, i)}
            bg={e === newAppointmentInfo.assistentID ? `#7866D5` : `white`}
            color={e === newAppointmentInfo.assistentID ? `white` : `black`}
        >
            <TextListItem variant="subtitle2">
                {e === newAppointmentInfo.assistentID && <IconCheck />}
                {AssistentNameFromID(e)}
            </TextListItem>
        </AssistentItem>)

    const NoAssistent = <AssistentItem onClick={() => setNewAppointmentInfo({ ...newAppointmentInfo, assistentID: null })}
        bg={newAppointmentInfo.assistentID === null ? `#7866D5` : `white`}
        color={newAppointmentInfo.assistentID === null ? `white` : `black`}
    >
        <TextListItem variant="subtitle2" align="center">
            {newAppointmentInfo.assistentID === null && <IconCheck />}
        Geen Assistent
        </TextListItem>
    </AssistentItem>

    const handleAssistent = (e, i) => setNewAppointmentInfo({ ...newAppointmentInfo, assistentID: e });

    //ADD NEW APPOINTMENT (DISPATCH)
    const AddNewAppointment = () => {
        handleClose()
        dispatch(addNewAppointment(newAppointmentInfo))
    }

    //STEPPER CONTENT   
    const getStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return <MainContainer>
                    <CurrentClientContainer ><IconPerson />{currentClientName}</CurrentClientContainer>
                    <TextListItem variant="subtitle1" align="center">Kies Client:</TextListItem>
                    <Container>{ClientListItem}</Container>
                    {currentClientName !== "-" && <NextButton onClick={handleNext}>Volgende</NextButton>}
                </MainContainer >
            case 1:
                return <MainContainer>
                    <TextListItem variant="subtitle1" align="center">Kies Behandeling:</TextListItem>
                    <Container>{TreatmentItems}</Container>
                    <ButtonContainer>
                        <PrevButton onClick={handleBack}>Vorige</PrevButton>
                        {treatmentType !== "-" && <NextButton onClick={handleNext}>Volgende</NextButton>}
                    </ButtonContainer>
                </MainContainer >
            case 2:
                return <MainContainer>
                    <TextListItem variant="subtitle1" align="center">Kies Tandarts:</TextListItem>
                    <Container>{Dentistoptions}</Container>
                    <ButtonContainer>
                        <PrevButton onClick={handleBack}>Vorige</PrevButton>
                        {newAppointmentInfo.dentistID !== "" && <NextButton onClick={handleNext}>Volgende</NextButton>}
                    </ButtonContainer>
                </MainContainer >
            case 3:
                return <MainContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Dag:</TextListItem>
                    <DayContainer>
                        <DayHeader>{allDayNames}</DayHeader>
                        <DayNumberContainer>{dayNumbers}</DayNumberContainer>
                    </DayContainer>
                    <ButtonContainer>
                        <PrevButton onClick={handleBack}>Vorige</PrevButton>
                        {newAppointmentInfo.dayNumber !== "" && <NextButton onClick={handleNext}>Volgende</NextButton>}
                    </ButtonContainer>
                </MainContainer >
            case 4:
                return <MainContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Tijdstip:</TextListItem>
                    <TimeContainer>
                        {AvailableTimeZones}
                    </TimeContainer>
                    <ButtonContainer>
                        <PrevButton onClick={handleBack}>Vorige</PrevButton>
                        {newAppointmentInfo.time !== "" && <NextButton onClick={handleNext}>Volgende</NextButton>}
                    </ButtonContainer>
                </MainContainer >
            case 5:
                return <MainContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Assistent:</TextListItem>
                    <Container>
                        {NoAssistent}
                        {AssistentItems}
                    </Container>
                    <ButtonContainer>
                        <PrevButton onClick={handleBack}>Vorige</PrevButton>
                        {newAppointmentInfo.assistentID !== "" && <NextButton secondary onClick={AddNewAppointment}>Inplannen</NextButton>}
                    </ButtonContainer>
                </MainContainer >
            default:
                return
        }
    }


    return <div><DialogContainer open={open}>
        <DialogContentContainer>
            <CloseIconContainer>
                <IconClose onClick={handleClose} />
            </CloseIconContainer>
            <DialogHeader>
                <TextListItem variant="h6" align="center">Nieuwe Afspraak</TextListItem>
            </DialogHeader>
            {getStepContent(activeStep)}
        </DialogContentContainer>
    </DialogContainer>
    </div>
}

export default AddNewAppointmentForm

