import React, { useState, useEffect } from "react"
import { useSelector } from 'react-redux';
import styled from "styled-components";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import AddAssistentForm from '../Components/AddAssistentForm'
import Appbar from '../Components/Appbar'

//STYLING
const MainContainer = styled.div`
height: auto; 
width: auto;
display: flex;
flex-wrap: wrap;
background-color: white;
margin: 0px;
justify-content: center;
align-items: center;
padding: 10px;
`
const AssistentCard = styled.div`
padding: 10px;
margin: 10px;
background-color: white;
border-radius: 10px;
display: flex;
width: 320px;
align-items: center;
justify-content: space-between;
flex-wrap: wrap;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
border: 1px solid #a2a2a2;
`
const CardHeader = styled.header`
width: 100%;
padding: 10px;
height: auto;
background-color: white;
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: center;
`
const AssistentInfo = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
margin-bottom: 10px;
margin: 0;
padding: 0;
width: 300px;
background-color: white;
`
const IconMail = styled(MailIcon)`
  margin-right: 10px;
display: flex;
color: #a2a2a2;
`
const IconPhone = styled(PhoneIcon)`
margin-right: 10px;
display: flex;
color: #a2a2a2;
`
const TextListItem = styled(Typography)`
display: flex;
align-items: center;
padding: 0px 5px;
height: auto;
overflow-wrap: break-word;
`
const ButtonContainer = styled.div`
margin-top: 15px;
width: 100%;
`
const Button = styled.button`
cursor: pointer; 
outline: none;
border: none;
padding: 10px;
border-radius: 5px;
background-color: ${props => props.primary ? `#D40146` : `#7866D5`};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
color: white;
&:hover{
  box-shadow: none;
}
`
const InputContainer = styled.div`
width: 100%;
margin-bottom: 30px;
display: flex;
justify-content: center;
align-items: center;
margin-top: 20px;
flex-wrap: wrap;
`
const IconSearch = styled(SearchIcon)`
margin-right: 10px;
color: #a2a2a2;
`
const NameInputField = styled.input`
  width: auto;
  height: auto;
  padding: 15px;
  border-radius: 10px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border: none;
  outline: none;
  margin: 10px;
  border: 1px solid #a2a2a2;
&:hover {
  box-shadow: none;
}
`
const TotalAssistents = styled.div`
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 10px;
`
const AllClientCards = styled.div`
margin-top: 20px;
padding: 15px;
border-radius: 10px;
width: 100%;
display: flex;
justify-content: center;
flex-wrap: wrap;
`
const DialogContainer = styled(Dialog)`
`
const DialogContentContainer = styled.div`
min-height: 70vh;
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
`
const DayStepperContainer = styled.div`
height: auto;
background-color: white;
display: flex;
justify-content: space-around;
align-items: center;
padding: 5px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin-bottom: 10px;

`
const LeftArrow = styled(ChevronLeftIcon)`
&&{
cursor: pointer;
font-size: 2em;
}
`
const RightArrow = styled(ChevronRightIcon)`
&&{
cursor: pointer;
font-size: 2em;
}
`
const AppointmentsContainer = styled.div`
min-height: 60vh;
max-height: 60vh;
overflow-y: scroll;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
margin: 0;
padding: 10px;
width: 320px;
`
const AssistentAppointmentItem = styled.div`
width: 250px;
height: auto;
padding: 10px;
display: flex;
justify-content: column;
background-color: white;
border: ${props => props.borderColor};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin: 10px 0px;
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

