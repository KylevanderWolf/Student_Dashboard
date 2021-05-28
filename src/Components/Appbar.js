import React, { useState } from 'react';
import styled from 'styled-components'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import HomeIcon from '@material-ui/icons/Home';
import { useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//STYLING
const Header = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color:  ${props => props.theme.containerBg};
  margin-bottom: 10px;
  position: static;
`

const IconHome = styled(HomeIcon)`
&&{
  color: #a2a2a2;
  margin-left: 20px;
  cursor: pointer;
  font-size: 2em;
  margin-right: 20px;
}`


const PersonIcon = styled(PermIdentityIcon)`
&&{
  color: #4B86C0;
  margin-right: 10%;
}
`

const StyledLink = styled(Link)`
text-transform: none;
text-decoration: none;
`

const StudentButton = styled.button`
width: 150px;
padding: 8px;
margin: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border: 2px solid ${props => props.theme.background};
background-color: ${props => props.theme.containerBg};
border-radius:  5px;
color: #a2a2a2;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
margin-left: auto;
margin-right: 10px;
&:hover{
  box-shadow:none;
}
`

const DialogContainer = styled(Dialog)`
&& {
  min-height: 40vh;
  max-height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
 
`
const DialogContext = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  padding: 0px;
  margin: 0px;
  background-color: ${props => props.theme.containerBg};
  border: 4px solid ${props => props.theme.background};
`

const DialogHeader = styled.header`
width: auto;
padding: 10px;
background-color: ${props => props.theme.containerBg};
  border-bottom: 1px solid ${props => props.theme.background};
  display: flex;
  justify-content: center;
`
const IconClose = styled(CloseIcon)`
&&{
  color: #4B2F3C;
  font-size: 2em;
  cursor: pointer;
}
`

const Text = styled(Typography)`
&&{
  color: #a2a2a2;
}
`

const StudentListContainer = styled(DialogContent)`
&&{
width: 100%;
height: auto;
color: #a2a2a2;
display: flex;
justify-content: center;
flex-wrap: wrap;
align-items: center;
}
`

const StudentItems = styled.div`
width: 150px;
padding: 8px;
margin: 5px;
box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
border: 2px solid ${props => props.theme.background};
background-color: ${props => props.theme.containerBg};
border-radius:  5px;
color: #a2a2a2;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
&:hover{
  box-shadow:none;
}
`

const Appbar = () => {
  const history = useHistory()
  const allStudentNames = useSelector(state => state.studentNames)
  const [open, setOpen] = useState(false);

  //OPEN DIALOG CONTAINER WITH STUDENTS
  const handleClickOpen = () => {
    setOpen(true);
  };

  //CLOSE DIALOG CONTAINER
  const handleClose = () => {
    setOpen(false);
  };

  //CORRECT STUDENT ROUTING ONCLICK
  const allStudentItems = allStudentNames.map((studentName, i) =>
    <StyledLink to={`/${studentName}`} key={i} onClick={handleClose} >
      <StudentItems ><PersonIcon />{studentName}</StudentItems>
    </StyledLink>)


  return <Header>
    <IconHome onClick={() => history.push("/")} />
    <Text variant="h6">Student Dashboard</Text>
    <StudentButton onClick={handleClickOpen}><PersonIcon />Students</StudentButton>
    <DialogContainer
      open={open}
      keepMounted
      onClose={handleClose}
    >
      <DialogContext>
        <DialogHeader>
          <Text variant="h6">Select Student</Text>
        </DialogHeader>
        <IconClose onClick={handleClose} />
        <StudentListContainer>
          {allStudentItems}
        </StudentListContainer>
      </DialogContext>

    </DialogContainer>
  </Header>

}

export default Appbar