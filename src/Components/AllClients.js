import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { deleteAppointment } from '../Actions/AppointmentActions'
import ChangeAppointmentForm from '../Components/ChangeAppointmentForm'
import AddClientForm from '../Components/AddClientForm'
import Appbar from '../Components/Appbar'


//STYLING
const ContainerWrapper = styled.div`
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
const InputContainer = styled.div`
width: 100%;
margin-bottom: 30px;
background-color: white;
display: flex;
justify-content: center;
align-items: center;
flex-wrap: wrap;
margin-top: 20px;
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
const TotalClients = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 5px;
`
const Container = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px 0px;
`
const ClientCard = styled.div`
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
justify-content: space-between;
align-items: center;
`
const ClientInfo = styled.div`
width: 100%;
padding: 5px;
display: flex;
flex-direction: column;
align-items: flex-start;
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
padding: 0px 10px;
`
const AppointmentListItem = styled.div`
height: auto;
padding: 10px;
margin: 10px 0px;
display: flex;
flex-direction: column;
background-color: white;
border-radius: 5px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
`
const ButtonContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
margin: 5px 0px;
`
const Button = styled.button`
cursor: pointer; 
outline: none;
border: none;
padding: 12px;
border-radius: 5px;
margin-top: 10px;
margin-bottom: 20px;
background-color: ${props => props.primary ? `#D40146` : `#7866D5`};
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
color: white;
&:hover{
  box-shadow: none;
}
`
const DialogContainer = styled(Dialog)``

const DialogContent = styled.div`
min-width: 320px;
min-height: 60vh; 
overflow-y: auto;
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
const ClientNameHeader = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const AppointmentInfoContainer = styled.div`
min-height: 60vh;
max-height: auto;
padding: 10px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`