const AllAssistents = () => {
    const allAssistents = useSelector(state => state.assistents)
    const allDentist = useSelector(state => state.dentists)
    const allClients = useSelector(state => state.clients)
    const allAppointments = useSelector(state => state.allAppointments)
    const [filteredAssistentArray, setFilteredAssistentArray] = useState(allAssistents)
    const [open, setOpen] = useState(false)
    const [openNewAssistentForm, setNewOpenAssistentForm] = useState(false)
    const [daySteps, setDaySteps] = useState(1)
    const [assistentName, setAssistentName] = useState("")
    const [assistentAppointments, setAssistentApppointments] = useState([])
    const [assistentID, setAssistentID] = useState()
    const [nameValue, setNameValue] = useState({
        firstName: "",
        surName: "",
    })


    //Input Change Values
    const handleChange = (e) => {
        const { name, value } = e.target
        const LowerCaseName = value.toLowerCase()
        setNameValue({ ...nameValue, [name]: LowerCaseName })
    }

    //Render new AssistentList on Search 
    useEffect(() => {
        const FilteredAssistentArray = allAssistents.filter(e =>
            e.firstName.toLowerCase().includes(nameValue.firstName) &&
            e.surName.toLowerCase().includes(nameValue.surName)
        )
        setFilteredAssistentArray(FilteredAssistentArray)
    }, [nameValue])


    const showAppointments = (assistentInfo, i) => {
        setOpen(!open)
        setAssistentName(assistentInfo.firstName + assistentInfo.surName)
        setDaySteps(1)
        setAssistentID(assistentInfo.id)
        setAssistentApppointments(allAppointments.filter(e => e.assistentID === assistentInfo.id && e.dayNumber === daySteps))
    }

    const handleBackDay = () => daySteps === 1 ? setDaySteps(28) : setDaySteps(prevDay => prevDay - 1)
    const handleNextDay = () => daySteps === 28 ? setDaySteps(1) : setDaySteps(prevDay => prevDay + 1)


    const FindAppointmentsByDayNumberAndID = (dayNumber, ID) => {
        setAssistentApppointments(allAppointments.filter(e => e.assistentID === ID && e.dayNumber === dayNumber))
    }

    const FindDentistNameFromID = (dentistID) => {
        const correctDentist = allDentist.find(e => e.id === dentistID)
        return correctDentist.firstName + correctDentist.surName
    }

    const FindClientFormClientID = (clientID) => {
        const correctClient = allClients.find(e => e.id === clientID)
        return correctClient.firstName + correctClient.surName
    }

    const FindDentistSick = (dentistID) => {
        const dentistSick = allDentist.find(e => e.id === dentistID).sick
        return dentistSick
    }

    const AssistentAppointments = assistentAppointments.sort((a, b) => (a.time > b.time) ? 1 : -1)
        .map((e, i) => <AssistentAppointmentItem key={e, i}
            borderColor={FindDentistSick(e.dentistID) ? `2px solid red` : `2px solid green`}
        >
            <div>
                <TextListItem variant="subtitle2" gutterBottom>Tijdstip: {e.time}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>Tandarts: {FindDentistNameFromID(e.dentistID)}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom>Client: {FindClientFormClientID(e.clientID)}</TextListItem>
            </div>
        </AssistentAppointmentItem>)


    useEffect(() => {
        FindAppointmentsByDayNumberAndID(daySteps, assistentID)
    }, [daySteps])


    const openAssistentForm = () => {
        setNewOpenAssistentForm(true)
    }

    const closeDialog = () => {
        setOpen(false)
        setNewOpenAssistentForm(false)
    }

    useEffect(() => {
        setFilteredAssistentArray(allAssistents)
    }, [allAssistents.length])

    //Info Cards from AssistentList
    const allAssistentInfo = filteredAssistentArray.map((assistentInfo, i) =>
        <AssistentCard key={assistentInfo.id}>
            <CardHeader>
                <TextListItem variant="h6" gutterBottom>{assistentInfo.firstName}{" "}{assistentInfo.surName}</TextListItem>
                <TextListItem variant="subtitle1" gutterBottom>{assistentInfo.treatmentType}</TextListItem>
            </CardHeader>
            <AssistentInfo>
                <TextListItem variant="subtitle2" gutterBottom><IconMail /> {assistentInfo.email}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom><IconPhone />{assistentInfo.phoneNumber} </TextListItem>
            </AssistentInfo>
            <ButtonContainer>
                <Button onClick={() => showAppointments(assistentInfo, i)}>Agenda</Button>
            </ButtonContainer>

        </AssistentCard >
    )
    return <MainContainer>
        <Appbar />
        <InputContainer>
            <IconSearch />
            <NameInputField
                autoComplete="off"
                type="text"
                onChange={handleChange}
                placeholder="Voornaam"
                autoFocus={true}
                value={nameValue.firstName}
                name="firstName"
            />
            <NameInputField
                autoComplete="off"
                type="text"
                onChange={handleChange}
                placeholder="Achternaam"
                autoFocus={false}
                value={nameValue.surName}
                name="surName"
            />
        </InputContainer>

        <TotalAssistents>
            <TextListItem align="center" variant="h6" gutterBottom>Assistenten ({filteredAssistentArray.length})</TextListItem>
            <Button onClick={openAssistentForm}>Assistent Toevoegen</Button>
        </TotalAssistents>

        <AllClientCards>
            {allAssistentInfo}
        </AllClientCards>

        <DialogContainer open={open} onBackdropClick={closeDialog}>
            <DialogContentContainer>
                <CloseIconContainer>
                    <IconClose onClick={closeDialog} />
                </CloseIconContainer>
                <DialogHeader>
                    <TextListItem variant="h6" align="center">{assistentName}</TextListItem>
                    <TextListItem variant="subtitle1" gutterBottom>Assistent</TextListItem>
                </DialogHeader>
                <DayStepperContainer>
                    <LeftArrow onClick={handleBackDay} />
                    Dag {daySteps}
                    <RightArrow onClick={handleNextDay} />
                </DayStepperContainer>
                <AppointmentsContainer>
                    {assistentAppointments.length === 0 ? "Geen Afspraken" : AssistentAppointments}
                </AppointmentsContainer>
            </DialogContentContainer>
        </DialogContainer>

        <AddAssistentForm open={openNewAssistentForm} close={closeDialog} />
    </MainContainer>

}


export default AllAssistents