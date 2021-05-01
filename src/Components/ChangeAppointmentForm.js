import React, { useState, useEffect } from 'react'
import Dialog from '@material-ui/core/Dialog';
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { changeAppointment } from "../Actions/AppointmentActions"

//STYLING
const DialogContainer = styled(Dialog)``

const DialogContent = styled.div`
width: 320px;
min-height: 60vh;
max-height: auto;
background-color: white;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
padding: 10px;
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
const Header = styled.header`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const AppointmentInfoContainer = styled.div`
height: auto;
padding: 10px;
display: flex;
min-height: 40vh;
max-height: auto;
flex-direction: column;
align-items: flex-start;
`
const TextListItem = styled(Typography)`
display: flex;
align-items: center;
`
const Button = styled.button`
cursor: pointer;
outline: none;
border: none;
padding: 10px;
min-width: 100px;
border-radius: 5px;
margin: 10px 0px;
display:flex;
justify-content: center;
align-items: center;
background-color: ${props => props.bg};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
color: black;
transition: 0.2s ease-in-out;
&:hover{
  box-shadow: none;
  background-color: #7866D5;
  color: white;
  border-radius: 7px;
}
&:focus{
    background-color: #7866D5;
    color: white;
}
`
const ToggleButton = styled.button`
outline: none;
border: none;
cursor: pointer;
padding: 10px;
width: 100px;
background-color: ${props => props.bg};
border-bottom: 2px solid #a2a2a2;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
color: white;
border-radius: 5px;
display: ${props => props.display};
&:hover{
    background-color: #7866D5;
    color: white;
    box-shadow: none;
}
`
const ButtonContainer = styled.div`
width: 100%;
height: auto;
padding: 10px 0px;
margin: 0px;
background-color: white;
margin-top: 10px;
display: flex;
justify-content: space-around;
align-items: center;
`
const MainContainer = styled.div`
min-height: 40vh;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
width: 100%;
margin: 0px;
padding: 0px;
`
const SelectTreatmentContainer = styled.div`
height: auto;
display: flex;
width: 100%;
justify-content: space-around;
flex-direction: column;
padding: 10px;
`
const Item = styled.button`
&&{
    padding: 10px;
    cursor: pointer;
    background-color: ${props => props.bg};
    border-radius: 5px;
    box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
    margin: 10px 0px;
    border: 1px solid transparent;
    display: flex;
    outline: none;
    align-items: center;
    justify-content: flex-start;
    color: ${props => props.color};
    &:hover {
        box-shadow: none;
        background-color: #7866D5;
        border: 1px solid #a2a2a2;
        color: white;
    }
}
`
const CheckedIcon = styled(CheckIcon)`
    color: white;
    margin-right: 20px;
`
const DayContainer = styled.div`
    width: 320px;
    min-height: 320px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
`
const DayHeader = styled.div`
    width: 320px;   
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
    width: 320px;
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
const TimeContainer = styled.div`
display: flex;
flex-direction: column;
`
const TimeOptionsContainer = styled.div`
height: auto;
padding: 10px;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
`
const TimeItem = styled(Button)`
margin: 10px;
background-color: white;
background-color: ${props => props.bg};
color: ${props => props.color};
`
const AssistentContainer = styled(TimeContainer)`
flex-direction: column;
`
const AssistentItem = styled(TimeItem)`
min-width: 200px;
`
const NewAppointmentContainer = styled.div`
align-items: center;
justify-content: center;
border: 2px solid #7866D5;
margin: 0px;
padding: 10px;
border-radius: 5px;
background-color: white;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const NewAppointmentInfo = styled(SelectTreatmentContainer)`

`

