import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AddNewAppointmentForm from '../Components/AddNewAppointmentForm'

const AppbarContainer = styled.header`
width: 100%;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
min-height: 8vh;
background-color: white;
margin-bottom: 30px;
display: flex;
align-items: center;
flex-wrap: wrap;
`
const Button = styled.button`
  width: auto;
  height: auto;
  padding: 12px;
  background-color: #7866D5;
  color: white;
  font-weight: 500;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  margin: 10px 10px;
  box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
  &:hover {
    box-shadow: none;
  }
`
const ButtonContainer = styled.div`
display: flex;
margin-left: auto;
`
const DayViewButton = styled(Button)`
display: flex;
margin-left: auto;
`
const NewAppointmentButton = styled(Button)`
display: flex;
margin-left: auto;
background-color: #90E57E;
`
const Linker = styled(Link)`
text-decoration: none;
text-transform: none;
`

const Appbar = () => {
  const [openNewAppointmentForm, setOpenNewAppointmentForm] = useState(false)
  const handleNewAppointmentForm = () => setOpenNewAppointmentForm(true)
  const closeNewAppointmentForm = () => setOpenNewAppointmentForm(false)

  return <AppbarContainer>
    <Link to="/Tandartsen"><Button>Tandartsen</Button></Link>
    <Link to="/Assistenten"><Button>Assistenten</Button></Link>
    <Link to="/Cliënten"><Button>Cliënten</Button></Link>
    <ButtonContainer>
      <Linker to="/Calender"><DayViewButton>Calender</DayViewButton></Linker>
      <NewAppointmentButton onClick={handleNewAppointmentForm}>Afspraak Inplannen</NewAppointmentButton>
    </ButtonContainer>
    <AddNewAppointmentForm open={openNewAppointmentForm} close={closeNewAppointmentForm} />
  </AppbarContainer>
}

export default Appbar