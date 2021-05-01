import React from 'react';
import styled from "styled-components";
import AllDentists from './AllDentists'

const HomePageContainer = styled.div`
width: 100%;
min-height: 100vh;
max-height: auto; 
background-color: white;
display: flex;
flex-direction: column;
align-items: center;
`

const HomePage = () => {
  return (
    <HomePageContainer>
      <AllDentists />
    </HomePageContainer>
  )
}

export default HomePage;
