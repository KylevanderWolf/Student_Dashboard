import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux';
import styled from "styled-components";
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import { Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CloseIcon from '@material-ui/icons/Close';
import AddDentistForm from '../Components/AddDentistForm'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import { makeDentistSick } from '../Actions/DentistActions'
import { deleteAppointment } from '../Actions/AppointmentActions'
import ChangeAppointmentForm from '../Components/ChangeAppointmentForm'
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
const DentistCard = styled.div`
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
const DentistInfo = styled.div`
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
width: 100%;
display: flex;
justify-content: space-around;
`
const Button = styled.button`
cursor: pointer; 
outline: none;
border: none;
padding: 10px;
border-radius: 5px;
margin: 10px;
background-color: ${props => props.primary ? `#D40146` : `#7866D5`};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
color: white;
display: flex;
justify-content: center;
align-items: center;
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
const TotalDentists = styled.div`
    width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
  margin-bottom: 10px;
`
const AllDentistCards = styled.div`
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
width: 320px;
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
height: 60vh;
overflow-y: scroll;
display: flex;
justify-content: flex-start;
align-items: center;
flex-direction: column;
margin: 0px;
padding: 10px;
`
const DentistAppointmentItem = styled.div`
height: auto;
padding: 10px;
display: flex;
justify-content: column;
background-color: white;
border: ${props => props.borderColor};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
margin: 10px 0px;
`
const DentistAppointmentInfoContainer = styled.div`
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

const IconCheck = styled(EventAvailableIcon)`
&&{
    font-size: 1.5em;
    margin-right: 8px;
}
`
const NotAvailableIcon = styled(EventBusyIcon)`
&&{
    font-size: 1.5em;
    margin-right: 8px;
}
`
const AvailableButton = styled(Button)`
color: black;
background-color: white;
border: ${props => props.borderColor};
`
const DeleteButton = styled(Button)`
margin-top: 20px;
`
const EditButton = styled(DeleteButton)``

const AllDentists = () => {
    const dispatch = useDispatch()
    const allAssistents = useSelector(state => state.assistents)
    const allDentist = useSelector(state => state.dentists)
    const allClients = useSelector(state => state.clients)
    const allAppointments = useSelector(state => state.allAppointments)
    const [filteredDentistArray, setFilteredDentistArray] = useState(allDentist)
    const [open, setOpen] = useState(false)
    const [openNewDentistForm, setNewOpenDentistForm] = useState(false)
    const [daySteps, setDaySteps] = useState(1)
    const [dentistName, setDentistName] = useState("")
    const [correctDentist, setCorrectDentist] = useState({})
    const [dentistAppointments, setDentistApppointments] = useState([])
    const [dentistTreatmentType, setDentistTreatmentType] = useState("")
    const [oldAppointment, setOldAppointment] = useState(undefined)
    const [openAppointmentForm, setOpenAppointmentForm] = useState(false)
    const [dentistID, setDentistID] = useState()
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
        const FilteredDentistArray = allDentist.filter(e =>
            e.firstName.toLowerCase().includes(nameValue.firstName) &&
            e.surName.toLowerCase().includes(nameValue.surName)
        )
        setFilteredDentistArray(FilteredDentistArray)
    }, [nameValue])


    const showAppointments = (dentistInfo, i) => {
        setOpen(!open)
        setDentistName(dentistInfo.firstName + dentistInfo.surName)
        setDentistTreatmentType(dentistInfo.treatmentType)
        setDentistID(dentistInfo.id)
        setCorrectDentist(dentistInfo)
        setDaySteps(1)
        setDentistApppointments(allAppointments.filter(e => e.dentistID === dentistInfo.id && e.dayNumber === daySteps))
    }

    const handleBackDay = () => daySteps === 1 ? setDaySteps(28) : setDaySteps(prevDay => prevDay - 1)
    const handleNextDay = () => daySteps === 28 ? setDaySteps(1) : setDaySteps(prevDay => prevDay + 1)

    const FindAppointmentsByDayNumberAndID = (dayNumber, ID) => {
        const correctAppointments = allAppointments.filter(e => e.dentistID === ID && e.dayNumber === dayNumber)
        return setDentistApppointments(correctAppointments)
    }

    useEffect(() => {
        FindAppointmentsByDayNumberAndID(daySteps, dentistID)
    }, [allAppointments.length])

    const FindAssistentNameFromID = (assitentID) => {
        const correctAssistent = allAssistents.find(e => e.id === assitentID)
        return correctAssistent !== undefined ? correctAssistent.firstName + correctAssistent.surName : "Geen Assistent"
    }

    const FindClientFormClientID = (clientID) => {
        const correctClient = allClients.find(e => e.id === clientID)
        return correctClient.firstName + correctClient.surName
    }


    useEffect(() => {
        FindAppointmentsByDayNumberAndID(daySteps, dentistID)
    }, [daySteps])


    const openDentistForm = () => {
        setNewOpenDentistForm(true)
    }

    const closeDialog = () => {
        setOpen(false)
        setNewOpenDentistForm(false)
    }

    useEffect(() => {
        setFilteredDentistArray(allDentist)
    }, [allDentist.length])


    const setDentistAvailable = (dentistInfo, i) => {
        dispatch(makeDentistSick(dentistInfo.id))
    }

    const availableText = (dentistInfo, i) => {
        return dentistInfo.sick === false ? "Aanwezig" : "Afwezig"
    }

    const EditAppointment = (e, i) => {
        setOpenAppointmentForm(true)
        setOpen(false)
        setOldAppointment(e)
    }

    const closeAppointmentForm = () => {
        setOpenAppointmentForm(false)
    }

    const allDentistAppointments = dentistAppointments.sort((a, b) => (a.time > b.time) ? 1 : -1)
        .map((e, i) => <DentistAppointmentItem key={e, i}
            borderColor={correctDentist.sick === false ? `2px solid #90E57E` : `2px solid red`}>
            <div>
                <TextListItem variant="subtitle2" gutterBottom>Tijdstip: {e.time}</TextListItem>
                <DentistAppointmentInfoContainer>
                    <TextListItem variant="subtitle2" gutterBottom>Cliënt: {FindClientFormClientID(e.clientID)}</TextListItem>
                    <TextListItem variant="subtitle2" gutterBottom>Assistent: {FindAssistentNameFromID(e.assistentID)}</TextListItem>
                    <TextListItem variant="subtitle2" gutterBottom>Behandeling: {dentistTreatmentType}</TextListItem>
                </DentistAppointmentInfoContainer>
                <ButtonContainer>
                    <DeleteButton primary onClick={() => dispatch(deleteAppointment(e))}>Verwijder</DeleteButton>
                    <EditButton onClick={() => EditAppointment(e, i)}>Wijzig</EditButton>
                </ButtonContainer>
            </div>

        </DentistAppointmentItem>)



    //Info Cards from DentistList
    const allDentistInfo = filteredDentistArray.map((dentistInfo, i) =>
        <DentistCard key={dentistInfo.id}>
            <CardHeader>
                <TextListItem variant="h6" gutterBottom>{dentistInfo.firstName}{" "}{dentistInfo.surName}</TextListItem>
                <TextListItem variant="subtitle1" gutterBottom>{dentistInfo.treatmentType}</TextListItem>
            </CardHeader>
            <DentistInfo>
                <TextListItem variant="subtitle2" gutterBottom><IconMail /> {dentistInfo.email}</TextListItem>
                <TextListItem variant="subtitle2" gutterBottom><IconPhone />{dentistInfo.phoneNumber} </TextListItem>
            </DentistInfo>
            <ButtonContainer>
                <Button onClick={() => showAppointments(dentistInfo, i)}>Agenda</Button>
                <AvailableButton onClick={() => setDentistAvailable(dentistInfo, i)}
                    borderColor={dentistInfo.sick === false ? `2px solid #90E57E` : `2px solid red`}
                >
                    {dentistInfo.sick === false ? <IconCheck /> : <NotAvailableIcon />}
                    {availableText(dentistInfo, i)}
                </AvailableButton>
            </ButtonContainer>
        </DentistCard >
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

        <TotalDentists>
            <TextListItem align="center" variant="h6" gutterBottom>Tandartsen ({filteredDentistArray.length})</TextListItem>
            <Button onClick={openDentistForm}>Tandarts Toevoegen</Button>
        </TotalDentists>

        <AllDentistCards>
            {allDentistInfo}
        </AllDentistCards>

        <DialogContainer open={open} >
            <DialogContentContainer>
                <CloseIconContainer>
                    <IconClose onClick={closeDialog} />
                </CloseIconContainer>
                <DialogHeader>
                    <TextListItem variant="h6" align="center">{dentistName}</TextListItem>
                    <TextListItem variant="subtitle1" gutterBottom>Tandarts</TextListItem>
                    <TextListItem variant="subtitle2" gutterBottom>{correctDentist.sick === false ? "(Aanwezig)" : "(Afwezig)"}</TextListItem>
                </DialogHeader>
                <DayStepperContainer>
                    <LeftArrow onClick={handleBackDay} />
                    Dag {daySteps}
                    <RightArrow onClick={handleNextDay} />
                </DayStepperContainer>
                <AppointmentsContainer>
                    {allDentistAppointments.length === 0 ? "Geen Afspraken" : allDentistAppointments}
                </AppointmentsContainer>
            </DialogContentContainer>
        </DialogContainer>
        <AddDentistForm open={openNewDentistForm} close={closeDialog} />
        <ChangeAppointmentForm open={openAppointmentForm} close={closeAppointmentForm} changeAppointmentInfo={oldAppointment} />
    </MainContainer>



}


export default AllDentists