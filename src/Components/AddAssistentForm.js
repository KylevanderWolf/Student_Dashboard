import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import Dialog from '@material-ui/core/Dialog';
import CloseIcon from '@material-ui/icons/Close';
import { Typography } from '@material-ui/core';
import { addAssistent } from '../Actions/AssistentActions'

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
margin-top: 10px;
box-shadow:rgba(0, 0, 0, 0.24) 0px 3px 8px;
&:hover {
    box-shadow: none;
    border-radius: 8px;
}
`
const EmailContainer = styled.div`
display: flex;
`

const AddAssistentForm = ({ open, close }) => {
    const allAssistents = useSelector(state => state.assistents)
    const dispatch = useDispatch()
    const [newAssistentObject, setNewAssistentObject] = useState({
        firstName: "",
        surName: "",
        email: "",
        phoneNumber: "",
        treatmentType: "Assistent",
        id: "",
    })


    useEffect(() => {
        setNewAssistentObject({ ...newAssistentObject, id: allAssistents.length + 1 })
    }, [allAssistents.length])

    //Input Change Values
    const handleChange = (e) => {
        const { name, value } = e.target
        setNewAssistentObject({ ...newAssistentObject, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const duplicatedNewAssistent = { ...newAssistentObject }
        duplicatedNewAssistent.email = newAssistentObject.email + "@tandartspraktijkbvt.nl"
        dispatch(addAssistent(duplicatedNewAssistent))
        handleClose()
    }

    const handleClose = () => {
        setNewAssistentObject({
            firstName: "",
            surName: "",
            email: "",
            phoneNumber: "",
            treatmentType: "Assisteren",
            id: "",
        })
        close()
    }

    return <DialogContainer open={open}>
        <DialogContentContainer>
            <CloseIconContainer>
                <IconClose onClick={handleClose} />
            </CloseIconContainer>
            <DialogHeader>
                <TextListItem variant="h6" align="center">Nieuwe Assistent</TextListItem>
            </DialogHeader>
            <FormContainer onSubmit={handleSubmit} >
                <InputField
                    autoComplete="none"
                    type="text"
                    onChange={handleChange}
                    placeholder="Voornaam"
                    autoFocus={true}
                    value={newAssistentObject.firstName}
                    name="firstName"
                    required
                />
                <InputField
                    autoComplete="none"
                    type="text"
                    onChange={handleChange}
                    placeholder="Achternaam"
                    autoFocus={false}
                    value={newAssistentObject.surName}
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
                        value={newAssistentObject.email}
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
                    value={newAssistentObject.phoneNumber}
                    name="phoneNumber"
                    required
                />
                <Button type="submit">Toevoegen</Button>
            </FormContainer>
        </DialogContentContainer>
    </DialogContainer>
}

export default AddAssistentForm