const AppointmentForm = ({ open, close, changeAppointmentInfo }) => {
    const dispatch = useDispatch()
    const allClients = useSelector(state => state.clients)
    const allDentist = useSelector(state => state.dentists)
    const allAssistents = useSelector(state => state.assistents)
    const allAppointments = useSelector(state => state.allAppointments)
    const [clientName, setClientName] = useState()
    const [activeStep, setActiveStep] = useState(0);
    const [treatmentType, setTreatmentType] = useState()
    const [currentDentistName, setCurrentDentistName] = useState()
    const allDays = ["Ma", "Di", "Wo", "Do", "Vr"]
    const allDaynumbers = [1, 2, 3, 4, 5, "6", "7", 8, 9, 10, 11, 12, "13", "14", 15, 16, 17, 18, 19, "20", "21", 22, 23, 24, 25, 26, "27", "28"]
    const filteredWeekDays = (allDaynumbers.filter(e => typeof e !== 'string'))
    const [newChangeAppointmentInfo, setNewChangeAppointmentInfo] = useState({
        dentistID: "",
        clientID: "",
        assistentID: "",
        time: "",
        dayNumber: ""
    })


    useEffect(() => {
        if (changeAppointmentInfo !== undefined) {
            setNewChangeAppointmentInfo(changeAppointmentInfo);
            const correctDentist = allDentist.find(e => e.id === changeAppointmentInfo.dentistID);
            setTreatmentType(correctDentist.treatmentType);
            const dentistName = correctDentist.firstName + correctDentist.surName
            setCurrentDentistName(dentistName)
            const currentClient = allClients.find(e => e.id === changeAppointmentInfo.clientID)
            const currentClientName = currentClient.firstName + currentClient.surName
            setClientName(currentClientName)
        } return
    }, [changeAppointmentInfo])


    //TREATMENT OPTIONS
    const TreatmentOptions = ["Gaatjes Vullen", "Tanden Trekken", "Kroon Zetten", "Kaakchirurgie"]
    const TreatmentItems = TreatmentOptions.map((e, i) => <Item key={i} onClick={() => handleClickTreatment(e, i)}
        bg={e === treatmentType ? `#7866D5` : `white`}
        color={e === treatmentType ? `white` : `black`}>
        {e === treatmentType && <CheckedIcon />}
        <TextListItem variant="subtitle2">{e}</TextListItem>
    </Item>)
    const handleClickTreatment = (treatmenttype, i) => {
        setTreatmentType(treatmenttype)
        const dentistTreatmentIDs = allDentist.filter(e => e.treatmentType === treatmenttype).map(e => e.id)
        dentistTreatmentIDs.includes(changeAppointmentInfo.dentistID) ? setNewChangeAppointmentInfo(changeAppointmentInfo) :
            setNewChangeAppointmentInfo({
                dentistID: "",
                clientID: changeAppointmentInfo.clientID,
                assistentID: "",
                time: "",
                dayNumber: ""
            })
    }



    //DENTIST OPTIONS
    const changeDentistID = (dentistName) => {
        const correctDentistID = allDentist.find(e => e.firstName + e.surName === dentistName).id
        setCurrentDentistName(dentistName)
        correctDentistID !== changeAppointmentInfo.dentistID ? setNewChangeAppointmentInfo({
            ...newChangeAppointmentInfo,
            dentistID: correctDentistID,
            assistentID: "",
            time: "",
            dayNumber: ""
        }) : setNewChangeAppointmentInfo(changeAppointmentInfo)
    }
    const correctDentistWithTreatment = allDentist.filter(e => e.treatmentType === treatmentType)
    const correctDentistNames = correctDentistWithTreatment.map(e => e.firstName + e.surName)
    const dentistName = correctDentistNames.map((dentistName, i) =>
        <Item
            key={i}
            onClick={() => changeDentistID(dentistName)}
            bg={currentDentistName === dentistName ? `#7866D5` : `white`}
            color={currentDentistName === dentistName ? `white` : `black`}>
            {currentDentistName === dentistName && <CheckedIcon />}
            <TextListItem variant="subtitle2"> {dentistName}</TextListItem>
        </Item >
    )

    //DAYS OPTION 
    const handleDayNumber = (dayNumber, i) => {
        changeAppointmentInfo.dayNumber === dayNumber ?
            setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, dayNumber: dayNumber, time: changeAppointmentInfo.time }) :
            setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, dayNumber: dayNumber, time: "" })
    }

    const allDayNames = allDays.map((dayNumber, i) => <DayText key={i}>{dayNumber}</DayText>)
    const dayNumbers = filteredWeekDays.map((e, i) =>
        <DayNumber key={i}
            bg={e === newChangeAppointmentInfo.dayNumber ? `#7866D5` : `white`}
            color={e === newChangeAppointmentInfo.dayNumber ? `white` : `black`}
            onClick={() => handleDayNumber(e, i)}>
            {e}
        </DayNumber>
    )


    //TIME OPTIONS
    const allTimeZones = ["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"]
    const correctDentistSchedule = allAppointments
        .filter(e => e.dentistID === newChangeAppointmentInfo.dentistID &&
            e.dayNumber === newChangeAppointmentInfo.dayNumber)
        .map(e => e.time)
    const newAvaiableTimeZones = allTimeZones.filter(e => !correctDentistSchedule.includes(e));
    const handleTime = (e, i) => e === changeAppointmentInfo.time ?
        setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, time: e, assistentID: changeAppointmentInfo.assistentID }) :
        setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, time: e, assistentID: "" })
    const TimeItems = newAvaiableTimeZones.map((e, i) =>
        <TimeItem
            key={i}
            onClick={() => handleTime(e, i)}
            bg={e === newChangeAppointmentInfo.time ? `#7866D5` : `white`}
            color={e === newChangeAppointmentInfo.time ? `white` : `black`}>
            {e}
        </TimeItem>)




    //ASSISTENT OPTIONS 
    const allAssistentIDs = allAssistents.map(e => e.id)
    const NotAvailableAssistentIDs = allAppointments
        .filter(e => e.time === newChangeAppointmentInfo.time &&
            e.dayNumber === newChangeAppointmentInfo.dayNumber &&
            e.assistentID !== changeAppointmentInfo.assistentID &&
            changeAppointmentInfo.assistentID !== null)
        .map(e => e.assistentID)

    const availableAssistentIDs = allAssistentIDs.filter(e => NotAvailableAssistentIDs.indexOf(e) === -1)
    const AssistentNameFromID = id => allAssistents.filter(e => e.id === id).map(e => e.firstName + e.surName)
    const changeAssistent = id => setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, assistentID: id })
    const allAssistentItems = availableAssistentIDs.map((id, i) =>
        <AssistentItem key={i}
            onClick={() => changeAssistent(id, i)}
            bg={id === newChangeAppointmentInfo.assistentID ? `#7866D5` : `white`}
            color={id === newChangeAppointmentInfo.assistentID ? `white` : `black`}
        >
            {id === newChangeAppointmentInfo.assistentID && <CheckedIcon />}
            {AssistentNameFromID(id)}
        </AssistentItem>
    )

    const NoAssistentOption = <AssistentItem onClick={() => setNewChangeAppointmentInfo({ ...newChangeAppointmentInfo, assistentID: null })}
        bg={newChangeAppointmentInfo.assistentID === null ? `#7866D5` : `white`}
        color={newChangeAppointmentInfo.assistentID === null ? `white` : `black`}>
        {newChangeAppointmentInfo.assistentID === null && <CheckedIcon />}
        Geen Assistent
        </AssistentItem>

    //NEW APPOINTMNET INFO
    const [newDentistName, setNewDentistName] = useState("")
    const [newTreatmentType, setNewTreatmentType] = useState("")
    const [newAssistentName, setNewAssistentName] = useState("")
    useEffect(() => {
        const currentDentist = allDentist.find(e => newChangeAppointmentInfo.dentistID !== "" && e.id === newChangeAppointmentInfo.dentistID)
        currentDentist !== undefined && setNewDentistName(currentDentist.firstName + currentDentist.surName);
        currentDentist !== undefined && setNewTreatmentType(currentDentist.treatmentType);
        const currentAssistent = allAssistents.find(e => e.id === newChangeAppointmentInfo.assistentID);
        currentAssistent !== undefined && setNewAssistentName(currentAssistent.firstName + currentAssistent.surName)
        newChangeAppointmentInfo.assistentID === null && setNewAssistentName("Geen Assistent")
    }, [newChangeAppointmentInfo])

    const AppointmentInfo = <NewAppointmentContainer>
        <NewAppointmentInfo>
            <TextListItem variant="subtitle1">Cliënt: {clientName}</TextListItem>
            <TextListItem variant="subtitle1">Dagnummer: {newChangeAppointmentInfo.dayNumber}</TextListItem>
            <TextListItem variant="subtitle1">Tijdstip: {newChangeAppointmentInfo.time}</TextListItem>
            <TextListItem variant="subtitle1">Behandeling: {newTreatmentType}</TextListItem>
            <TextListItem variant="subtitle1">Tandarts: {newDentistName}</TextListItem>
            <TextListItem variant="subtitle1">Assistent: {newAssistentName}</TextListItem>
        </NewAppointmentInfo>
    </NewAppointmentContainer>


    //STEPPER CONTENT   
    const getStepContent = (activeStep) => {
        switch (activeStep) {
            case 0:
                return <SelectTreatmentContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Behandeling:</TextListItem>
                    {TreatmentItems}
                </SelectTreatmentContainer>

            case 1:
                return <SelectTreatmentContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Tandarts:</TextListItem>
                    {dentistName}
                </SelectTreatmentContainer>;
            case 2:
                return <DayContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Dag:</TextListItem>
                    <DayHeader>{allDayNames}</DayHeader>
                    <DayNumberContainer>{dayNumbers}</DayNumberContainer>
                </DayContainer>
            case 3:
                return <TimeContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Tijdstip:</TextListItem>
                    <TimeOptionsContainer>
                        {newAvaiableTimeZones.length !== 0 ? TimeItems : "Geen Beschikbaren Tijden Aanwezig (Kies een andere Dag)"}
                    </TimeOptionsContainer>
                </TimeContainer>

            case 4:
                return <AssistentContainer>
                    <TextListItem variant="subtitle1" gutterBottom>Kies Assistent:</TextListItem>
                    {NoAssistentOption}
                    {allAssistentItems}
                </AssistentContainer>
            case 5:
                return <NewAppointmentInfo>
                    <TextListItem variant="subtitle1" gutterBottom>Afspraak Gegevens:</TextListItem>
                    {AppointmentInfo}
                </NewAppointmentInfo>
            default:
                return
        }
    }

    //NEXT AND BACK BUTTONS && DISPATCH
    const [contentButton, setContentButton] = useState("Volgende")
    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        activeStep === 4 ? setContentButton("Wijzigen") : setContentButton("Volgende");
        activeStep === 5 && dispatch(changeAppointment({
            oldAppointmentInfo: changeAppointmentInfo,
            newAppointmentInfo: newChangeAppointmentInfo
        }))
        activeStep === 5 && handleClose();
    }

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
        activeStep !== 5 ? setContentButton("Volgende") : setContentButton("Wijzigen")
        activeStep === 5 && setContentButton("Volgende")
    };

    //CLOSE DIALOG
    const handleClose = () => {
        close();
        setActiveStep(0)
    }

    return <DialogContainer
        open={open}>
        <DialogContent>
            <CloseIconContainer>
                <IconClose onClick={handleClose} />
            </CloseIconContainer>

            <Header>
                <TextListItem variant="h6">Afspraak</TextListItem>
                <TextListItem variant="subtitle1" gutterBottom>{clientName}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>(Wijzigen)</TextListItem>
            </Header>

            <AppointmentInfoContainer>
                <MainContainer>
                    {getStepContent(activeStep)}
                </MainContainer>
                <ButtonContainer>
                    <ToggleButton
                        onClick={handleBack}
                        disabled={activeStep === 0}
                        display={activeStep === 0 ? `none` : 'block'}
                        bg={`#7866D5`}
                    >Terug
                    </ToggleButton>
                    <ToggleButton
                        onClick={handleNext}
                        disabled={(activeStep === 1 && newChangeAppointmentInfo.dentistID === "") ||
                            (activeStep === 2 && newChangeAppointmentInfo.dayNumber === "") ||
                            (activeStep === 3 && newChangeAppointmentInfo.time === "") ||
                            (activeStep === 4 && newChangeAppointmentInfo.assistentID === "")}
                        bg={activeStep === 5 ? `#D40146` : `#7866D5`}
                    >{contentButton}
                    </ToggleButton>
                </ButtonContainer>
            </AppointmentInfoContainer>
        </DialogContent>
    </DialogContainer >
}


export default AppointmentForm