const AllClients = () => {
  const dispatch = useDispatch()
  const allClients = useSelector(state => state.clients)
  const allDentists = useSelector(state => state.dentists)
  const allAssistents = useSelector(state => state.assistents)
  const allAppointments = useSelector(state => state.allAppointments)
  const [filteredClientsArray, setFilteredClientsArray] = useState(allClients)
  const [open, setOpen] = useState(false)
  const [openAppointmentForm, setOpenAppointmentForm] = useState(false)
  const [openNewClientForm, setOpenNewClientForm] = useState(false)
  const [clientName, setClientName] = useState()
  const [correctClientObject, setCorrectClientObject] = useState({})
  const [correctInfoChangedAppointment, setCorrectInfoChangedAppointment] = useState(undefined)
  const [clientAppointments, setClientAppointments] = useState([])
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

  //Render new Clientlist on Search 
  useEffect(() => {
    const filteredClientsArray = allClients.filter(e =>
      e.firstName.toLowerCase().includes(nameValue.firstName) &&
      e.surName.toLowerCase().includes(nameValue.surName)
    )
    setFilteredClientsArray(filteredClientsArray)
  }, [nameValue])

  //Find the correct treatmenttype from a dentist ID
  const FindTreatmentType = (dentistID) => {
    const correctDentist = allDentists.find(e => e.id === dentistID)
    const correctTreatment = correctDentist.treatmentType
    return correctTreatment
  }

  //Find Full dentist name from Dentist ID
  const FindDentistName = (dentistID) => {
    const correctDentist = allDentists.find(e => e.id === dentistID)
    const correctDentistName = correctDentist.firstName + correctDentist.surName
    return correctDentistName
  }

  //Find full assistent name from Assistend ID
  const FindAssistentName = (assistentID) => {
    const correctAssistent = allAssistents.find(e => e.id === assistentID)
    return correctAssistent ? correctAssistent.firstName + correctAssistent.surName : "Geen Assistent"
  }

  useEffect(() => {
    setFilteredClientsArray(allClients)
  }, [allClients.length])

  //Info Cards from Clientlist
  const allClientsInfo = filteredClientsArray.map((e, i) =>
    <ClientCard key={e.id}>
      <CardHeader>
        <TextListItem variant="h6" gutterBottom>{e.firstName}{e.surName}</TextListItem>
        <TextListItem variant="subtitle1" gutterBottom> {e.birthYear}</TextListItem>
      </CardHeader>
      <ClientInfo>
        <TextListItem variant="subtitle1" gutterBottom><IconMail />{e.email}</TextListItem>
        <TextListItem variant="subtitle1" gutterBottom><IconPhone />{e.phoneNumber} </TextListItem>
      </ClientInfo>
      <Button onClick={() => openDialog(e, i)}>Afspraken Beheren</Button>
    </ClientCard >
  )

  //Open Dialog
  const openDialog = (e) => {
    setOpen(true)
    setClientName(e.firstName + e.surName)
    setCorrectClientObject(e)
  }

  //Close Dialog
  const closeDialog = () => setOpen(false)


  //When Dialog Opens or AppointmentList changes store the new clientappointments objects to state hook
  useEffect(() => {
    const clientAppointmentArray = []
    allAppointments
      .filter(e => correctClientObject != undefined && e.clientID === correctClientObject.id)
      .sort((a, b) => (a.dayNumber > b.dayNumber) ? 1 : -1)
      .map(e => {
        clientAppointmentArray.push(e)
      })
    setClientAppointments(clientAppointmentArray)
  }, [correctClientObject, allAppointments])


  //All Client Appointments
  const allClientAppointments = clientAppointments.map((e, i) =>
    <AppointmentListItem key={i} variant="subtitle1" gutterBottom >
      <TextListItem variant="subtitle2" gutterBottom>Dagnummer: {e.dayNumber}</TextListItem>
      <TextListItem variant="subtitle2" gutterBottom>Tijdstip: {e.time}</TextListItem>
      <TextListItem variant="subtitle2" gutterBottom>Behandeling: {FindTreatmentType(e.dentistID)}</TextListItem>
      <TextListItem variant="subtitle2" gutterBottom>Tandarts: {FindDentistName(e.dentistID)}</TextListItem>
      <TextListItem variant="subtitle2" gutterBottom>Assistent: {FindAssistentName(e.assistentID)}</TextListItem>
      <ButtonContainer>
        <Button primary onClick={() => removeAppointment(e, i)}>Verwijder</Button>
        <Button onClick={() => changeAppointment(e, i)}>Wijzig</Button>
      </ButtonContainer>
    </AppointmentListItem>
  )

  //Send correct client appointment Object to Redux wich will be removed (filtered)
  const removeAppointment = (e) => dispatch(deleteAppointment(e))

  //Open AppointmentForm
  const changeAppointment = (e) => {
    closeDialog()
    setOpenAppointmentForm(true)
    const changeAppointmentInfo = e
    setCorrectInfoChangedAppointment(changeAppointmentInfo)
  }

  //close AppointmentForm
  const closeAppointmentForm = () => {
    setOpenAppointmentForm(false)
  }

  //Close AppointmentForm and open Dialog
  const closeAppointmentFormAndOpenDialog = () => {
    setOpen(true)
    setOpenAppointmentForm(false)
  }

  const openClientForm = () => {
    setOpenNewClientForm(true)
  }

  const closeClientForm = () => {
    setOpenNewClientForm(false)
  }

  //Return Everything
  return <ContainerWrapper>
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

    <TotalClients>
      <TextListItem align="center" variant="h6">Cliënten ({filteredClientsArray.length})</TextListItem>
      <Button onClick={openClientForm}>Cliënt Toevoegen</Button>
    </TotalClients>
    <Container>{allClientsInfo}</Container>

    <DialogContainer
      open={open}
      onBackdropClick={closeDialog}
    >
      <DialogContent>
        <CloseIconContainer>
          <IconClose onClick={closeDialog} />
        </CloseIconContainer>
        <ClientNameHeader>
          <TextListItem variant="h6" gutterBottom>Afspraken</TextListItem>
          <TextListItem variant="subtitle1" gutterBottom>{clientName}</TextListItem>
        </ClientNameHeader>
        <AppointmentInfoContainer>
          {clientAppointments.length !== 0 ? allClientAppointments : "Geen Afspraken"}
        </AppointmentInfoContainer>
      </DialogContent>
    </DialogContainer>

    <ChangeAppointmentForm
      changeAppointmentInfo={correctInfoChangedAppointment}
      open={openAppointmentForm}
      close={closeAppointmentForm}
      back={closeAppointmentFormAndOpenDialog}
    />


    <AddClientForm open={openNewClientForm} close={closeClientForm} />

  </ContainerWrapper>
}



export default AllClients