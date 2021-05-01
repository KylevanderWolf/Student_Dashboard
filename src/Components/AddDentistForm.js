import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { addDentist } from '../Actions/DentistActions'

const DialogContainer = styled(Dialog)`
`
const DialogContentContainer = styled.div`
min-height: 70vh;
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
const FormContainer = styled.form`
display: flex;
flex-direction: column;
justify-content: space-around;
min-height: 40vh;
max-height: auto;
`
const InputField = styled.input`
cursor: pointer;
width: auto;
height: auto;
padding: 10px;
border: none;
outline: none;
background-color: white;
margin: 10px 0px;
transition: 0.2s ease-in-out;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
border: 1px solid #a2a2a2;
&:hover {
    box-shadow: none
}
&:focus{
    box-shadow: none;
}
`
const Button = styled.button`
width: auto;
height: auto;
padding: 10px;
background-color: #7866D5;
outline: none;
color: white;
border: none;
transition: 0.2s ease-in-out;
border-radius: 5px;
cursor: pointer;
margin-top: 30px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
&:hover {
    box-shadow: none;
    border-radius: 8px;
}
`
const EmailContainer = styled.div`
display: flex;
`
const SelectContainer = styled(FormControl)`
&&{
padding: 10px;
}
`

const SelectOptionsContainer = styled(Select)`
&&{
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
border: 1px solid #a2a2a2;
padding: 4px;
}
`

const SelectTextHeader = styled(InputLabel)`
color: #a2a2a2;
margin-top: 10px;
`

const SelectOptions = styled.option`

`

const AddDentistForm = ({ open, close }) => {
    const allDentists = useSelector(state => state.dentists)
    const dispatch = useDispatch()
    const [newDentistObject, setNewDentistObject] = useState({
        firstName: "",
        surName: "",
        email: "",
        phoneNumber: "",
        treatmentType: "",
        sick: false,
        id: "",
    })

    useEffect(() => {
        setNewDentistObject({ ...newDentistObject, id: allDentists.length + 1 })
    }, [allDentists.length])

    //Input Change Values
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewDentistObject({ ...newDentistObject, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const duplicatedNewDentist = { ...newDentistObject }
        duplicatedNewDentist.email = newDentistObject.email + "@tandartspraktijkbvt.nl"
        dispatch(addDentist(duplicatedNewDentist))
        handleClose()
    }

    const handleClose = () => {
        close();
        setNewDentistObject({
            firstName: "",
            surName: "",
            email: "",
            phoneNumber: "",
            treatmentType: "",
            id: "",
        })
    }

    return <DialogContainer open={open}>
        <DialogContentContainer>
            <CloseIconContainer>
                <IconClose onClick={handleClose} />
            </CloseIconContainer>
            <DialogHeader>
                <TextListItem variant="h6" align="center">Nieuwe Tandarts</TextListItem>
            </DialogHeader>
            <FormContainer onSubmit={handleSubmit} >
                <InputField
                    autoComplete="none"
                    type="text"
                    onChange={handleChange}
                    placeholder="Voornaam"
                    autoFocus={true}
                    value={newDentistObject.firstName}
                    name="firstName"
                    required
                />
                <InputField
                    autoComplete="none"
                    type="text"
                    onChange={handleChange}
                    placeholder="Achternaam"
                    autoFocus={false}
                    value={newDentistObject.surName}
                    name="surName"
                    required
                />
                <EmailContainer>
                    <InputField
                        autoComplete="none"
                        type="text"
                        onChange={handleChange}
                        placeholder="Email"
                        autoFocus={false}
                        value={newDentistObject.email}
                        name="email"
                        required
                    />
                    <InputField
                        placeholder="@tandartspraktijkbvt.nl"
                        autoFocus={false}
                        name="firstName"
                        disabled={true}
                    />
                </EmailContainer>
                <InputField
                    autoComplete="on"
                    type="number"
                    onChange={handleChange}
                    placeholder="Telefoon nummer"
                    autoFocus={false}
                    value={newDentistObject.phoneNumber}
                    name="phoneNumber"
                    required
                />


                <SelectTextHeader>Specialisatie:</SelectTextHeader>
                <SelectContainer>
                    <SelectOptionsContainer
                        native
                        required
                        name="treatmentType"
                        value={newDentistObject.treatmentType}
                        onChange={handleChange}
                    >
                        <SelectOptions aria-label="None" value="" />
                        <SelectOptions value={"Gaatjes Vullen"}>Gaatjes Vullen</SelectOptions>
                        <SelectOptions value={"Kroon Zetten"}>Kroon Zetten</SelectOptions>
                        <SelectOptions value={"Tanden Trekken"}>Tanden Trekken</SelectOptions>
                        <SelectOptions value={"Kaakchirurgie"}>Kaakchirurgie</SelectOptions>
                    </SelectOptionsContainer>
                </SelectContainer>



                <Button type="submit">Toevoegen</Button>
            </FormContainer>
        </DialogContentContainer>
    </DialogContainer>
}

export default AddDentistForm